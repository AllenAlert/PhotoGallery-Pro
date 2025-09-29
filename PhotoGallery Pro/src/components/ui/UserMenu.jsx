import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Image from '../AppImage';

const UserMenu = ({ userRole = 'photographer' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const userData = {
    photographer: {
      name: 'Alex Johnson',
      email: 'alex@photogallery.com',
      avatar: '/assets/images/photographer-avatar.jpg',
      role: 'Professional Photographer'
    },
    client: {
      name: 'Sarah Wilson',
      email: 'sarah@email.com',
      avatar: '/assets/images/client-avatar.jpg',
      role: 'Client'
    }
  };

  const user = userData?.[userRole];

  const photographerMenuItems = [
    { label: 'Profile Settings', icon: 'User', action: 'profile' },
    { label: 'Account Settings', icon: 'Settings', action: 'settings' },
    { label: 'Billing', icon: 'CreditCard', action: 'billing' },
    { label: 'Help & Support', icon: 'HelpCircle', action: 'help' },
    { label: 'Sign Out', icon: 'LogOut', action: 'logout', variant: 'destructive' }
  ];

  const clientMenuItems = [
    { label: 'My Account', icon: 'User', action: 'profile' },
    { label: 'Download History', icon: 'Download', action: 'downloads' },
    { label: 'Help', icon: 'HelpCircle', action: 'help' },
    { label: 'Sign Out', icon: 'LogOut', action: 'logout', variant: 'destructive' }
  ];

  const menuItems = userRole === 'photographer' ? photographerMenuItems : clientMenuItems;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuAction = (action) => {
    setIsOpen(false);
    
    switch (action) {
      case 'profile': console.log('Navigate to profile');
        break;
      case 'settings': console.log('Navigate to settings');
        break;
      case 'billing': console.log('Navigate to billing');
        break;
      case 'downloads':
        console.log('Navigate to downloads');
        break;
      case 'help': console.log('Open help center');
        break;
      case 'logout': console.log('Sign out user');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef?.current && !menuRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* User Avatar Button */}
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-2 p-1 rounded-lg gallery-transition hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
          <Image
            src={user?.avatar}
            alt={user?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-muted-foreground gallery-transition ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg gallery-shadow-lg z-[1010]">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                <Image
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user?.role}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems?.map((item, index) => (
              <button
                key={index}
                onClick={() => handleMenuAction(item?.action)}
                className={`flex items-center w-full px-4 py-2 text-sm gallery-transition ${
                  item?.variant === 'destructive' ?'text-destructive hover:bg-destructive/10' :'text-foreground hover:bg-muted'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={16} 
                  className={`mr-3 ${
                    item?.variant === 'destructive' ? 'text-destructive' : 'text-muted-foreground'
                  }`}
                />
                {item?.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;