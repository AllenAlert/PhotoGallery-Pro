import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Bank-Level Security',
      description: 'Your photos and data are protected with enterprise-grade encryption'
    },
    {
      icon: 'Users',
      title: 'Trusted by 10,000+ Photographers',
      description: 'Join thousands of professionals who trust PhotoGallery Pro'
    },
    {
      icon: 'Award',
      title: 'Industry Certified',
      description: 'SOC 2 compliant with regular security audits'
    }
  ];

  const testimonials = [
    {
      name: 'Emma Rodriguez',
      role: 'Wedding Photographer',
      content: `PhotoGallery Pro transformed my client delivery process. The galleries are stunning and my clients love the experience.`,
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Portrait Photographer',
      content: `The proofing system saves me hours every week. Clients can easily select their favorites and the ordering process is seamless.`,
      rating: 5
    }
  ];

  return (
    <div className="space-y-12">
      {/* Trust Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {trustFeatures?.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name={feature?.icon} size={24} className="text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{feature?.title}</h3>
            <p className="text-sm text-muted-foreground">{feature?.description}</p>
          </div>
        ))}
      </div>
      {/* Testimonials */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-foreground text-center mb-8">
          Trusted by Professional Photographers
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials?.map((testimonial, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-6 gallery-shadow">
              <div className="flex items-center mb-4">
                {[...Array(testimonial?.rating)]?.map((_, i) => (
                  <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                ))}
              </div>
              
              <blockquote className="text-muted-foreground mb-4 italic">
                "{testimonial?.content}"
              </blockquote>
              
              <div className="flex items-center">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mr-3">
                  <Icon name="User" size={16} className="text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium text-foreground">{testimonial?.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial?.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-8 pt-8 border-t border-border">
        <div className="flex items-center text-sm text-muted-foreground">
          <Icon name="Shield" size={16} className="mr-2 text-success" />
          SSL Certificate
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Icon name="Lock" size={16} className="mr-2 text-success" />
          GDPR Compliant
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Icon name="CheckCircle" size={16} className="mr-2 text-success" />
          SOC 2 Certified
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;