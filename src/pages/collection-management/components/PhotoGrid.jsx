import React, { useState, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const PhotoGrid = ({ photos, selectedPhotos, onPhotoSelect, onPhotoEdit, onReorder }) => {
  const [draggedPhoto, setDraggedPhoto] = useState(null);
  const [dragOverPhoto, setDragOverPhoto] = useState(null);

  const handleDragStart = useCallback((e, photo) => {
    setDraggedPhoto(photo);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e, photo) => {
    e?.preventDefault();
    setDragOverPhoto(photo);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverPhoto(null);
  }, []);

  const handleDrop = useCallback((e, targetPhoto) => {
    e?.preventDefault();
    
    if (!draggedPhoto || draggedPhoto?.id === targetPhoto?.id) {
      setDraggedPhoto(null);
      setDragOverPhoto(null);
      return;
    }

    const draggedIndex = photos?.findIndex(p => p?.id === draggedPhoto?.id);
    const targetIndex = photos?.findIndex(p => p?.id === targetPhoto?.id);
    
    const reorderedPhotos = [...photos];
    reorderedPhotos?.splice(draggedIndex, 1);
    reorderedPhotos?.splice(targetIndex, 0, draggedPhoto);
    
    onReorder?.(reorderedPhotos);
    setDraggedPhoto(null);
    setDragOverPhoto(null);
  }, [draggedPhoto, photos, onReorder]);

  const getStatusBadge = (photo) => {
    const statusConfig = {
      published: { color: 'bg-success/10 text-success', label: 'Published', icon: 'CheckCircle' },
      draft: { color: 'bg-warning/10 text-warning', label: 'Draft', icon: 'Clock' },
      processing: { color: 'bg-secondary/10 text-secondary', label: 'Processing', icon: 'Loader2' }
    };
    
    const config = statusConfig?.[photo?.status] || statusConfig?.draft;
    
    return (
      <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${config?.color}`}>
        <Icon 
          name={config?.icon} 
          size={12} 
          className={photo?.status === 'processing' ? 'animate-spin' : ''} 
        />
        {config?.label}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {photos?.map((photo) => (
        <div
          key={photo?.id}
          draggable
          onDragStart={(e) => handleDragStart(e, photo)}
          onDragOver={(e) => handleDragOver(e, photo)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, photo)}
          className={cn(
            "relative bg-card border border-border rounded-lg overflow-hidden gallery-shadow cursor-pointer group transition-all duration-200",
            {
              'ring-2 ring-accent': selectedPhotos?.includes(photo?.id),
              'opacity-50': draggedPhoto?.id === photo?.id,
              'ring-2 ring-secondary': dragOverPhoto?.id === photo?.id
            }
          )}
        >
          {/* Selection Checkbox */}
          <div className="absolute top-2 right-2 z-10">
            <input
              type="checkbox"
              checked={selectedPhotos?.includes(photo?.id)}
              onChange={(e) => onPhotoSelect?.(photo?.id, e?.target?.checked)}
              className="w-5 h-5 rounded border-2 border-card bg-card/80 backdrop-blur-sm text-accent focus:ring-accent focus:ring-offset-0"
            />
          </div>

          {/* Status Badge */}
          {getStatusBadge(photo)}

          {/* Image */}
          <div className="aspect-square relative overflow-hidden">
            <img
              src={photo?.thumbnail || photo?.url}
              alt={photo?.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
            
            {/* Action Buttons */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e?.stopPropagation();
                    onPhotoEdit?.(photo);
                  }}
                  className="w-8 h-8 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-card transition-colors"
                  title="Edit photo"
                >
                  <Icon name="Edit" size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e?.stopPropagation();
                    console.log('View photo:', photo);
                  }}
                  className="w-8 h-8 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-card transition-colors"
                  title="View full size"
                >
                  <Icon name="Eye" size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Photo Info */}
          <div className="p-3">
            <h4 className="text-sm font-medium text-foreground truncate mb-1">
              {photo?.title || photo?.filename}
            </h4>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{photo?.size}</span>
              <span>{photo?.dimensions}</span>
            </div>
            
            {/* Tags */}
            {photo?.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {photo?.tags?.slice(0, 2)?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {photo?.tags?.length > 2 && (
                  <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full">
                    +{photo?.tags?.length - 2}
                  </span>
                )}
              </div>
            )}

            {/* Status Icons */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                {photo?.isFavorited && (
                  <Icon name="Heart" size={14} className="text-error fill-error" />
                )}
                {photo?.hasWatermark && (
                  <Icon name="Shield" size={14} className="text-accent" />
                )}
                {!photo?.isProcessed && (
                  <Icon name="Clock" size={14} className="text-warning" />
                )}
              </div>
              <Icon name="GripVertical" size={14} className="text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;