import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import UserMenu from './UserMenu';
import NotificationBadge from './NotificationBadge';

const SIDEBAR_WIDTH_CLASS = 'w-72';

const TopNavigation = ({ userRole = 'photographer' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const photographerNavConfig = {
    main: [
      { label: 'Dashboard', path: '/admin-dashboard', icon: 'LayoutDashboard' },
      { label: 'Collections', path: '/collection-management', icon: 'FolderOpen' },
      { label: 'Clients', path: '/client-management', icon: 'Users' },
      { label: 'Uploads', path: '/photo-upload', icon: 'UploadCloud' },
      { label: 'Share & Publish', path: '/share-and-publish', icon: 'Share2' },
    ],
    secondary: [
      { label: 'Client Gallery', path: '/client-gallery-view', icon: 'Images' },
      { label: 'Privacy & Settings', path: '/privacy-and-settings', icon: 'Settings' },
    ],
  };

  const clientNavConfig = {
    main: [{ label: 'Gallery Overview', path: '/client-gallery-view', icon: 'Images' }],
    secondary: [
      { label: 'Downloads', path: '/client-gallery-view?tab=downloads', icon: 'Download' },
      { label: 'Settings', path: '/privacy-and-settings', icon: 'Settings' },
    ],
  };

  const navConfig = userRole === 'photographer' ? photographerNavConfig : clientNavConfig;

  const isActivePath = (path) => {
    if (!path) {
      return false;
    }

    if (path.startsWith('http')) {
      return false;
    }

    const [targetPath, targetQuery] = path.split('?');
    const matchesPath = location?.pathname === targetPath;

    if (!targetQuery) {
      return matchesPath;
    }

    return matchesPath && location?.search === `?${targetQuery}`;
  };

  const handleNavigation = (path) => {
    if (!path) {
      return;
    }

    if (path.startsWith('http')) {
      window.open(path, '_blank', 'noopener,noreferrer');
      setIsMobileMenuOpen(false);
      return;
    }

    const [targetPath, targetQuery] = path.split('?');
    navigate({
      pathname: targetPath,
      search: targetQuery ? `?${targetQuery}` : '',
    });
    setIsMobileMenuOpen(false);
  };

  const storageUsage = { used: 0.03, total: 3 };
  const storagePercent = Math.min(100, Math.round((storageUsage.used / storageUsage.total) * 1000) / 10);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderNavButton = (item) => {
    const isActive = isActivePath(item?.path);
    const baseClasses = 'flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors';
    const activeClasses = 'bg-muted text-foreground shadow-sm';
    const inactiveClasses = 'text-muted-foreground hover:bg-muted/60 hover:text-foreground';

    return (
      <button
        key={item?.path}
        type="button"
        onClick={() => handleNavigation(item?.path)}
        className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      >
        <Icon
          name={item?.icon}
          size={18}
          className={`transition-colors ${isActive ? 'text-accent' : 'text-muted-foreground'}`}
        />
        <span className="truncate">{item?.label}</span>
        {isActive && <span className="ml-auto h-2 w-2 rounded-full bg-accent" />}
      </button>
    );
  };

  const renderSidebarContent = () => (
    <>
      <div className="border-b border-border px-5 pb-4 pt-6">
        <button
          type="button"
          onClick={() => handleNavigation('/admin-dashboard')}
          className="flex w-full items-center gap-3 rounded-lg border border-border px-3 py-2 text-left transition-colors hover:border-accent"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background">
            <Icon name="Camera" size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              PhotoGallery Pro
            </span>
            <span className="text-sm font-semibold text-foreground">Client Gallery</span>
          </div>
          <Icon name="ChevronDown" size={16} className="ml-auto text-muted-foreground" />
        </button>

        <div className="mt-5 flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            onClick={() => handleNavigation('https://support.photogallery.pro')}
          >
            <Icon name="LifeBuoy" size={16} />
            Support
          </button>
          <NotificationBadge userRole={userRole} />
          <UserMenu userRole={userRole} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-6">
        <div className="space-y-1">
          {navConfig?.main?.map(renderNavButton)}
        </div>
        {navConfig?.secondary?.length > 0 && (
          <div className="mt-6 space-y-1 border-t border-border pt-6">
            {navConfig?.secondary?.map(renderNavButton)}
          </div>
        )}
      </div>

      <div className="px-4 pb-6">
        <div className="rounded-xl border border-border bg-muted/60 p-4">
          <div className="flex items-center justify-between text-sm font-medium text-foreground">
            <span>Storage</span>
            <span>{`${storagePercent}%`}</span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-success transition-all"
              style={{ width: `${storagePercent}%` }}
            />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {`${storageUsage.used.toFixed(2)} GB of ${storageUsage.total} GB used`}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4 w-full"
            iconName="CirclePlus"
            iconPosition="left"
          >
            Upgrade plan
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="sticky top-0 z-[1000] border-b border-border bg-card md:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <button
            type="button"
            onClick={() => handleNavigation('/admin-dashboard')}
            className="flex flex-1 items-center gap-3 text-left"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background">
              <Icon name="Camera" size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                PhotoGallery Pro
              </span>
              <span className="flex items-center gap-1 text-sm font-semibold text-foreground">
                Client Gallery
                <Icon name="ChevronDown" size={14} className="text-muted-foreground" />
              </span>
            </div>
          </button>
          <div className="ml-3 flex items-center gap-1">
            <button
              type="button"
              className="rounded-lg border border-transparent p-2 text-muted-foreground transition-colors hover:border-border hover:text-foreground"
              onClick={() => handleNavigation('https://support.photogallery.pro')}
            >
              <Icon name="LifeBuoy" size={18} />
            </button>
            <NotificationBadge userRole={userRole} />
            <UserMenu userRole={userRole} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
            </Button>
          </div>
        </div>
      </div>

      <aside
        className={`hidden md:flex fixed top-0 left-0 h-screen ${SIDEBAR_WIDTH_CLASS} flex-col border-r border-border bg-card z-[1000]`}
      >
        {renderSidebarContent()}
      </aside>

      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-[999] bg-black/30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-[1000] flex w-72 max-w-[80vw] flex-col border-r border-border bg-card shadow-xl md:hidden">
            {renderSidebarContent()}
          </div>
        </>
      )}
    </>
  );
};

export default TopNavigation;
