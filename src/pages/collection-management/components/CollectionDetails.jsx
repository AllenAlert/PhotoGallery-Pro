import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CollectionDetails = ({
  collection,
  onUploadPhotos,
  onShareCollection,
  onEditCollection,
  onDeleteCollection
}) => {
  if (!collection) {
    return (
      <div className="bg-white rounded-xl border border-border p-6 h-fit">
        <div className="text-center py-12">
          <Icon name="FolderOpen" size={48} className="text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Select a Collection</h3>
          <p className="text-muted-foreground text-sm">
            Choose a collection from the list to view detailed information and management options
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'draft':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'archived':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getPrivacyIcon = (privacy) => {
    return privacy === 'private' ? 'Lock' : 'Globe';
  };

  return (
    <div className="bg-white rounded-xl border border-border p-6 h-fit">
      {/* Collection Header */}
      <div className="mb-6">
        <img
          src={collection?.coverImage}
          alt={collection?.title}
          className="w-full h-32 object-cover rounded-lg mb-4"
        />
        <h2 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
          {collection?.title}
        </h2>
        <p className="text-muted-foreground text-sm">
          Client: {collection?.client}
        </p>
      </div>

      {/* Status and Privacy */}
      <div className="flex items-center gap-3 mb-6">
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(collection?.status)}`}>
          {collection?.status?.charAt(0)?.toUpperCase() + collection?.status?.slice(1)}
        </span>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Icon name={getPrivacyIcon(collection?.privacy)} size={14} />
          <span className="capitalize">{collection?.privacy}</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        <Button
          onClick={onUploadPhotos}
          iconName="Upload"
          iconPosition="left"
          className="justify-start"
        >
          Upload Photos
        </Button>
        <Button
          onClick={onShareCollection}
          variant="outline"
          iconName="Share"
          iconPosition="left"
          className="justify-start"
        >
          Share Collection
        </Button>
        <Button
          onClick={onEditCollection}
          variant="outline"
          iconName="Edit"
          iconPosition="left"
          className="justify-start"
        >
          Edit Collection
        </Button>
      </div>

      {/* Collection Stats */}
      <div className="space-y-4 mb-6">
        <h3 className="font-medium text-foreground">Collection Statistics</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-bold text-foreground">{collection?.photoCount}</div>
            <div className="text-xs text-muted-foreground">Photos</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-bold text-foreground">{collection?.views}</div>
            <div className="text-xs text-muted-foreground">Views</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-bold text-foreground">{collection?.downloads}</div>
            <div className="text-xs text-muted-foreground">Downloads</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-bold text-foreground">{collection?.favorites}</div>
            <div className="text-xs text-muted-foreground">Favorites</div>
          </div>
        </div>
      </div>

      {/* Collection Info */}
      <div className="space-y-4 mb-6">
        <h3 className="font-medium text-foreground">Collection Information</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">File Size:</span>
            <span className="font-medium">{collection?.size}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Created:</span>
            <span>{formatDate(collection?.createdDate)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Modified:</span>
            <span>{formatDate(collection?.lastModified)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Expires:</span>
            <span>{formatDate(collection?.expiryDate)}</span>
          </div>
          {collection?.location && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Location:</span>
              <span className="text-right">{collection?.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      {collection?.tags && collection?.tags?.length > 0 && (
        <div className="space-y-3 mb-6">
          <h3 className="font-medium text-foreground">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {collection?.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      {collection?.description && (
        <div className="space-y-3 mb-6">
          <h3 className="font-medium text-foreground">Description</h3>
          <p className="text-sm text-muted-foreground">
            {collection?.description}
          </p>
        </div>
      )}

      {/* Danger Zone */}
      <div className="pt-6 border-t border-border">
        <h3 className="font-medium text-foreground mb-3">Danger Zone</h3>
        <Button
          onClick={onDeleteCollection}
          variant="destructive"
          size="sm"
          iconName="Trash2"
          iconPosition="left"
          className="w-full"
        >
          Delete Collection
        </Button>
      </div>
    </div>
  );
};

export default CollectionDetails;