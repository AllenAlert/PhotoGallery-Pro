import React from 'react';
import Icon from '../../../components/AppIcon';

const ValueProposition = ({ accountType }) => {
  const photographerFeatures = [
    {
      icon: 'Upload',
      title: 'Easy Upload & Organization',
      description: 'Drag & drop RAW files, create collections, and organize your work effortlessly'
    },
    {
      icon: 'Shield',
      title: 'Client Privacy Controls',
      description: 'Password protection, download limits, and screenshot prevention for secure sharing'
    },
    {
      icon: 'Heart',
      title: 'Client Proofing System',
      description: 'Let clients favorite images, leave comments, and make selections seamlessly'
    },
    {
      icon: 'DollarSign',
      title: 'Built-in Commerce',
      description: 'Sell prints, digital downloads, and products directly through your galleries'
    },
    {
      icon: 'BarChart3',
      title: 'Analytics & Insights',
      description: 'Track client engagement, popular images, and gallery performance metrics'
    },
    {
      icon: 'Smartphone',
      title: 'Mobile Optimized',
      description: 'Beautiful responsive galleries that work perfectly on all devices'
    }
  ];

  const clientFeatures = [
    {
      icon: 'Images',
      title: 'Beautiful Gallery Experience',
      description: 'View your photos in stunning high-resolution with smooth navigation'
    },
    {
      icon: 'Download',
      title: 'Easy Downloads',
      description: 'Download your favorite images in multiple sizes and formats'
    },
    {
      icon: 'Heart',
      title: 'Favorites & Collections',
      description: 'Create favorite lists and organize your selected photos'
    },
    {
      icon: 'MessageCircle',
      title: 'Direct Communication',
      description: 'Leave comments and feedback directly on images for your photographer'
    }
  ];

  const features = accountType === 'photographer' ? photographerFeatures : clientFeatures;
  const title = accountType === 'photographer' ?'Everything you need to manage your photography business' :'The best way to view and download your photos';

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground">
          {accountType === 'photographer' ?'Join thousands of photographers who trust PhotoGallery Pro' :'Access your photos anytime, anywhere with our secure platform'
          }
        </p>
      </div>
      <div className="grid gap-4">
        {features?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-muted/30">
            <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name={feature?.icon} size={20} className="text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground mb-1">{feature?.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{feature?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {accountType === 'photographer' && (
        <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Zap" size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">Free 14-day trial</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Start with unlimited uploads and all features. No credit card required.
          </p>
        </div>
      )}
    </div>
  );
};

export default ValueProposition;