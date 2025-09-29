import React, { useState, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

const UploadZone = ({ 
  onFilesSelected, 
  isUploading, 
  acceptedTypes = "image/*", 
  maxFileSize = 50 * 1024 * 1024,
  supportsBatch = true 
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [dragCount, setDragCount] = useState(0);

  const handleDragEnter = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragCount(prev => prev + 1);
    
    if (e?.dataTransfer?.items && e?.dataTransfer?.items?.length > 0) {
      setIsDragActive(true);
    }
  }, []);

  const handleDragLeave = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragCount(prev => prev - 1);
    
    if (dragCount <= 1) {
      setIsDragActive(false);
    }
  }, [dragCount]);

  const handleDragOver = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragActive(false);
    setDragCount(0);
    
    if (e?.dataTransfer?.files) {
      const files = Array.from(e?.dataTransfer?.files);
      const validFiles = files?.filter(file => 
        file?.type?.startsWith('image/') && file?.size <= maxFileSize
      );
      
      if (validFiles?.length > 0) {
        onFilesSelected?.(validFiles);
      }
    }
  }, [maxFileSize, onFilesSelected]);

  const handleFileInput = (e) => {
    const files = Array.from(e?.target?.files || []);
    if (files?.length > 0) {
      onFilesSelected?.(files);
    }
    // Reset input
    e.target.value = '';
  };

  const handleFolderInput = (e) => {
    const files = Array.from(e?.target?.files || []);
    if (files?.length > 0) {
      onFilesSelected?.(files);
    }
    // Reset input
    e.target.value = '';
  };

  return (
    <div className="space-y-4">
      {/* Main Upload Zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn(
          "relative bg-card border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200",
          {
            "border-accent bg-accent/5": isDragActive,
            "border-border hover:border-accent/50 hover:bg-accent/5": !isDragActive && !isUploading,
            "border-muted bg-muted/20 opacity-50 cursor-not-allowed": isUploading
          }
        )}
      >
        <div className="space-y-4">
          {isDragActive ? (
            <>
              <Icon name="Upload" size={48} className="text-accent mx-auto animate-bounce" />
              <div>
                <h3 className="text-lg font-medium text-accent mb-2">Drop your photos here</h3>
                <p className="text-sm text-accent/80">Release to add them to the upload queue</p>
              </div>
            </>
          ) : (
            <>
              <Icon 
                name={isUploading ? "Loader2" : "Upload"} 
                size={48} 
                className={cn(
                  "mx-auto",
                  isUploading ? "text-muted-foreground animate-spin" : "text-muted-foreground"
                )}
              />
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {isUploading ? 'Uploading photos...' : 'Drag & drop your photos'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isUploading 
                    ? 'Please wait while your photos are being processed'
                    : 'Or click below to browse your files'
                  }
                </p>
              </div>
            </>
          )}

          {/* Upload Buttons */}
          {!isUploading && (
            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={() => document.getElementById('file-input')?.click()}
                iconName="Image"
                iconPosition="left"
              >
                Select Photos
              </Button>
              
              {supportsBatch && (
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('folder-input')?.click()}
                  iconName="FolderOpen"
                  iconPosition="left"
                >
                  Upload Folder
                </Button>
              )}
            </div>
          )}

          {/* File Input */}
          <input
            id="file-input"
            type="file"
            accept={acceptedTypes}
            multiple
            onChange={handleFileInput}
            className="hidden"
            disabled={isUploading}
          />

          {/* Folder Input */}
          {supportsBatch && (
            <input
              id="folder-input"
              type="file"
              accept={acceptedTypes}
              webkitdirectory=""
              multiple
              onChange={handleFolderInput}
              className="hidden"
              disabled={isUploading}
            />
          )}

          {/* Format Info */}
          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground pt-4">
            <div className="flex items-center gap-1">
              <Icon name="Check" size={14} className="text-success" />
              <span>JPG, PNG, HEIC, WEBP</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="HardDrive" size={14} />
              <span>Max {(maxFileSize / 1024 / 1024)?.toFixed(0)}MB per file</span>
            </div>
            {supportsBatch && (
              <div className="flex items-center gap-1">
                <Icon name="Layers" size={14} />
                <span>Batch upload supported</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {!isUploading && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <Icon name="Camera" size={24} className="text-accent mx-auto mb-2" />
            <h4 className="text-sm font-medium text-foreground mb-1">Camera Roll</h4>
            <p className="text-xs text-muted-foreground">
              Upload directly from your camera
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <Icon name="Smartphone" size={24} className="text-secondary mx-auto mb-2" />
            <h4 className="text-sm font-medium text-foreground mb-1">Mobile Import</h4>
            <p className="text-xs text-muted-foreground">
              Import from mobile devices
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <Icon name="Cloud" size={24} className="text-warning mx-auto mb-2" />
            <h4 className="text-sm font-medium text-foreground mb-1">Cloud Storage</h4>
            <p className="text-xs text-muted-foreground">
              Import from cloud services
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadZone;