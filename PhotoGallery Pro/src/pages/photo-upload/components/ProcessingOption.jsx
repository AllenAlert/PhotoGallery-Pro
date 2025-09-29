import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { cn } from '../../../utils/cn';

const ProcessingOptions = ({ options, onOptionsChange, isUploading }) => {
  const handleToggle = (key) => {
    onOptionsChange?.({
      ...options,
      [key]: !options?.[key]
    });
  };

  const handleValueChange = (key, value) => {
    onOptionsChange?.({
      ...options,
      [key]: value
    });
  };

  const optionSections = [
    {
      title: 'Image Processing',
      icon: 'Settings',
      options: [
        {
          key: 'autoResize',
          label: 'Auto Resize',
          description: 'Automatically resize large images',
          type: 'toggle'
        },
        {
          key: 'maxWidth',
          label: 'Max Width (px)',
          description: 'Maximum width for resized images',
          type: 'number',
          min: 1024,
          max: 4096,
          step: 256,
          disabled: !options?.autoResize
        },
        {
          key: 'quality',
          label: 'Quality (%)',
          description: 'JPEG compression quality',
          type: 'range',
          min: 60,
          max: 100,
          step: 5
        }
      ]
    },
    {
      title: 'Watermarking',
      icon: 'Shield',
      options: [
        {
          key: 'addWatermark',
          label: 'Add Watermark',
          description: 'Apply watermark to uploaded photos',
          type: 'toggle'
        },
        {
          key: 'watermarkPosition',
          label: 'Watermark Position',
          description: 'Choose watermark placement',
          type: 'select',
          choices: [
            { value: 'top-left', label: 'Top Left' },
            { value: 'top-right', label: 'Top Right' },
            { value: 'bottom-left', label: 'Bottom Left' },
            { value: 'bottom-right', label: 'Bottom Right' },
            { value: 'center', label: 'Center' }
          ],
          disabled: !options?.addWatermark
        }
      ]
    },
    {
      title: 'Organization',
      icon: 'FolderOpen',
      options: [
        {
          key: 'preserveMetadata',
          label: 'Preserve Metadata',
          description: 'Keep EXIF data in uploaded photos',
          type: 'toggle'
        },
        {
          key: 'generateThumbnails',
          label: 'Generate Thumbnails',
          description: 'Create optimized preview images',
          type: 'toggle'
        },
        {
          key: 'autoCategorizationType',
          label: 'Auto Categorization',
          description: 'Automatic photo categorization method',
          type: 'select',
          choices: [
            { value: 'none', label: 'None' },
            { value: 'exif-only', label: 'EXIF Data Only' },
            { value: 'filename-only', label: 'Filename Only' },
            { value: 'exif-filename', label: 'EXIF + Filename' }
          ]
        }
      ]
    }
  ];

  const renderOption = (option) => {
    const isDisabled = isUploading || option?.disabled;

    switch (option?.type) {
      case 'toggle':
        return (
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">
              {option?.label}
            </label>
            <button
              onClick={() => handleToggle(option?.key)}
              disabled={isDisabled}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                options?.[option?.key] ? "bg-accent" : "bg-muted",
                isDisabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-card transition-transform",
                  options?.[option?.key] ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          </div>
        );

      case 'number':
        return (
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              {option?.label}
            </label>
            <Input
              type="number"
              value={options?.[option?.key] || ''}
              onChange={(e) => handleValueChange(option?.key, parseInt(e?.target?.value))}
              min={option?.min}
              max={option?.max}
              step={option?.step}
              disabled={isDisabled}
              className="w-full"
            />
          </div>
        );

      case 'range':
        return (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-foreground">
                {option?.label}
              </label>
              <span className="text-sm text-muted-foreground">
                {options?.[option?.key]}{option?.key === 'quality' ? '%' : ''}
              </span>
            </div>
            <input
              type="range"
              value={options?.[option?.key] || option?.min}
              onChange={(e) => handleValueChange(option?.key, parseInt(e?.target?.value))}
              min={option?.min}
              max={option?.max}
              step={option?.step}
              disabled={isDisabled}
              className={cn(
                "w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer",
                "slider:appearance-none slider:w-4 slider:h-4 slider:bg-accent slider:rounded-full slider:cursor-pointer",
                isDisabled && "opacity-50 cursor-not-allowed"
              )}
            />
          </div>
        );

      case 'select':
        return (
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              {option?.label}
            </label>
            <select
              value={options?.[option?.key] || ''}
              onChange={(e) => handleValueChange(option?.key, e?.target?.value)}
              disabled={isDisabled}
              className={cn(
                "w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm",
                "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
                isDisabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {option?.choices?.map((choice) => (
                <option key={choice?.value} value={choice?.value}>
                  {choice?.label}
                </option>
              ))}
            </select>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg gallery-shadow">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-2">Processing Options</h3>
        <p className="text-sm text-muted-foreground">
          Configure how your photos are processed during upload
        </p>
      </div>

      <div className="p-6 space-y-8">
        {optionSections?.map((section) => (
          <div key={section?.title}>
            <div className="flex items-center gap-2 mb-4">
              <Icon name={section?.icon} size={20} className="text-accent" />
              <h4 className="text-base font-medium text-foreground">{section?.title}</h4>
            </div>

            <div className="space-y-4 pl-7">
              {section?.options?.map((option) => (
                <div key={option?.key}>
                  {renderOption(option)}
                  {option?.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {option?.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Storage Usage */}
        <div className="pt-6 border-t border-border">
          <h4 className="text-base font-medium text-foreground mb-3">Storage Usage</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Used</span>
              <span className="text-foreground">2.4 GB / 10 GB</span>
            </div>
            <div className="w-full bg-muted/20 rounded-full h-2">
              <div className="bg-accent h-2 rounded-full" style={{ width: '24%' }} />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-6 border-t border-border">
          <h4 className="text-base font-medium text-foreground mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              iconName="Download"
              iconPosition="left"
              disabled={isUploading}
            >
              Export Settings
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              iconName="Upload"
              iconPosition="left"
              disabled={isUploading}
            >
              Import Settings
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              iconName="RotateCcw"
              iconPosition="left"
              disabled={isUploading}
              onClick={() => {
                // Reset to defaults
                onOptionsChange?.({
                  autoResize: true,
                  maxWidth: 2048,
                  quality: 85,
                  addWatermark: false,
                  watermarkPosition: 'bottom-right',
                  preserveMetadata: true,
                  autoCategorizationType: 'exif-filename',
                  generateThumbnails: true
                });
              }}
            >
              Reset to Defaults
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingOptions;