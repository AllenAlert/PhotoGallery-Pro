import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

const BatchOperationsBar = ({ selectedCount, onBatchOperation, selectedPhotos }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const operations = [
    {
      id: 'publish',
      label: 'Publish',
      icon: 'Globe',
      color: 'success',
      description: 'Make selected photos visible to clients'
    },
    {
      id: 'unpublish',
      label: 'Unpublish',
      icon: 'EyeOff',
      color: 'warning',
      description: 'Hide selected photos from clients'
    },
    {
      id: 'favorite',
      label: 'Favorite',
      icon: 'Heart',
      color: 'error',
      description: 'Mark selected photos as favorites'
    },
    {
      id: 'watermark',
      label: 'Watermark',
      icon: 'Shield',
      color: 'accent',
      description: 'Add watermark to selected photos'
    },
    {
      id: 'download',
      label: 'Download',
      icon: 'Download',
      color: 'secondary',
      description: 'Download selected photos'
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: 'Trash2',
      color: 'destructive',
      description: 'Permanently delete selected photos',
      dangerous: true
    }
  ];

  const handleOperation = (operationId) => {
    if (operationId === 'delete') {
      setShowConfirmDelete(true);
    } else {
      onBatchOperation?.(operationId, selectedPhotos);
    }
  };

  const handleConfirmDelete = () => {
    onBatchOperation?.('delete', selectedPhotos);
    setShowConfirmDelete(false);
  };

  const handleDownload = () => {
    // Simulate download process
    console.log('Downloading selected photos:', selectedPhotos);
    
    // Create a temporary download link for each photo
    selectedPhotos?.forEach((photoId) => {
      const link = document.createElement('a');
      link.href = `https://example.com/download/${photoId}`; // Replace with actual download URL
      link.download = `photo-${photoId}.jpg`;
      document.body?.appendChild(link);
      link?.click();
      document.body?.removeChild(link);
    });
  };

  return (
    <>
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
              <Icon name="Check" size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {selectedCount} photo{selectedCount !== 1 ? 's' : ''} selected
              </p>
              <p className="text-xs text-muted-foreground">
                Choose an action to apply to all selected photos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {operations?.map((operation) => (
              <Button
                key={operation?.id}
                variant={operation?.dangerous ? "destructive" : "outline"}
                size="sm"
                onClick={() => operation?.id === 'download' ? handleDownload() : handleOperation(operation?.id)}
                iconName={operation?.icon}
                iconPosition="left"
                className={cn(
                  "transition-all duration-200",
                  !operation?.dangerous && `hover:bg-${operation?.color}/10 hover:text-${operation?.color} hover:border-${operation?.color}/20`
                )}
                title={operation?.description}
              >
                {operation?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Progress Bar (for batch operations) */}
        <div className="mt-3">
          <div className="w-full bg-muted/20 rounded-full h-2">
            <div className="bg-accent h-2 rounded-full transition-all duration-300" style={{ width: '0%' }} />
          </div>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg gallery-shadow max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={24} className="text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Delete Photos</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to permanently delete {selectedCount} selected photo{selectedCount !== 1 ? 's' : ''}? 
              This action cannot be undone and the photos will be removed from all client galleries.
            </p>

            <div className="flex items-center justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmDelete(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirmDelete}
                iconName="Trash2"
                iconPosition="left"
              >
                Delete {selectedCount} Photo{selectedCount !== 1 ? 's' : ''}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BatchOperationsBar;