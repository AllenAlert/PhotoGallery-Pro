import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GalleryHeader = ({ 
  collection, 
  totalPhotos, 
  selectedCount, 
  viewMode, 
  onViewModeChange, 
  onSlideshow, 
  onDownload,
  onShare 
}) => {
  return (
    <div className="bg-card border-b border-border sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Collection Info */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-semibold text-foreground mb-2">
              {collection?.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Icon name="Camera" size={16} className="mr-1" />
                {collection?.photographer}
              </span>
              <span className="flex items-center">
                <Icon name="Images" size={16} className="mr-1" />
                {totalPhotos} photos
              </span>
              <span className="flex items-center">
                <Icon name="Calendar" size={16} className="mr-1" />
                Updated {collection?.lastUpdated}
              </span>
              {selectedCount > 0 && (
                <span className="flex items-center text-accent">
                  <Icon name="Heart" size={16} className="mr-1" />
                  {selectedCount} selected
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Play"
              iconPosition="left"
              onClick={onSlideshow}
            >
              Slideshow
            </Button>
            
            {selectedCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                onClick={onDownload}
              >
                Download ({selectedCount})
              </Button>
            )}
            
            <Button
              variant="outline"
              size="sm"
              iconName="Share2"
              iconPosition="left"
              onClick={onShare}
            >
              Share
            </Button>
          </div>
        </div>

        {/* View Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">View:</span>
            <div className="flex items-center bg-muted rounded-lg p-1">
              <button
                onClick={() => onViewModeChange('all')}
                className={`px-3 py-1 text-sm rounded-md gallery-transition ${
                  viewMode === 'all' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                All Photos
              </button>
              <button
                onClick={() => onViewModeChange('favorites')}
                className={`px-3 py-1 text-sm rounded-md gallery-transition ${
                  viewMode === 'favorites' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                Favorites
              </button>
            </div>
          </div>

          {/* Collection Description */}
          {collection?.description && (
            <p className="text-sm text-muted-foreground max-w-md">
              {collection?.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryHeader;