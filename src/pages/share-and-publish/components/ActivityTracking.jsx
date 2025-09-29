import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityTracking = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [activityData] = useState({
    totalViews: 247,
    uniqueVisitors: 89,
    qrScans: 23,
    emailOpens: 34,
    downloads: 156,
    favorites: 67
  });

  const recentActivity = [
    {
      id: 1,
      type: 'view',
      user: 'Sarah Wilson',
      action: 'Viewed gallery',
      timestamp: '2 minutes ago',
      icon: 'Eye',
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'download',
      user: 'Mike Johnson',
      action: 'Downloaded 5 photos',
      timestamp: '15 minutes ago',
      icon: 'Download',
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'favorite',
      user: 'Emily Davis',
      action: 'Added 3 photos to favorites',
      timestamp: '1 hour ago',
      icon: 'Heart',
      color: 'text-red-600'
    },
    {
      id: 4,
      type: 'qr_scan',
      user: 'Anonymous',
      action: 'Accessed via QR code',
      timestamp: '2 hours ago',
      icon: 'QrCode',
      color: 'text-purple-600'
    },
    {
      id: 5,
      type: 'email_open',
      user: 'David Brown',
      action: 'Opened invitation email',
      timestamp: '3 hours ago',
      icon: 'Mail',
      color: 'text-orange-600'
    },
    {
      id: 6,
      type: 'share',
      user: 'Lisa Anderson',
      action: 'Shared gallery link',
      timestamp: '5 hours ago',
      icon: 'Share2',
      color: 'text-indigo-600'
    }
  ];

  const timeRangeOptions = [
    { value: '24h', label: 'Last 24 hours' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' }
  ];

  const exportActivity = () => {
    const csvContent = [
      ['Timestamp', 'User', 'Action', 'Type'],
      ...recentActivity?.map(activity => [
        activity?.timestamp,
        activity?.user,
        activity?.action,
        activity?.type
      ])
    ]?.map(row => row?.join(','))?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gallery-activity-${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
    window.URL?.revokeObjectURL(url);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Activity Tracking</h3>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e?.target?.value)}
            className="px-3 py-1.5 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {timeRangeOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={exportActivity}
          >
            Export
          </Button>
        </div>
      </div>
      {/* Activity Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mx-auto mb-2">
            <Icon name="Eye" size={16} className="text-blue-600" />
          </div>
          <div className="text-lg font-semibold text-foreground">{activityData?.totalViews}</div>
          <div className="text-xs text-muted-foreground">Total Views</div>
        </div>

        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg mx-auto mb-2">
            <Icon name="Users" size={16} className="text-green-600" />
          </div>
          <div className="text-lg font-semibold text-foreground">{activityData?.uniqueVisitors}</div>
          <div className="text-xs text-muted-foreground">Unique Visitors</div>
        </div>

        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg mx-auto mb-2">
            <Icon name="QrCode" size={16} className="text-purple-600" />
          </div>
          <div className="text-lg font-semibold text-foreground">{activityData?.qrScans}</div>
          <div className="text-xs text-muted-foreground">QR Scans</div>
        </div>

        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-lg mx-auto mb-2">
            <Icon name="Mail" size={16} className="text-orange-600" />
          </div>
          <div className="text-lg font-semibold text-foreground">{activityData?.emailOpens}</div>
          <div className="text-xs text-muted-foreground">Email Opens</div>
        </div>

        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg mx-auto mb-2">
            <Icon name="Download" size={16} className="text-green-600" />
          </div>
          <div className="text-lg font-semibold text-foreground">{activityData?.downloads}</div>
          <div className="text-xs text-muted-foreground">Downloads</div>
        </div>

        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-lg mx-auto mb-2">
            <Icon name="Heart" size={16} className="text-red-600" />
          </div>
          <div className="text-lg font-semibold text-foreground">{activityData?.favorites}</div>
          <div className="text-xs text-muted-foreground">Favorites</div>
        </div>
      </div>
      {/* Recent Activity Feed */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-4">Recent Activity</h4>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {recentActivity?.map((activity) => (
            <div
              key={activity?.id}
              className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg"
            >
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center">
                  <Icon 
                    name={activity?.icon} 
                    size={14} 
                    className={activity?.color}
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {activity?.user}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity?.action}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activity?.timestamp}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Activity Summary */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="TrendingUp" size={16} className="text-success" />
          <span className="text-sm font-medium text-foreground">Activity Summary</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Your gallery has received {activityData?.totalViews} views from {activityData?.uniqueVisitors} unique visitors in the last {timeRangeOptions?.find(opt => opt?.value === timeRange)?.label?.toLowerCase()}. 
          Clients have downloaded {activityData?.downloads} photos and marked {activityData?.favorites} as favorites.
        </p>
      </div>
    </div>
  );
};

export default ActivityTracking;