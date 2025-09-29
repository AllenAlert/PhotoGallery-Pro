import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import UserMenu from './UserMenu';
import NotificationBadge from './NotificationBadge';

const TopNavigation = ({ userRole = 'photographer', isCollapsed = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const photographerNavItems = [
    { label: 'Dashboard', path: '/admin-dashboard', icon: 'LayoutDashboard' },
    { label: 'Settings', path: '/privacy-and-settings', icon: 'Settings' },
    { label: 'Share', path: '/share-and-publish', icon: 'Share2' },
    { label: 'Gallery', path: '/client-gallery-view', icon: 'Images' }
  ];

  const clientNavItems = [
    { label: 'Gallery', path: '/client-gallery-view', icon: 'Images' }
  ];

  const navItems = userRole === 'photographer' ? photographerNavItems : clientNavItems;

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[1000] bg-card border-b border-border">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <div className="flex items-center">
            <div 
              className="flex items-center cursor-pointer gallery-transition hover:opacity-80"
              onClick={() => handleNavigation('/admin-dashboard')}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                <Icon name="Camera" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">PhotoGallery Pro</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium gallery-transition ${
                  isActivePath(item?.path)
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} className="mr-2" />
                {item?.label}
              </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            <NotificationBadge userRole={userRole} />
            <UserMenu userRole={userRole} />
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <nav className="px-6 py-4 space-y-2">
              {navItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium gallery-transition ${
                    isActivePath(item?.path)
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} className="mr-3" />
                  {item?.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[999] bg-black/20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default TopNavigation;