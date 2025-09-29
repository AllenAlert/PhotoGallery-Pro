import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const userRole = localStorage.getItem('userRole');
    if (userRole) {
      if (userRole === 'photographer') {
        navigate('/admin-dashboard');
      } else if (userRole === 'client') {
        navigate('/client-gallery-view');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-6rem)]">
          {/* Left Column - Login Form */}
          <div className="flex items-center justify-center">
            <LoginForm />
          </div>

          {/* Right Column - Trust Signals */}
          <div className="hidden lg:block">
            <TrustSignals />
          </div>
        </div>

        {/* Mobile Trust Signals */}
        <div className="lg:hidden mt-16">
          <TrustSignals />
        </div>
      </div>
      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date()?.getFullYear()} PhotoGallery Pro. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <button className="text-muted-foreground hover:text-foreground gallery-transition">
                Privacy Policy
              </button>
              <button className="text-muted-foreground hover:text-foreground gallery-transition">
                Terms of Service
              </button>
              <button className="text-muted-foreground hover:text-foreground gallery-transition">
                Support
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;