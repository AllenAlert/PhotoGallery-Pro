import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { cn } from '../../../utils/cn';

const CollectionMetadataPanel = ({ 
  collection, 
  onUpdate, 
  totalPhotos, 
  publishedPhotos, 
  favoritedPhotos 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: collection?.title || '',
    description: collection?.description || '',
    category: collection?.category || '',
    isPrivate: collection?.isPrivate || false,
    expiryDate: collection?.expiryDate || ''
  });

  const handleSave = () => {
    onUpdate?.(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: collection?.title || '',
      description: collection?.description || '',
      category: collection?.category || '',
      isPrivate: collection?.isPrivate || false,
      expiryDate: collection?.expiryDate || ''
    });
    setIsEditing(false);
  };

  const handleCoverImageChange = () => {
    console.log('Change cover image');
    // Implement cover image selection
  };

  const categories = [
    'Wedding',
    'Portrait',
    'Event',
    'Corporate',
    'Maternity',
    'Family',
    'Engagement',
    'Other'
  ];

  return (
    <div className="bg-card border border-border rounded-lg gallery-shadow">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Collection Details</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            iconName={isEditing ? "X" : "Edit"}
            iconPosition="left"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <p className="text-2xl font-bold text-foreground">{totalPhotos}</p>
            <p className="text-sm text-muted-foreground">Total Photos</p>
          </div>
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <p className="text-2xl font-bold text-success">{publishedPhotos}</p>
            <p className="text-sm text-muted-foreground">Published</p>
          </div>
        </div>
      </div>
      {/* Metadata Form */}
      <div className="p-6">
        {isEditing ? (
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Collection Title
              </label>
              <Input
                value={editData?.title}
                onChange={(e) => setEditData(prev => ({ ...prev, title: e?.target?.value }))}
                placeholder="Enter collection title"
                className="w-full"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                value={editData?.description}
                onChange={(e) => setEditData(prev => ({ ...prev, description: e?.target?.value }))}
                placeholder="Enter collection description"
                rows={3}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Category
              </label>
              <select
                value={editData?.category}
                onChange={(e) => setEditData(prev => ({ ...prev, category: e?.target?.value }))}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                {categories?.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Expiry Date
              </label>
              <Input
                type="date"
                value={editData?.expiryDate}
                onChange={(e) => setEditData(prev => ({ ...prev, expiryDate: e?.target?.value }))}
                className="w-full"
              />
            </div>

            {/* Privacy Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                Private Collection
              </label>
              <button
                onClick={() => setEditData(prev => ({ ...prev, isPrivate: !prev?.isPrivate }))}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                  editData?.isPrivate ? "bg-accent" : "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-card transition-transform",
                    editData?.isPrivate ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-4">
              <Button onClick={handleSave} size="sm" className="flex-1">
                Save Changes
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Client Info */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Client</h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{collection?.clientName}</p>
                  <p className="text-xs text-muted-foreground">{collection?.clientEmail}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            {collection?.description && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Description</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {collection?.description}
                </p>
              </div>
            )}

            {/* Category */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Category</h4>
              <span className="inline-flex items-center px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full">
                <Icon name="Tag" size={14} className="mr-1" />
                {collection?.category}
              </span>
            </div>

            {/* Status */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Status</h4>
              <div className="flex items-center gap-2">
                <div className={cn(
                  "flex items-center gap-2 px-3 py-1 rounded-full text-sm",
                  collection?.status === 'published' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                )}>
                  <Icon 
                    name={collection?.status === 'published' ? 'Globe' : 'Eye'} 
                    size={14} 
                  />
                  {collection?.status === 'published' ? 'Published' : 'Draft'}
                </div>
                {collection?.isPrivate && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-muted/50 rounded-full text-xs text-muted-foreground">
                    <Icon name="Lock" size={12} />
                    Private
                  </div>
                )}
              </div>
            </div>

            {/* Dates */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Created</span>
                <span className="text-foreground">
                  {new Date(collection?.createdDate)?.toLocaleDateString()}
                </span>
              </div>
              {collection?.expiryDate && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Expires</span>
                  <span className="text-foreground">
                    {new Date(collection?.expiryDate)?.toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="pt-4 border-t border-border">
              <h4 className="text-sm font-semibold text-foreground mb-3">Quick Stats</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="Heart" size={14} className="text-error" />
                    <span className="text-muted-foreground">Favorites</span>
                  </div>
                  <span className="text-foreground">{favoritedPhotos}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="Shield" size={14} className="text-accent" />
                    <span className="text-muted-foreground">Watermarked</span>
                  </div>
                  <span className="text-foreground">
                    {totalPhotos && ((favoritedPhotos / totalPhotos) * 100)?.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Cover Image Section */}
      {!isEditing && (
        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-foreground">Cover Image</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCoverImageChange}
              iconName="Image"
            >
              Change
            </Button>
          </div>
          <div className="aspect-video bg-muted/20 rounded-lg flex items-center justify-center">
            <Icon name="Image" size={32} className="text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionMetadataPanel;