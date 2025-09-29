import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CollectionCard = ({ collection, onShare, onEdit, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleShare = (e) => {
    e?.stopPropagation();
    onShare(collection);
  };

  const handleEdit = (e) => {
    e?.stopPropagation();
    onEdit(collection);
  };

  const handleDelete = (e) => {
    e?.stopPropagation();
    onDelete(collection);
  };

  const handleCardClick = () => {
    navigate('/client-gallery-view', { state: { collection } });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'text-success';
      case 'draft': return 'text-warning';
      case 'expired': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'published': return 'Globe';
      case 'draft': return 'FileText';
      case 'expired': return 'Clock';
      default: return 'Circle';
    }
  };

  return (
    <div 
      className="bg-card border border-border rounded-lg overflow-hidden gallery-shadow hover:gallery-shadow-lg gallery-transition cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Cover Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={collection?.coverImage}
          alt={collection?.title}
          className="w-full h-full object-cover group-hover:scale-105 gallery-transition-slow"
        />
        
        {/* Privacy Indicator */}
        {collection?.isPrivate && (
          <div className="absolute top-3 left-3 bg-black/60 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
            <Icon name="Lock" size={12} className="mr-1" />
            Private
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 gallery-transition">
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={handleShare}
              className="bg-white/90 hover:bg-white"
            >
              <Icon name="Share2" size={16} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={handleEdit}
              className="bg-white/90 hover:bg-white"
            >
              <Icon name="Edit" size={16} />
            </Button>
          </div>
        </div>

        {/* Photo Count */}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded-md text-xs font-medium">
          {collection?.photoCount} photos
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground truncate mb-1">
              {collection?.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {collection?.clientName}
            </p>
          </div>
          
          {/* Status */}
          <div className={`flex items-center ml-2 ${getStatusColor(collection?.status)}`}>
            <Icon name={getStatusIcon(collection?.status)} size={14} className="mr-1" />
            <span className="text-xs font-medium capitalize">{collection?.status}</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <div className="flex items-center">
            <Icon name="Eye" size={12} className="mr-1" />
            <span>{collection?.views} views</span>
          </div>
          <div className="flex items-center">
            <Icon name="Heart" size={12} className="mr-1" />
            <span>{collection?.favorites} favorites</span>
          </div>
          <div className="flex items-center">
            <Icon name="Download" size={12} className="mr-1" />
            <span>{collection?.downloads} downloads</span>
          </div>
        </div>

        {/* Date and Expiry */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Created {collection?.createdDate}</span>
          {collection?.expiryDate && (
            <span className={collection?.isExpired ? 'text-error' : ''}>
              Expires {collection?.expiryDate}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;