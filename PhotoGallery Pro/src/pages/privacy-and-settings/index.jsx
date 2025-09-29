import React, { useState, useEffect } from 'react';
import TopNavigation from '../../components/ui/TopNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import PrivacyControls from './components/PrivacyControls';
import DownloadControls from './components/DownloadControls';
import SecurityFeatures from './components/SecurityFeatures';
import ClientAccessManagement from './components/ClientAccessManagement';
import NotificationPreferences from './components/NotificationPreferences';
import SettingsActions from './components/SettingsActions';

const PrivacyAndSettings = () => {
  const [settings, setSettings] = useState({
    // Privacy Controls
    passwordProtection: false,
    password: '',
    hasExpiration: false,
    expirationDate: '',
    requireRegistration: true,
    isPublic: false,
    allowLinkSharing: true,

    // Download Controls
    allowDownloads: true,
    downloadSizes: ['large', 'medium'],
    downloadLimit: '3',
    downloadPinProtection: false,
    downloadPin: '',
    addWatermark: true,
    allowBulkDownload: true,

    // Security Features
    disableScreenshots: false,
    disableRightClick: false,
    enableIpRestrictions: false,
    allowedIps: '',
    geographicAccess: 'worldwide',
    allowedCountries: '',
    sessionTimeout: '120',
    enhancedLogging: true,
    requireTwoFactor: false,

    // Notification Preferences
    notifyOnViews: true,
    notifyOnDownloads: true,
    notifyOnComments: true,
    notifyOnFavorites: true,
    notifyOnRegistrations: true,
    notificationFrequency: 'daily',
    enableBrowserNotifications: false,
    highPriorityOnly: false,
    emailTemplate: 'professional',
    weeklyActivityReport: true,
    monthlyAnalytics: true,
    enableQuietHours: false
  });

  const [originalSettings, setOriginalSettings] = useState({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    // Load settings from API or localStorage
    const loadedSettings = { ...settings };
    setOriginalSettings(loadedSettings);
  }, []);

  useEffect(() => {
    // Check for unsaved changes
    const hasChanges = JSON.stringify(settings) !== JSON.stringify(originalSettings);
    setHasUnsavedChanges(hasChanges);
  }, [settings, originalSettings]);

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
  };

  const handleSave = async () => {
    try {
      // Save settings to API
      console.log('Saving settings:', settings);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOriginalSettings({ ...settings });
      setHasUnsavedChanges(false);
      
      // Show success notification
      console.log('Settings saved successfully');
    } catch (error) {
      console.error('Failed to save settings:', error);
      throw error;
    }
  };

  const handleReset = () => {
    setSettings({ ...originalSettings });
    setHasUnsavedChanges(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation userRole="photographer" />
      
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <BreadcrumbTrail userRole="photographer" />
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Privacy & Settings</h1>
            <p className="text-muted-foreground">
              Configure access controls and security settings for your photo galleries
            </p>
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              <PrivacyControls 
                settings={settings} 
                onSettingsChange={handleSettingsChange} 
              />
              
              <DownloadControls 
                settings={settings} 
                onSettingsChange={handleSettingsChange} 
              />
              
              <SecurityFeatures 
                settings={settings} 
                onSettingsChange={handleSettingsChange} 
              />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <ClientAccessManagement 
                settings={settings} 
                onSettingsChange={handleSettingsChange} 
              />
              
              <NotificationPreferences 
                settings={settings} 
                onSettingsChange={handleSettingsChange} 
              />
            </div>
          </div>

          {/* Save Actions - Full Width */}
          <div className="mt-8">
            <SettingsActions
              onSave={handleSave}
              onReset={handleReset}
              hasUnsavedChanges={hasUnsavedChanges}
            />
          </div>

          {/* Mobile Responsive Adjustments */}
          <div className="lg:hidden mt-8">
            <div className="p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>💡</span>
                <span>Tip: Use landscape mode for better experience on mobile devices</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyAndSettings;