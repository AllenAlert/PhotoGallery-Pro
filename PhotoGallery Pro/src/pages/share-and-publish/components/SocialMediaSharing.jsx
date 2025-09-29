import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialMediaSharing = ({ galleryUrl, galleryTitle }) => {
  const [shareSuccess, setShareSuccess] = useState('');

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700',
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(galleryUrl)}`
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      color: 'bg-sky-500 hover:bg-sky-600',
      shareUrl: `https://twitter.com/intent/tweet?url=${encodeURIComponent(galleryUrl)}&text=${encodeURIComponent(`Check out my photo gallery: ${galleryTitle}`)}`
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'bg-blue-700 hover:bg-blue-800',
      shareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(galleryUrl)}`
    },
    {
      name: 'WhatsApp',
      icon: 'MessageCircle',
      color: 'bg-green-600 hover:bg-green-700',
      shareUrl: `https://wa.me/?text=${encodeURIComponent(`${galleryTitle} - ${galleryUrl}`)}`
    }
  ];

  const handleSocialShare = (platform) => {
    window.open(platform?.shareUrl, '_blank', 'width=600,height=400');
    setShareSuccess(platform?.name);
    setTimeout(() => setShareSuccess(''), 3000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: galleryTitle,
          text: 'Check out my photo gallery',
          url: galleryUrl
        });
        setShareSuccess('Native');
        setTimeout(() => setShareSuccess(''), 3000);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  const copyShareText = async () => {
    const shareText = `${galleryTitle}\n\nView my photo gallery: ${galleryUrl}`;
    try {
      await navigator.clipboard?.writeText(shareText);
      setShareSuccess('Copied');
      setTimeout(() => setShareSuccess(''), 3000);
    } catch (err) {
      console.error('Failed to copy share text:', err);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Social Media Sharing</h3>
      <div className="space-y-4">
        {/* Social Platform Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {socialPlatforms?.map((platform) => (
            <Button
              key={platform?.name}
              variant="outline"
              size="sm"
              className={`${platform?.color} text-white border-transparent hover:border-transparent`}
              iconName={platform?.icon}
              iconPosition="left"
              onClick={() => handleSocialShare(platform)}
            >
              {platform?.name}
            </Button>
          ))}
        </div>

        {/* Native Share and Copy Options */}
        <div className="flex items-center space-x-3 pt-4 border-t border-border">
          {navigator.share && (
            <Button
              variant="outline"
              size="sm"
              iconName="Share"
              iconPosition="left"
              onClick={handleNativeShare}
            >
              Share
            </Button>
          )}
          
          <Button
            variant={shareSuccess === 'Copied' ? 'success' : 'outline'}
            size="sm"
            iconName={shareSuccess === 'Copied' ? 'Check' : 'Copy'}
            iconPosition="left"
            onClick={copyShareText}
          >
            {shareSuccess === 'Copied' ? 'Copied!' : 'Copy Share Text'}
          </Button>
        </div>

        {/* Success Message */}
        {shareSuccess && shareSuccess !== 'Copied' && (
          <div className="flex items-center space-x-2 p-3 bg-success/10 text-success rounded-lg">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm">Shared to {shareSuccess}!</span>
          </div>
        )}

        {/* Share Preview */}
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-2">Share Preview</h4>
          <div className="text-sm text-muted-foreground">
            <p className="font-medium">{galleryTitle}</p>
            <p className="mt-1">Check out my photo gallery</p>
            <p className="mt-1 font-mono text-xs break-all">{galleryUrl}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaSharing;