import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const DownloadModal = ({ 
  isOpen, 
  onClose, 
  selectedPhotos, 
  photos, 
  onDownload 
}) => {
  const [downloadOptions, setDownloadOptions] = useState({
    resolution: 'high',
    format: 'jpg',
    includeMetadata: false
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const resolutionOptions = [
    { value: 'web', label: 'Web Quality (1200px)', size: '~500KB each' },
    { value: 'high', label: 'High Quality (2400px)', size: '~2MB each' },
    { value: 'original', label: 'Original Resolution', size: '~8MB each' }
  ];

  const formatOptions = [
    { value: 'jpg', label: 'JPEG (.jpg)', description: 'Best for photos' },
    { value: 'png', label: 'PNG (.png)', description: 'Best for graphics' }
  ];

  const selectedPhotoData = photos?.filter(photo => selectedPhotos?.includes(photo?.id));
  const totalSize = calculateTotalSize();

  function calculateTotalSize() {
    const sizeMultipliers = { web: 0.5, high: 2, original: 8 };
    const multiplier = sizeMultipliers?.[downloadOptions?.resolution];
    const totalMB = selectedPhotos?.length * multiplier;
    
    if (totalMB < 1) return `${Math.round(totalMB * 1024)}KB`;
    if (totalMB < 1024) return `${Math.round(totalMB)}MB`;
    return `${(totalMB / 1024)?.toFixed(1)}GB`;
  }

  const handleDownload = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate download processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onDownload({
        photoIds: selectedPhotos,
        options: downloadOptions
      });
      
      onClose();
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1020] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Download Photos</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center gallery-transition"
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Selected Photos Summary */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-foreground">Selected Photos</span>
              <span className="text-sm text-muted-foreground">
                {selectedPhotos?.length} photos
              </span>
            </div>
            
            {/* Photo Preview */}
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedPhotoData?.slice(0, 6)?.map((photo) => (
                <div key={photo?.id} className="w-12 h-12 rounded overflow-hidden bg-muted">
                  <img
                    src={photo?.thumbnail}
                    alt={`Photo ${photo?.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {selectedPhotos?.length > 6 && (
                <div className="w-12 h-12 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                  +{selectedPhotos?.length - 6}
                </div>
              )}
            </div>
            
            <div className="text-sm text-muted-foreground">
              Estimated download size: <span className="font-medium">{totalSize}</span>
            </div>
          </div>

          {/* Resolution Options */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Resolution
            </label>
            <div className="space-y-2">
              {resolutionOptions?.map((option) => (
                <label key={option?.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="resolution"
                    value={option?.value}
                    checked={downloadOptions?.resolution === option?.value}
                    onChange={(e) => setDownloadOptions(prev => ({
                      ...prev,
                      resolution: e?.target?.value
                    }))}
                    className="w-4 h-4 text-accent border-border focus:ring-accent"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">
                      {option?.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {option?.size}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Format Options */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              File Format
            </label>
            <div className="space-y-2">
              {formatOptions?.map((option) => (
                <label key={option?.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    value={option?.value}
                    checked={downloadOptions?.format === option?.value}
                    onChange={(e) => setDownloadOptions(prev => ({
                      ...prev,
                      format: e?.target?.value
                    }))}
                    className="w-4 h-4 text-accent border-border focus:ring-accent"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">
                      {option?.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {option?.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div>
            <Checkbox
              label="Include photo metadata (EXIF data)"
              description="Camera settings, date, location if available"
              checked={downloadOptions?.includeMetadata}
              onChange={(e) => setDownloadOptions(prev => ({
                ...prev,
                includeMetadata: e?.target?.checked
              }))}
            />
          </div>

          {/* Download Notice */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Download Information
                </p>
                <p className="text-xs text-muted-foreground">
                  Photos will be downloaded as a ZIP file. Large downloads may take a few minutes to prepare.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Total: {selectedPhotos?.length} photos ({totalSize})
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} disabled={isProcessing}>
              Cancel
            </Button>
            <Button
              onClick={handleDownload}
              loading={isProcessing}
              iconName="Download"
              iconPosition="left"
              disabled={selectedPhotos?.length === 0}
            >
              {isProcessing ? 'Preparing...' : 'Download'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;