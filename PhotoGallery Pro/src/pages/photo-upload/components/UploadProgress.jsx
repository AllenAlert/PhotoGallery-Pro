import React from 'react';
import Icon from '../../../components/AppIcon';

const UploadProgress = ({ 
  progress, 
  currentFile, 
  totalFiles, 
  completedFiles, 
  errorFiles 
}) => {
  return (
    <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Icon name="Upload" size={24} className="text-accent" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Uploading Photos</h3>
            <p className="text-sm text-muted-foreground">
              Processing {totalFiles} photo{totalFiles !== 1 ? 's' : ''}...
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-2xl font-bold text-accent">{progress?.toFixed(0)}%</p>
          <p className="text-xs text-muted-foreground">Complete</p>
        </div>
      </div>
      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Overall Progress</span>
          <span className="text-foreground">
            {completedFiles} of {totalFiles} files completed
          </span>
        </div>
        <div className="w-full bg-muted/20 rounded-full h-3">
          <div
            className="bg-accent h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      {/* Current File */}
      {currentFile && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Loader2" size={16} className="text-accent animate-spin" />
            <span className="text-sm text-foreground">Currently processing:</span>
          </div>
          <p className="text-sm text-muted-foreground truncate pl-6">{currentFile}</p>
        </div>
      )}
      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-success/10 rounded-lg">
          <p className="text-xl font-bold text-success">{completedFiles}</p>
          <p className="text-xs text-muted-foreground">Completed</p>
        </div>
        
        <div className="text-center p-3 bg-warning/10 rounded-lg">
          <p className="text-xl font-bold text-warning">{totalFiles - completedFiles - errorFiles}</p>
          <p className="text-xs text-muted-foreground">Processing</p>
        </div>
        
        <div className="text-center p-3 bg-destructive/10 rounded-lg">
          <p className="text-xl font-bold text-destructive">{errorFiles}</p>
          <p className="text-xs text-muted-foreground">Failed</p>
        </div>
      </div>
      {/* Processing Steps */}
      <div className="mt-4 pt-4 border-t border-accent/20">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="Upload" size={12} className="text-success" />
            <span>Upload</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Settings" size={12} className="text-accent" />
            <span>Process</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Image" size={12} className="text-secondary" />
            <span>Thumbnails</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="CheckCircle" size={12} className="text-success" />
            <span>Complete</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProgress;