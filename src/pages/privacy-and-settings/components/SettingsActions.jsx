import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SettingsActions = ({ onSave, onReset, hasUnsavedChanges }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
      // Show success message
      setTimeout(() => setIsSaving(false), 1000);
    } catch (error) {
      setIsSaving(false);
      console.error('Failed to save settings:', error);
    }
  };

  const handleReset = () => {
    onReset();
    setShowResetConfirm(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Save Changes</h3>
          <p className="text-sm text-muted-foreground">
            {hasUnsavedChanges 
              ? 'You have unsaved changes that need to be applied' :'All settings are up to date'
            }
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Reset Button */}
          {!showResetConfirm ? (
            <Button
              variant="outline"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={() => setShowResetConfirm(true)}
              disabled={!hasUnsavedChanges}
            >
              Reset
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Reset all changes?</span>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleReset}
              >
                Yes
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowResetConfirm(false)}
              >
                Cancel
              </Button>
            </div>
          )}

          {/* Save Button */}
          <Button
            variant="default"
            iconName={isSaving ? "Loader2" : "Save"}
            iconPosition="left"
            onClick={handleSave}
            disabled={!hasUnsavedChanges || isSaving}
            loading={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>

      {/* Status Indicators */}
      {hasUnsavedChanges && (
        <div className="mt-4 p-3 bg-warning/10 rounded-lg border border-warning/20">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-warning" />
            <span className="text-sm text-warning font-medium">Unsaved Changes</span>
          </div>
          <p className="text-xs text-warning/80 mt-1">
            Remember to save your changes before leaving this page
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-4">Quick Actions</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Copy"
            iconPosition="left"
            fullWidth
          >
            Copy Settings
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            fullWidth
          >
            Export Config
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Upload"
            iconPosition="left"
            fullWidth
          >
            Import Config
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsActions;