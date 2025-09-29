import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PhotoGrid = ({ 
  photos, 
  selectedPhotos, 
  onPhotoSelect, 
  onPhotoClick, 
  onLoadMore, 
  hasMore, 
  loading 
}) => {
  const [hoveredPhoto, setHoveredPhoto] = useState(null);
  const [imageLoadStates, setImageLoadStates] = useState({});
  const observerRef = useRef();
  const loadMoreRef = useRef();

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef?.current) {
      observer?.observe(loadMoreRef?.current);
    }

    return () => observer?.disconnect();
  }, [loading, hasMore, onLoadMore]);

  const handleImageLoad = (photoId) => {
    setImageLoadStates(prev => ({
      ...prev,
      [photoId]: 'loaded'
    }));
  };

  const handleImageError = (photoId) => {
    setImageLoadStates(prev => ({
      ...prev,
      [photoId]: 'error'
    }));
  };

  const isSelected = (photoId) => selectedPhotos?.includes(photoId);
  const isLoaded = (photoId) => imageLoadStates?.[photoId] === 'loaded';

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {photos?.map((photo) => (
          <div
            key={photo?.id}
            className="relative aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer group"
            onMouseEnter={() => setHoveredPhoto(photo?.id)}
            onMouseLeave={() => setHoveredPhoto(null)}
            onClick={() => onPhotoClick(photo)}
          >
            {/* Image */}
            <Image
              src={photo?.thumbnail}
              alt={photo?.title || `Photo ${photo?.id}`}
              className="w-full h-full object-cover gallery-transition group-hover:scale-105"
              loading="lazy"
              onLoad={() => handleImageLoad(photo?.id)}
              onError={() => handleImageError(photo?.id)}
            />

            {/* Loading Skeleton */}
            {!isLoaded(photo?.id) && (
              <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                <Icon name="Image" size={24} className="text-muted-foreground/50" />
              </div>
            )}

            {/* Overlay Actions */}
            <div className={`absolute inset-0 bg-black/20 gallery-transition ${
              hoveredPhoto === photo?.id || isSelected(photo?.id) 
                ? 'opacity-100' :'opacity-0 group-hover:opacity-100'
            }`}>
              {/* Favorite Button */}
              <button
                onClick={(e) => {
                  e?.stopPropagation();
                  onPhotoSelect(photo?.id);
                }}
                className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center gallery-transition ${
                  isSelected(photo?.id)
                    ? 'bg-error text-white' :'bg-white/90 text-gray-600 hover:bg-white'
                }`}
              >
                <Icon 
                  name="Heart" 
                  size={16} 
                  className={isSelected(photo?.id) ? 'fill-current' : ''} 
                />
              </button>

              {/* Photo Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <div className="flex items-center justify-between text-white text-xs">
                  <span className="truncate">
                    {photo?.title || `IMG_${photo?.id}`}
                  </span>
                  {photo?.hasComments && (
                    <Icon name="MessageCircle" size={14} />
                  )}
                </div>
              </div>
            </div>

            {/* Selection Indicator */}
            {isSelected(photo?.id) && (
              <div className="absolute top-2 left-2 w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-xs font-medium">
                {selectedPhotos?.indexOf(photo?.id) + 1}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Load More Trigger */}
      {hasMore && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          {loading ? (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              <span>Loading more photos...</span>
            </div>
          ) : (
            <div className="text-muted-foreground text-sm">
              Scroll down to load more photos
            </div>
          )}
        </div>
      )}
      {/* Empty State */}
      {photos?.length === 0 && !loading && (
        <div className="text-center py-12">
          <Icon name="Images" size={48} className="text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No photos found</h3>
          <p className="text-muted-foreground">
            There are no photos to display in this collection.
          </p>
        </div>
      )}
    </div>
  );
};

export default PhotoGrid;