import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      role: 'Wedding Photographer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face',
      content: `PhotoGallery Pro transformed my client delivery process. The proofing system saves me hours every week.`,
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Portrait Photographer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
      content: `My clients love the mobile experience. Gallery views increased 300% since switching to this platform.`,
      rating: 5
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'Event Photographer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
      content: `The commerce integration helped me increase print sales by 150%. Couldn't be happier with the results.`,
      rating: 5
    }
  ];

  const securityFeatures = [
    { icon: 'Shield', text: 'SSL Encrypted' },
    { icon: 'Lock', text: 'GDPR Compliant' },
    { icon: 'CheckCircle', text: 'SOC 2 Certified' },
    { icon: 'Eye', text: 'Privacy Protected' }
  ];

  const stats = [
    { number: '50K+', label: 'Photographers' },
    { number: '2M+', label: 'Photos Delivered' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <div className="space-y-8">
      {/* Security Features */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Shield" size={20} className="text-success" />
          <h3 className="text-lg font-semibold text-foreground">Enterprise Security</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name={feature?.icon} size={16} className="text-success" />
              <span className="text-sm text-muted-foreground">{feature?.text}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {stats?.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl font-bold text-foreground">{stat?.number}</div>
            <div className="text-xs text-muted-foreground">{stat?.label}</div>
          </div>
        ))}
      </div>
      {/* Testimonials */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground text-center">
          Trusted by photographers worldwide
        </h3>
        <div className="space-y-4">
          {testimonials?.map((testimonial) => (
            <div key={testimonial?.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={testimonial?.avatar}
                    alt={testimonial?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-foreground">{testimonial?.name}</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial?.rating)]?.map((_, i) => (
                        <Icon key={i} name="Star" size={12} className="text-warning fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{testimonial?.role}</p>
                  <p className="text-sm text-foreground leading-relaxed">{testimonial?.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Awards & Recognition */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Award" size={16} className="text-warning" />
              <span className="text-xs text-muted-foreground">Photography Software of the Year 2024</span>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <span>Featured in PetaPixel</span>
            <span>•</span>
            <span>Recommended by WPPI</span>
            <span>•</span>
            <span>5-star rated</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;