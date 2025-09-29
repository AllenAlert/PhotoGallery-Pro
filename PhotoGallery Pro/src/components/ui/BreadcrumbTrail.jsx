import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbTrail = ({ userRole = 'photographer' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeLabels = {
    '/admin-dashboard': 'Dashboard',
    '/privacy-and-settings': 'Privacy & Settings',
    '/share-and-publish': 'Share & Publish',
    '/client-gallery-view': 'Gallery View',
    '/login': 'Sign In',
    '/register': 'Sign Up'
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [];

    // Always start with Home/Dashboard for photographers
    if (userRole === 'photographer' && location?.pathname !== '/admin-dashboard') {
      breadcrumbs?.push({
        label: 'Dashboard',
        path: '/admin-dashboard',
        isClickable: true
      });
    }

    // Add current page
    const currentLabel = routeLabels?.[location?.pathname];
    if (currentLabel && location?.pathname !== '/admin-dashboard') {
      breadcrumbs?.push({
        label: currentLabel,
        path: location?.pathname,
        isClickable: false
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleBreadcrumbClick = (path) => {
    navigate(path);
  };

  // Don't show breadcrumbs on auth pages or if no breadcrumbs to show
  if (['/login', '/register']?.includes(location?.pathname) || breadcrumbs?.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      {breadcrumbs?.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb?.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground/60" />
          )}
          
          {breadcrumb?.isClickable ? (
            <button
              onClick={() => handleBreadcrumbClick(breadcrumb?.path)}
              className="gallery-transition hover:text-foreground focus:outline-none focus:text-foreground"
            >
              {breadcrumb?.label}
            </button>
          ) : (
            <span className="text-foreground font-medium">
              {breadcrumb?.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadcrumbTrail;