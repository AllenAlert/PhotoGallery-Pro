import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityTracking = ({ client, onClose }) => {
  const [activeTab, setActiveTab] = useState('gallery');

  // Mock activity data
  const galleryActivity = [
    {
      id: 1,
      type: 'view',
      description: 'Viewed Wedding Collection gallery',
      timestamp: new Date(Date.now() - 300000),
      details: { collection: 'Wedding Collection', duration: '5 minutes' }
    },
    {
      id: 2,
      type: 'favorite',
      description: 'Added 8 photos to favorites',
      timestamp: new Date(Date.now() - 1800000),
      details: { collection: 'Wedding Collection', count: 8 }
    },
    {
      id: 3,
      type: 'download',
      description: 'Downloaded high-res photos',
      timestamp: new Date(Date.now() - 3600000),
      details: { collection: 'Wedding Collection', count: 12, format: 'High Resolution' }
    }
  ];

  const feedbackActivity = [
    {
      id: 1,
      type: 'comment',
      description: 'Left a comment on photo',
      timestamp: new Date(Date.now() - 7200000),
      content: 'These are absolutely beautiful! Thank you so much!'
    },
    {
      id: 2,
      type: 'rating',
      description: 'Rated the service',
      timestamp: new Date(Date.now() - 86400000),
      rating: 5,
      content: 'Amazing work, highly recommend!'
    }
  ];

  const communicationHistory = [
    {
      id: 1,
      type: 'email_sent',
      description: 'Gallery ready notification sent',
      timestamp: new Date(Date.now() - 172800000),
      status: 'delivered'
    },
    {
      id: 2,
      type: 'email_opened',
      description: 'Opened gallery notification',
      timestamp: new Date(Date.now() - 170000000),
      status: 'opened'
    },
    {
      id: 3,
      type: 'phone_call',
      description: 'Phone consultation',
      timestamp: new Date(Date.now() - 259200000),
      duration: '15 minutes'
    }
  ];

  const formatTimestamp = (timestamp) => {
    return timestamp?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'view':
        return 'Eye';
      case 'favorite':
        return 'Heart';
      case 'download':
        return 'Download';
      case 'comment':
        return 'MessageSquare';
      case 'rating':
        return 'Star';
      case 'email_sent': case'email_opened':
        return 'Mail';
      case 'phone_call':
        return 'Phone';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'view':
        return 'text-blue-600 bg-blue-100';
      case 'favorite':
        return 'text-red-600 bg-red-100';
      case 'download':
        return 'text-green-600 bg-green-100';
      case 'comment': case'rating':
        return 'text-purple-600 bg-purple-100';
      case 'email_sent': case'email_opened':
        return 'text-orange-600 bg-orange-100';
      case 'phone_call':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const renderActivityItem = (activity) => (
    <div key={activity?.id} className="flex items-start gap-3 p-4 border border-border rounded-lg">
      <div className={`p-2 rounded-full ${getActivityColor(activity?.type)}`}>
        <Icon name={getActivityIcon(activity?.type)} size={16} />
      </div>
      <div className="flex-1">
        <p className="font-medium text-foreground">{activity?.description}</p>
        <p className="text-sm text-muted-foreground">{formatTimestamp(activity?.timestamp)}</p>
        
        {activity?.details && (
          <div className="mt-2 text-sm text-muted-foreground">
            {activity?.details?.collection && (
              <span>Collection: {activity?.details?.collection} • </span>
            )}
            {activity?.details?.count && (
              <span>Count: {activity?.details?.count} • </span>
            )}
            {activity?.details?.duration && (
              <span>Duration: {activity?.details?.duration} • </span>
            )}
            {activity?.details?.format && (
              <span>Format: {activity?.details?.format}</span>
            )}
          </div>
        )}

        {activity?.content && (
          <div className="mt-2 p-2 bg-muted/50 rounded text-sm">
            "{activity?.content}"
          </div>
        )}

        {activity?.rating && (
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)]?.map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={14}
                className={i < activity?.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const tabs = [
    { key: 'gallery', label: 'Gallery Activity', count: galleryActivity?.length },
    { key: 'feedback', label: 'Feedback', count: feedbackActivity?.length },
    { key: 'communication', label: 'Communication', count: communicationHistory?.length }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <img
              src={client?.avatar}
              alt={client?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-bold text-foreground">{client?.name}'s Activity</h2>
              <p className="text-muted-foreground text-sm">Track engagement and interactions</p>
            </div>
          </div>
          <Button onClick={onClose} variant="ghost" size="sm" iconName="X" />
        </div>

        {/* Engagement Summary */}
        <div className="p-6 border-b border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-foreground">{client?.engagement?.galleryViews}</div>
              <div className="text-xs text-muted-foreground">Gallery Views</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-foreground">{client?.engagement?.downloads}</div>
              <div className="text-xs text-muted-foreground">Downloads</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-foreground">{client?.engagement?.favorites}</div>
              <div className="text-xs text-muted-foreground">Favorites</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-foreground">{client?.projectCount}</div>
              <div className="text-xs text-muted-foreground">Projects</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex">
            {tabs?.map((tab) => (
              <button
                key={tab?.key}
                onClick={() => setActiveTab(tab?.key)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab?.key
                    ? 'text-primary border-primary' :'text-muted-foreground border-transparent hover:text-foreground hover:border-border'
                }`}
              >
                {tab?.label}
                <span className="ml-2 px-2 py-1 text-xs bg-muted rounded-full">
                  {tab?.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {activeTab === 'gallery' && (
            <div className="space-y-4">
              <h3 className="font-medium text-foreground mb-4">Gallery Interactions</h3>
              {galleryActivity?.map(renderActivityItem)}
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="space-y-4">
              <h3 className="font-medium text-foreground mb-4">Client Feedback</h3>
              {feedbackActivity?.map(renderActivityItem)}
            </div>
          )}

          {activeTab === 'communication' && (
            <div className="space-y-4">
              <h3 className="font-medium text-foreground mb-4">Communication History</h3>
              {communicationHistory?.map(renderActivityItem)}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Last activity: {formatTimestamp(new Date(client?.engagement?.lastActivity))}
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
            >
              Export Report
            </Button>
            <Button onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityTracking;