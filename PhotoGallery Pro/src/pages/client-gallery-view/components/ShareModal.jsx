import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ShareModal = ({ isOpen, onClose, collection }) => {
  const [copied, setCopied] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const shareUrl = `https://photogallery.pro/gallery/${collection?.id}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard?.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleSocialShare = (platform) => {
    const text = `Check out these amazing photos from ${collection?.photographer}!`;
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text} ${shareUrl}`)}`,
      email: `mailto:?subject=${encodeURIComponent(`Photos from ${collection?.photographer}`)}&body=${encodeURIComponent(`${text}\n\n${shareUrl}`)}`
    };

    if (urls?.[platform]) {
      window.open(urls?.[platform], '_blank', 'width=600,height=400');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1020] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Share Gallery</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center gallery-transition"
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Gallery Info */}
          <div className="text-center">
            <h3 className="font-medium text-foreground mb-1">{collection?.title}</h3>
            <p className="text-sm text-muted-foreground">by {collection?.photographer}</p>
          </div>

          {/* Share Link */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Gallery Link
            </label>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 text-sm"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                iconName={copied ? "Check" : "Copy"}
                iconPosition="left"
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>

          {/* QR Code */}
          <div className="text-center">
            <label className="block text-sm font-medium text-foreground mb-3">
              QR Code
            </label>
            <div className="inline-block p-4 bg-white rounded-lg">
              <img
                src={qrCodeUrl}
                alt="Gallery QR Code"
                className="w-32 h-32"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Scan to open gallery on mobile
            </p>
          </div>

          {/* Social Sharing */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Share on Social Media
            </label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => handleSocialShare('facebook')}
                iconName="Facebook"
                iconPosition="left"
                className="justify-start"
              >
                Facebook
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialShare('twitter')}
                iconName="Twitter"
                iconPosition="left"
                className="justify-start"
              >
                Twitter
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialShare('whatsapp')}
                iconName="MessageCircle"
                iconPosition="left"
                className="justify-start"
              >
                WhatsApp
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialShare('email')}
                iconName="Mail"
                iconPosition="left"
                className="justify-start"
              >
                Email
              </Button>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={16} className="text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Privacy Protected
                </p>
                <p className="text-xs text-muted-foreground">
                  This gallery is password protected and only accessible to people with the link.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;