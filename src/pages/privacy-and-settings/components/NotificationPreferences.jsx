import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationPreferences = ({ settings, onSettingsChange }) => {
  const notificationFrequencyOptions = [
    { value: 'instant', label: 'Instant Notifications' },
    { value: 'hourly', label: 'Hourly Digest' },
    { value: 'daily', label: 'Daily Summary' },
    { value: 'weekly', label: 'Weekly Report' },
    { value: 'never', label: 'Never' }
  ];

  const emailTemplateOptions = [
    { value: 'professional', label: 'Professional Template' },
    { value: 'modern', label: 'Modern Template' },
    { value: 'minimal', label: 'Minimal Template' },
    { value: 'custom', label: 'Custom Template' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mr-3">
          <Icon name="Bell" size={20} className="text-accent" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Notification Preferences</h2>
          <p className="text-sm text-muted-foreground">Configure how you receive client activity updates</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Email Notifications */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">Email Notifications</h3>
          
          <div className="space-y-3">
            <Checkbox
              label="Client Gallery Views"
              description="Get notified when clients view your galleries"
              checked={settings?.notifyOnViews}
              onChange={(e) => onSettingsChange({
                ...settings,
                notifyOnViews: e?.target?.checked
              })}
            />
            
            <Checkbox
              label="Photo Downloads"
              description="Get notified when clients download photos"
              checked={settings?.notifyOnDownloads}
              onChange={(e) => onSettingsChange({
                ...settings,
                notifyOnDownloads: e?.target?.checked
              })}
            />
            
            <Checkbox
              label="Client Comments"
              description="Get notified when clients leave comments or feedback"
              checked={settings?.notifyOnComments}
              onChange={(e) => onSettingsChange({
                ...settings,
                notifyOnComments: e?.target?.checked
              })}
            />
            
            <Checkbox
              label="Favorite Selections"
              description="Get notified when clients mark photos as favorites"
              checked={settings?.notifyOnFavorites}
              onChange={(e) => onSettingsChange({
                ...settings,
                notifyOnFavorites: e?.target?.checked
              })}
            />
            
            <Checkbox
              label="New Client Registrations"
              description="Get notified when new clients register for gallery access"
              checked={settings?.notifyOnRegistrations}
              onChange={(e) => onSettingsChange({
                ...settings,
                notifyOnRegistrations: e?.target?.checked
              })}
            />
          </div>
        </div>

        {/* Notification Frequency */}
        <div>
          <Select
            label="Notification Frequency"
            description="How often you want to receive notification emails"
            options={notificationFrequencyOptions}
            value={settings?.notificationFrequency}
            onChange={(value) => onSettingsChange({
              ...settings,
              notificationFrequency: value
            })}
          />
        </div>

        {/* Push Notifications */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">Browser Notifications</h3>
          
          <div className="space-y-3">
            <Checkbox
              label="Enable Browser Notifications"
              description="Show desktop notifications for important client activities"
              checked={settings?.enableBrowserNotifications}
              onChange={(e) => onSettingsChange({
                ...settings,
                enableBrowserNotifications: e?.target?.checked
              })}
            />
            
            {settings?.enableBrowserNotifications && (
              <div className="ml-6 space-y-3">
                <Checkbox
                  label="High Priority Only"
                  description="Only show notifications for downloads and comments"
                  checked={settings?.highPriorityOnly}
                  onChange={(e) => onSettingsChange({
                    ...settings,
                    highPriorityOnly: e?.target?.checked
                  })}
                />
              </div>
            )}
          </div>
        </div>

        {/* Email Template */}
        <div>
          <Select
            label="Email Template Style"
            description="Choose the design template for notification emails"
            options={emailTemplateOptions}
            value={settings?.emailTemplate}
            onChange={(value) => onSettingsChange({
              ...settings,
              emailTemplate: value
            })}
          />
        </div>

        {/* Activity Summary */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">Activity Reports</h3>
          
          <div className="space-y-3">
            <Checkbox
              label="Weekly Activity Summary"
              description="Receive a weekly report of all client activities"
              checked={settings?.weeklyActivityReport}
              onChange={(e) => onSettingsChange({
                ...settings,
                weeklyActivityReport: e?.target?.checked
              })}
            />
            
            <Checkbox
              label="Monthly Analytics Report"
              description="Get detailed monthly analytics about gallery performance"
              checked={settings?.monthlyAnalytics}
              onChange={(e) => onSettingsChange({
                ...settings,
                monthlyAnalytics: e?.target?.checked
              })}
            />
          </div>
        </div>

        {/* Quiet Hours */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">Quiet Hours</h3>
          
          <Checkbox
            label="Enable Quiet Hours"
            description="Pause notifications during specific hours"
            checked={settings?.enableQuietHours}
            onChange={(e) => onSettingsChange({
              ...settings,
              enableQuietHours: e?.target?.checked
            })}
          />
          
          {settings?.enableQuietHours && (
            <div className="ml-6 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={14} />
                <span>Quiet hours: 10:00 PM - 8:00 AM (your local time)</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Configure quiet hours in your account settings
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferences;