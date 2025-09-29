import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const GalleryPreview = ({ galleryData }) => {
  const [previewMode, setPreviewMode] = useState('desktop');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const samplePhotos = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400',
      alt: 'Wedding ceremony moment',
      title: 'Ceremony Moments'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400',
      alt: 'Couple portrait',
      title: 'Couple Portraits'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400',
      alt: 'Reception celebration',
      title: 'Reception Fun'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
      alt: 'Detail shots',
      title: 'Beautiful Details'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400',
      alt: 'Family moments',
      title: 'Family Joy'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400',
      alt: 'Candid moments',
      title: 'Candid Shots'
    }
  ];

  const openPreview = () => {
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  const PreviewContent = () => (
    <div className={`bg-background ${previewMode === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'}`}>
      {/* Gallery Header */}
      <div className="bg-card border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {galleryData?.title}
            </h1>
            <p className="text-muted-foreground">
              By Alex Johnson Photography • {samplePhotos?.length} photos
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Heart">
              Favorites
            </Button>
            <Button variant="default" size="sm" iconName="Download">
              Download
            </Button>
          </div>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="p-6">
        <div className={`grid gap-4 ${
          previewMode === 'mobile' ?'grid-cols-2' :'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        }`}>
          {samplePhotos?.map((photo) => (
            <div
              key={photo?.id}
              className="group relative aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer gallery-transition hover:gallery-shadow-lg"
            >
              <Image
                src={photo?.src}
                alt={photo?.alt}
                className="w-full h-full object-cover gallery-transition group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 gallery-transition" />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 gallery-transition">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 bg-white/90 hover:bg-white text-foreground"
                  iconName="Heart"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Gallery Preview</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={previewMode === 'desktop' ? 'default' : 'ghost'}
              size="sm"
              iconName="Monitor"
              onClick={() => setPreviewMode('desktop')}
            />
            <Button
              variant={previewMode === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              iconName="Smartphone"
              onClick={() => setPreviewMode('mobile')}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="ExternalLink"
            iconPosition="left"
            onClick={openPreview}
          >
            Full Preview
          </Button>
        </div>
      </div>
      {/* Mini Preview */}
      <div className="border border-border rounded-lg overflow-hidden bg-background">
        <div className={`${previewMode === 'mobile' ? 'max-w-xs mx-auto' : 'w-full'} scale-75 origin-top`}>
          <PreviewContent />
        </div>
      </div>
      {/* Preview Stats */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-muted rounded-lg">
          <div className="text-lg font-semibold text-foreground">{samplePhotos?.length}</div>
          <div className="text-xs text-muted-foreground">Photos</div>
        </div>
        <div className="p-3 bg-muted rounded-lg">
          <div className="text-lg font-semibold text-foreground">2.4GB</div>
          <div className="text-xs text-muted-foreground">Total Size</div>
        </div>
        <div className="p-3 bg-muted rounded-lg">
          <div className="text-lg font-semibold text-foreground">Public</div>
          <div className="text-xs text-muted-foreground">Visibility</div>
        </div>
      </div>
      {/* Full Screen Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg max-w-6xl max-h-[90vh] w-full overflow-auto">
            <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Gallery Preview</h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-muted rounded-lg p-1">
                  <Button
                    variant={previewMode === 'desktop' ? 'default' : 'ghost'}
                    size="sm"
                    iconName="Monitor"
                    onClick={() => setPreviewMode('desktop')}
                  />
                  <Button
                    variant={previewMode === 'mobile' ? 'default' : 'ghost'}
                    size="sm"
                    iconName="Smartphone"
                    onClick={() => setPreviewMode('mobile')}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="X"
                  onClick={closePreview}
                />
              </div>
            </div>
            <div className="p-4">
              <PreviewContent />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPreview;