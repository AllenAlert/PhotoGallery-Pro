import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import RegistrationForm from './components/RegistrationForm';
import ValueProposition from './components/ValueProposition';
import TrustSignals from './components/TrustSignals';

const Register = () => {
  const [selectedAccountType, setSelectedAccountType] = useState('photographer');

  const handleGoogleSignUp = () => {
    // Mock Google OAuth integration
    console.log('Google Sign Up initiated');
    // In real implementation, this would trigger Google OAuth flow
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - PhotoGallery Pro | Professional Photo Sharing Platform</title>
        <meta name="description" content="Join PhotoGallery Pro - the leading platform for photographers to share, proof, and sell photos online. Start your free trial today." />
        <meta name="keywords" content="photo gallery, photographer signup, photo sharing, client proofing, photo sales" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                  <Icon name="Camera" size={20} color="white" />
                </div>
                <span className="text-xl font-semibold text-foreground">PhotoGallery Pro</span>
              </div>

              {/* Navigation */}
              <div className="flex items-center space-x-4">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground gallery-transition">
                  Features
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground gallery-transition">
                  Pricing
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground gallery-transition">
                  Support
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Hero & Value Proposition */}
            <div className="space-y-8">
              {/* Hero Section */}
              <div className="text-center lg:text-left">
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Start sharing photos
                  <span className="block text-accent">like a pro</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                  Join thousands of photographers using PhotoGallery Pro to deliver stunning galleries, 
                  streamline client proofing, and grow their business.
                </p>
                
                {/* Key Benefits */}
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
                  <div className="flex items-center space-x-2 bg-success/10 text-success px-3 py-1 rounded-full">
                    <Icon name="Check" size={16} />
                    <span className="text-sm font-medium">14-day free trial</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-success/10 text-success px-3 py-1 rounded-full">
                    <Icon name="Check" size={16} />
                    <span className="text-sm font-medium">No credit card required</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-success/10 text-success px-3 py-1 rounded-full">
                    <Icon name="Check" size={16} />
                    <span className="text-sm font-medium">Cancel anytime</span>
                  </div>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative rounded-2xl overflow-hidden gallery-shadow-lg">
                <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/5">
                  <Image
                    src="https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=450&fit=crop"
                    alt="Professional photographer using PhotoGallery Pro dashboard"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Value Proposition - Hidden on mobile, shown on desktop */}
              <div className="hidden lg:block">
                <ValueProposition accountType={selectedAccountType} />
              </div>
            </div>

            {/* Right Column - Registration Form */}
            <div className="space-y-8">
              {/* Registration Card */}
              <div className="bg-card border border-border rounded-2xl p-8 gallery-shadow">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Create your account</h2>
                  <p className="text-muted-foreground">
                    Get started with PhotoGallery Pro in less than 2 minutes
                  </p>
                </div>

                <RegistrationForm 
                  onGoogleSignUp={handleGoogleSignUp}
                />
              </div>

              {/* Trust Signals */}
              <TrustSignals />
            </div>
          </div>

          {/* Mobile Value Proposition */}
          <div className="lg:hidden mt-12">
            <ValueProposition accountType={selectedAccountType} />
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-16 text-center bg-muted/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to transform your photography business?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join the community of professional photographers who have streamlined their workflow 
              and increased their revenue with PhotoGallery Pro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Users" size={16} />
                <span>50,000+ photographers trust us</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Star" size={16} className="text-warning" />
                <span>4.9/5 average rating</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Shield" size={16} className="text-success" />
                <span>Enterprise-grade security</span>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-card mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground gallery-transition">Terms of Service</a>
                <a href="#" className="hover:text-foreground gallery-transition">Privacy Policy</a>
                <a href="#" className="hover:text-foreground gallery-transition">Cookie Policy</a>
                <a href="#" className="hover:text-foreground gallery-transition">Support</a>
              </div>
              <div className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} PhotoGallery Pro. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Register;