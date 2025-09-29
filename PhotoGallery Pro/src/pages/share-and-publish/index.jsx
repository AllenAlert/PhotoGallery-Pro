import React, { useState, useEffect } from 'react';
import TopNavigation from '../../components/ui/TopNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import GalleryUrlSection from './components/GalleryUrlSection';
import QRCodeGenerator from './components/QRCodeGenerator';
import SocialMediaSharing from './components/SocialMediaSharing';
import EmailInvitationSystem from './components/EmailInvitationSystem';
import GalleryPreview from './components/GalleryPreview';
import ActivityTracking from './components/ActivityTracking';
import PublishingControls from './components/PublishingControls';

const ShareAndPublish = () => {
  const [galleryData, setGalleryData] = useState({
    id: 'wedding-sarah-mike-2024',
    title: 'Sarah & Mike Wedding Collection',
    description: 'Beautiful moments from Sarah and Mike\'s wedding day at Sunset Manor',
    photoCount: 247,
    isPublished: true,
    createdAt: '2024-09-25',
    lastModified: '2024-09-29'
  });

  const [galleryUrl, setGalleryUrl] = useState('https://photogallery.pro/gallery/wedding-sarah-mike-2024');

  useEffect(() => {
    // Set page title
    document.title = 'Share & Publish - PhotoGallery Pro';
  }, []);

  const handleUrlUpdate = (newUrl) => {
    setGalleryUrl(newUrl);
  };

  const handlePublishStatusChange = (isPublished) => {
    setGalleryData(prev => ({
      ...prev,
      isPublished,
      lastModified: new Date()?.toISOString()?.split('T')?.[0]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation userRole="photographer" />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <BreadcrumbTrail userRole="photographer" />
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Share & Publish
            </h1>
            <p className="text-muted-foreground">
              Distribute your gallery through multiple channels and track client engagement
            </p>
          </div>

          {/* Gallery Info Banner */}
          <div className="bg-card rounded-lg border border-border p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-foreground mb-1">
                  {galleryData?.title}
                </h2>
                <p className="text-muted-foreground mb-2">
                  {galleryData?.description}
                </p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>{galleryData?.photoCount} photos</span>
                  <span>•</span>
                  <span>Created {galleryData?.createdAt}</span>
                  <span>•</span>
                  <span>Last modified {galleryData?.lastModified}</span>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                galleryData?.isPublished 
                  ? 'bg-success/10 text-success' :'bg-muted text-muted-foreground'
              }`}>
                {galleryData?.isPublished ? 'Published' : 'Draft'}
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Gallery URL Section */}
              <GalleryUrlSection 
                galleryUrl={galleryUrl}
                onUrlUpdate={handleUrlUpdate}
              />

              {/* QR Code Generator */}
              <QRCodeGenerator galleryUrl={galleryUrl} />

              {/* Social Media Sharing */}
              <SocialMediaSharing 
                galleryUrl={galleryUrl}
                galleryTitle={galleryData?.title}
              />

              {/* Publishing Controls */}
              <PublishingControls 
                onPublishStatusChange={handlePublishStatusChange}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Email Invitation System */}
              <EmailInvitationSystem 
                galleryTitle={galleryData?.title}
                galleryUrl={galleryUrl}
              />

              {/* Gallery Preview */}
              <GalleryPreview galleryData={galleryData} />

              {/* Activity Tracking */}
              <ActivityTracking />
            </div>
          </div>

          {/* Additional Actions */}
          <div className="mt-12 bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Advanced Sharing Options
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Embed Code</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Embed this gallery on your website or blog
                </p>
                <button className="text-sm text-accent hover:text-accent/80 gallery-transition">
                  Generate Embed Code →
                </button>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Direct Downloads</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Create direct download links with expiration
                </p>
                <button className="text-sm text-accent hover:text-accent/80 gallery-transition">
                  Create Download Links →
                </button>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Print Gallery</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Generate print-friendly version for clients
                </p>
                <button className="text-sm text-accent hover:text-accent/80 gallery-transition">
                  Create Print Version →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareAndPublish;