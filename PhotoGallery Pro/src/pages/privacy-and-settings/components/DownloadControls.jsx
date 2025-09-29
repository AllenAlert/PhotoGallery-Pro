import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const DownloadControls = ({ settings, onSettingsChange }) => {
  const fileSizeOptions = [
    { value: 'original', label: 'Original Size (Full Resolution)' },
    { value: 'large', label: 'Large (2048px)' },
    { value: 'medium', label: 'Medium (1024px)' },
    { value: 'small', label: 'Small (512px)' },
    { value: 'web', label: 'Web Optimized (800px)' }
  ];

  const downloadLimitOptions = [
    { value: 'unlimited', label: 'Unlimited Downloads' },
    { value: '1', label: '1 Download per Image' },
    { value: '3', label: '3 Downloads per Image' },
    { value: '5', label: '5 Downloads per Image' },
    { value: '10', label: '10 Downloads per Image' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center mr-3">
          <Icon name="Download" size={20} className="text-success" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Download Controls</h2>
          <p className="text-sm text-muted-foreground">Manage how clients can download images</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Enable Downloads */}
        <div>
          <Checkbox
            label="Allow Downloads"
            description="Enable clients to download images from this gallery"
            checked={settings?.allowDownloads}
            onChange={(e) => onSettingsChange({
              ...settings,
              allowDownloads: e?.target?.checked
            })}
          />
        </div>

        {settings?.allowDownloads && (
          <div className="space-y-6 ml-6">
            {/* File Size Options */}
            <div>
              <Select
                label="Available Download Sizes"
                description="Select which image sizes clients can download"
                options={fileSizeOptions}
                value={settings?.downloadSizes}
                onChange={(value) => onSettingsChange({
                  ...settings,
                  downloadSizes: value
                })}
                multiple
                searchable
              />
            </div>

            {/* Download Limits */}
            <div>
              <Select
                label="Download Limits"
                description="Set how many times each image can be downloaded"
                options={downloadLimitOptions}
                value={settings?.downloadLimit}
                onChange={(value) => onSettingsChange({
                  ...settings,
                  downloadLimit: value
                })}
              />
            </div>

            {/* PIN Protection */}
            <div className="space-y-4">
              <Checkbox
                label="PIN Protection for Downloads"
                description="Require a PIN code before allowing downloads"
                checked={settings?.downloadPinProtection}
                onChange={(e) => onSettingsChange({
                  ...settings,
                  downloadPinProtection: e?.target?.checked
                })}
              />
              
              {settings?.downloadPinProtection && (
                <div className="ml-6">
                  <Input
                    label="Download PIN"
                    type="password"
                    placeholder="Enter 4-6 digit PIN"
                    value={settings?.downloadPin}
                    onChange={(e) => onSettingsChange({
                      ...settings,
                      downloadPin: e?.target?.value
                    })}
                    description="Clients will need this PIN to download images"
                    maxLength={6}
                  />
                </div>
              )}
            </div>

            {/* Watermark Options */}
            <div className="space-y-4">
              <Checkbox
                label="Add Watermark to Downloads"
                description="Apply your watermark to downloaded images"
                checked={settings?.addWatermark}
                onChange={(e) => onSettingsChange({
                  ...settings,
                  addWatermark: e?.target?.checked
                })}
              />
              
              {settings?.addWatermark && (
                <div className="ml-6 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Info" size={14} />
                    <span>Watermark settings can be configured in your studio preferences</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bulk Download */}
            <div>
              <Checkbox
                label="Allow Bulk Downloads"
                description="Enable clients to download multiple images at once"
                checked={settings?.allowBulkDownload}
                onChange={(e) => onSettingsChange({
                  ...settings,
                  allowBulkDownload: e?.target?.checked
                })}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadControls;