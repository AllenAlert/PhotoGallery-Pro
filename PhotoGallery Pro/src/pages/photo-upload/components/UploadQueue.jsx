import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

const UploadQueue = ({ 
  files, 
  onFileRemove, 
  onFileUpdate, 
  onRetryFailed, 
  onClearCompleted, 
  isUploading 
}) => {
  const getStatusIcon = (file) => {
    switch (file?.status) {
      case 'pending':
        return { icon: 'Clock', color: 'text-muted-foreground' };
      case 'uploading':
        return { icon: 'Loader2', color: 'text-accent', spin: true };
      case 'completed':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'error':
        return { icon: 'XCircle', color: 'text-destructive' };
      default:
        return { icon: 'File', color: 'text-muted-foreground' };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-muted/20 text-muted-foreground';
      case 'uploading':
        return 'bg-accent/10 text-accent';
      case 'completed':
        return 'bg-success/10 text-success';
      case 'error':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted/20 text-muted-foreground';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const pendingFiles = files?.filter(f => f?.status === 'pending');
  const uploadingFiles = files?.filter(f => f?.status === 'uploading');
  const completedFiles = files?.filter(f => f?.status === 'completed');
  const errorFiles = files?.filter(f => f?.status === 'error');

  return (
    <div className="bg-card border border-border rounded-lg gallery-shadow">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Upload Queue</h3>
          <p className="text-sm text-muted-foreground">
            {files?.length} file{files?.length !== 1 ? 's' : ''} • {completedFiles?.length} completed • {errorFiles?.length} failed
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {errorFiles?.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetryFailed}
              iconName="RefreshCw"
              iconPosition="left"
              disabled={isUploading}
            >
              Retry Failed
            </Button>
          )}
          
          {completedFiles?.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearCompleted}
              iconName="Trash2"
              iconPosition="left"
              disabled={isUploading}
            >
              Clear Completed
            </Button>
          )}
        </div>
      </div>
      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-muted-foreground">{pendingFiles?.length}</p>
          <p className="text-xs text-muted-foreground">Pending</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-accent">{uploadingFiles?.length}</p>
          <p className="text-xs text-muted-foreground">Uploading</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-success">{completedFiles?.length}</p>
          <p className="text-xs text-muted-foreground">Completed</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-destructive">{errorFiles?.length}</p>
          <p className="text-xs text-muted-foreground">Failed</p>
        </div>
      </div>
      {/* File List */}
      <div className="max-h-96 overflow-y-auto">
        {files?.map((file) => {
          const statusInfo = getStatusIcon(file);
          
          return (
            <div
              key={file?.id}
              className="flex items-center gap-4 p-4 border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors"
            >
              {/* Preview */}
              <div className="flex-shrink-0 w-12 h-12 bg-muted/20 rounded-lg overflow-hidden">
                {file?.preview ? (
                  <img
                    src={file?.preview}
                    alt={file?.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon name="Image" size={20} className="text-muted-foreground" />
                  </div>
                )}
              </div>
              {/* File Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {file?.name}
                  </p>
                  <span className={cn(
                    "px-2 py-1 text-xs font-medium rounded-full flex-shrink-0",
                    getStatusColor(file?.status)
                  )}>
                    {file?.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{formatFileSize(file?.size)}</span>
                  <span>{file?.type}</span>
                  {file?.suggestedCategory && (
                    <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-full">
                      {file?.suggestedCategory}
                    </span>
                  )}
                </div>

                {/* Progress Bar */}
                {file?.status === 'uploading' && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">
                        {file?.progress?.toFixed(0)}% uploaded
                      </span>
                    </div>
                    <div className="w-full bg-muted/20 rounded-full h-2">
                      <div
                        className="bg-accent h-2 rounded-full transition-all duration-300"
                        style={{ width: `${file?.progress || 0}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {file?.status === 'error' && file?.error && (
                  <p className="text-xs text-destructive mt-1">{file?.error}</p>
                )}
              </div>
              {/* Status Icon */}
              <div className="flex-shrink-0">
                <Icon
                  name={statusInfo?.icon}
                  size={20}
                  className={cn(statusInfo?.color, {
                    'animate-spin': statusInfo?.spin
                  })}
                />
              </div>
              {/* Actions */}
              {!isUploading && file?.status !== 'completed' && (
                <div className="flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onFileRemove?.(file?.id)}
                    iconName="X"
                    className="text-muted-foreground hover:text-destructive"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {files?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Upload" size={32} className="text-muted-foreground/50 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No files in queue</p>
        </div>
      )}
    </div>
  );
};

export default UploadQueue;