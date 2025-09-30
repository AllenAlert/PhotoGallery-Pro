import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'view': return 'Eye';
      case 'favorite': return 'Heart';
      case 'download': return 'Download';
      case 'comment': return 'MessageCircle';
      case 'share': return 'Share2';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'view': return 'text-accent';
      case 'favorite': return 'text-error';
      case 'download': return 'text-success';
      case 'comment': return 'text-warning';
      case 'share': return 'text-secondary';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 gallery-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Icon name="Activity" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Activity" size={32} className="text-muted-foreground/50 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          activities?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 gallery-transition">
              {/* Client Avatar */}
              <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={activity?.clientAvatar}
                  alt={activity?.clientName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-foreground truncate">
                    {activity?.clientName}
                  </span>
                  <div className={`flex items-center ${getActivityColor(activity?.type)}`}>
                    <Icon name={getActivityIcon(activity?.type)} size={12} />
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2 mb-1">
                  {activity?.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {activity?.collectionName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(activity?.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {activities?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <button className="text-sm text-accent hover:text-accent/80 gallery-transition">
            View all activity
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;