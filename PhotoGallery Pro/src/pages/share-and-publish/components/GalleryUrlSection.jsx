import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const GalleryUrlSection = ({ galleryUrl, onUrlUpdate }) => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard?.writeText(galleryUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleCustomizeUrl = () => {
    setIsCustomizing(true);
    setCustomUrl(galleryUrl?.split('/')?.pop());
  };

  const handleSaveCustomUrl = () => {
    if (customUrl?.trim()) {
      const baseUrl = galleryUrl?.substring(0, galleryUrl?.lastIndexOf('/'));
      const newUrl = `${baseUrl}/${customUrl?.trim()}`;
      onUrlUpdate(newUrl);
      setIsCustomizing(false);
    }
  };

  const handleCancelCustomize = () => {
    setIsCustomizing(false);
    setCustomUrl('');
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Gallery URL</h3>
        <Button
          variant="outline"
          size="sm"
          iconName="Edit3"
          iconPosition="left"
          onClick={handleCustomizeUrl}
          disabled={isCustomizing}
        >
          Customize
        </Button>
      </div>
      {isCustomizing ? (
        <div className="space-y-4">
          <Input
            label="Custom URL"
            type="text"
            value={customUrl}
            onChange={(e) => setCustomUrl(e?.target?.value)}
            placeholder="my-wedding-gallery"
            description="Create a memorable URL for your gallery"
          />
          <div className="flex items-center space-x-3">
            <Button
              variant="default"
              size="sm"
              iconName="Check"
              iconPosition="left"
              onClick={handleSaveCustomUrl}
              disabled={!customUrl?.trim()}
            >
              Save URL
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancelCustomize}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <div className="flex-1 font-mono text-sm text-foreground break-all">
              {galleryUrl}
            </div>
            <Button
              variant={copySuccess ? "success" : "outline"}
              size="sm"
              iconName={copySuccess ? "Check" : "Copy"}
              onClick={handleCopyUrl}
            >
              {copySuccess ? "Copied!" : "Copy"}
            </Button>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Globe" size={16} />
            <span>Public gallery link - anyone with this URL can view your gallery</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryUrlSection;