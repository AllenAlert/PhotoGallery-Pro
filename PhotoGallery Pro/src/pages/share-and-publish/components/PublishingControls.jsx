import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const PublishingControls = ({ onPublishStatusChange }) => {
  const [isPublished, setIsPublished] = useState(true);
  const [scheduledPublish, setScheduledPublish] = useState(false);
  const [publishDate, setPublishDate] = useState('');
  const [publishTime, setPublishTime] = useState('');
  const [autoExpire, setAutoExpire] = useState(false);
  const [expiryDate, setExpiryDate] = useState('');
  const [notifyClients, setNotifyClients] = useState(true);

  const handlePublishToggle = () => {
    const newStatus = !isPublished;
    setIsPublished(newStatus);
    onPublishStatusChange?.(newStatus);
  };

  const handleSchedulePublish = () => {
    if (publishDate && publishTime) {
      console.log(`Gallery scheduled to publish on ${publishDate} at ${publishTime}`);
      setScheduledPublish(false);
      setIsPublished(true);
      onPublishStatusChange?.(true);
    }
  };

  const handleBulkPublish = () => {
    console.log('Publishing multiple galleries...');
  };

  const getPublishStatus = () => {
    if (scheduledPublish && publishDate && publishTime) {
      return {
        status: 'scheduled',
        text: `Scheduled for ${publishDate} at ${publishTime}`,
        color: 'text-warning',
        bgColor: 'bg-warning/10',
        icon: 'Clock'
      };
    } else if (isPublished) {
      return {
        status: 'published',
        text: 'Gallery is live and accessible',
        color: 'text-success',
        bgColor: 'bg-success/10',
        icon: 'CheckCircle'
      };
    } else {
      return {
        status: 'draft',
        text: 'Gallery is private and not accessible',
        color: 'text-muted-foreground',
        bgColor: 'bg-muted/50',
        icon: 'Lock'
      };
    }
  };

  const publishStatus = getPublishStatus();

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Publishing Controls</h3>
      <div className="space-y-6">
        {/* Current Status */}
        <div className={`flex items-center space-x-3 p-4 rounded-lg ${publishStatus?.bgColor}`}>
          <Icon name={publishStatus?.icon} size={20} className={publishStatus?.color} />
          <div className="flex-1">
            <p className={`font-medium ${publishStatus?.color}`}>
              {publishStatus?.status === 'published' ? 'Published' : 
               publishStatus?.status === 'scheduled' ? 'Scheduled' : 'Draft'}
            </p>
            <p className="text-sm text-muted-foreground">
              {publishStatus?.text}
            </p>
          </div>
          <Button
            variant={isPublished ? "destructive" : "default"}
            size="sm"
            iconName={isPublished ? "EyeOff" : "Eye"}
            iconPosition="left"
            onClick={handlePublishToggle}
          >
            {isPublished ? "Unpublish" : "Publish Now"}
          </Button>
        </div>

        {/* Scheduled Publishing */}
        <div className="space-y-4">
          <Checkbox
            label="Schedule publishing"
            description="Set a specific date and time to make the gallery live"
            checked={scheduledPublish}
            onChange={(e) => setScheduledPublish(e?.target?.checked)}
          />
          
          {scheduledPublish && (
            <div className="ml-6 space-y-4 p-4 bg-muted/30 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Publish Date"
                  type="date"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e?.target?.value)}
                  min={new Date()?.toISOString()?.split('T')?.[0]}
                />
                <Input
                  label="Publish Time"
                  type="time"
                  value={publishTime}
                  onChange={(e) => setPublishTime(e?.target?.value)}
                />
              </div>
              <Button
                variant="default"
                size="sm"
                iconName="Calendar"
                iconPosition="left"
                onClick={handleSchedulePublish}
                disabled={!publishDate || !publishTime}
              >
                Schedule Publishing
              </Button>
            </div>
          )}
        </div>

        {/* Auto Expiry */}
        <div className="space-y-4">
          <Checkbox
            label="Auto-expire gallery"
            description="Automatically make the gallery private after a specific date"
            checked={autoExpire}
            onChange={(e) => setAutoExpire(e?.target?.checked)}
          />
          
          {autoExpire && (
            <div className="ml-6">
              <Input
                label="Expiry Date"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e?.target?.value)}
                min={new Date()?.toISOString()?.split('T')?.[0]}
                description="Gallery will become private after this date"
              />
            </div>
          )}
        </div>

        {/* Notification Settings */}
        <div className="space-y-4">
          <Checkbox
            label="Notify clients when published"
            description="Send email notifications to clients when the gallery goes live"
            checked={notifyClients}
            onChange={(e) => setNotifyClients(e?.target?.checked)}
          />
        </div>

        {/* Bulk Actions */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Bulk Actions</h4>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              iconName="Layers"
              iconPosition="left"
              onClick={handleBulkPublish}
            >
              Publish Multiple Galleries
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Copy"
              iconPosition="left"
            >
              Duplicate Settings
            </Button>
          </div>
        </div>

        {/* Publishing History */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Publishing History</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Last published:</span>
              <span className="text-foreground">Today at 2:30 PM</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total publishes:</span>
              <span className="text-foreground">3 times</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">First published:</span>
              <span className="text-foreground">3 days ago</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Quick Actions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="sm"
              iconName="Settings"
              iconPosition="left"
            >
              Gallery Settings
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="BarChart3"
              iconPosition="left"
            >
              View Analytics
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishingControls;