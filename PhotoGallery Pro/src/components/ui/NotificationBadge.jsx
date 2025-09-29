import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const NotificationBadge = ({ userRole = 'photographer' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const menuRef = useRef(null);

  // Mock notifications data
  const mockNotifications = {
    photographer: [
      {
        id: 1,
        type: 'client_activity',
        title: 'New gallery views',
        message: 'Sarah Wilson viewed "Wedding Collection" 3 times',
        timestamp: '2 minutes ago',
        isRead: false,
        icon: 'Eye'
      },
      {
        id: 2,
        type: 'download',
        title: 'Photos downloaded',
        message: 'Client downloaded 12 photos from "Engagement Session"',
        timestamp: '1 hour ago',
        isRead: false,
        icon: 'Download'
      },
      {
        id: 3,
        type: 'comment',
        title: 'New comment',
        message: 'Mike Johnson left a comment on "Corporate Headshots"',
        timestamp: '3 hours ago',
        isRead: true,
        icon: 'MessageCircle'
      },
      {
        id: 4,
        type: 'system',
        title: 'Gallery published',
        message: 'Your "Birthday Party" gallery is now live',
        timestamp: '1 day ago',
        isRead: true,
        icon: 'CheckCircle'
      }
    ],
    client: [
      {
        id: 1,
        type: 'gallery_ready',
        title: 'New photos available',
        message: 'Your wedding photos are ready for viewing',
        timestamp: '30 minutes ago',
        isRead: false,
        icon: 'Images'
      },
      {
        id: 2,
        type: 'download_ready',
        title: 'Download ready',
        message: 'Your high-resolution photos are ready for download',
        timestamp: '2 hours ago',
        isRead: true,
        icon: 'Download'
      }
    ]
  };

  useEffect(() => {
    const userNotifications = mockNotifications?.[userRole] || [];
    setNotifications(userNotifications);
    setUnreadCount(userNotifications?.filter(n => !n?.isRead)?.length);
  }, [userRole]);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev?.map(notification => 
        notification?.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev?.map(notification => ({ ...notification, isRead: true }))
    );
    setUnreadCount(0);
  };

  const clearNotification = (notificationId) => {
    setNotifications(prev => prev?.filter(n => n?.id !== notificationId));
    const notification = notifications?.find(n => n?.id === notificationId);
    if (notification && !notification?.isRead) {
      setUnreadCount(prev => Math.max(0, prev - 1));
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

  // Don't show notifications for clients if they have none
  if (userRole === 'client' && notifications?.length === 0) {
    return null;
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Notification Bell Button */}
      <button
        onClick={toggleNotifications}
        className="relative p-2 rounded-lg gallery-transition hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <Icon name="Bell" size={18} className="text-muted-foreground" />
        
        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs font-medium rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      {/* Notifications Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg gallery-shadow-lg z-[1015]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-accent hover:text-accent/80 gallery-transition"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications?.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <Icon name="Bell" size={32} className="text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No notifications yet</p>
              </div>
            ) : (
              <div className="py-2">
                {notifications?.map((notification) => (
                  <div
                    key={notification?.id}
                    className={`flex items-start px-4 py-3 gallery-transition hover:bg-muted/50 ${
                      !notification?.isRead ? 'bg-accent/5' : ''
                    }`}
                  >
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      !notification?.isRead ? 'bg-accent/10' : 'bg-muted'
                    }`}>
                      <Icon 
                        name={notification?.icon} 
                        size={14} 
                        className={!notification?.isRead ? 'text-accent' : 'text-muted-foreground'}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className={`text-sm ${!notification?.isRead ? 'font-medium text-foreground' : 'text-foreground'}`}>
                            {notification?.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {notification?.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification?.timestamp}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-1 ml-2">
                          {!notification?.isRead && (
                            <button
                              onClick={() => markAsRead(notification?.id)}
                              className="p-1 rounded hover:bg-muted gallery-transition"
                              title="Mark as read"
                            >
                              <Icon name="Check" size={12} className="text-muted-foreground" />
                            </button>
                          )}
                          <button
                            onClick={() => clearNotification(notification?.id)}
                            className="p-1 rounded hover:bg-muted gallery-transition"
                            title="Remove notification"
                          >
                            <Icon name="X" size={12} className="text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications?.length > 0 && (
            <div className="px-4 py-3 border-t border-border">
              <button className="text-xs text-accent hover:text-accent/80 gallery-transition">
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBadge;