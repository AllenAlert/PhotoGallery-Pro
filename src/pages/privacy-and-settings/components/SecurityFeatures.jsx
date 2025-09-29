import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SecurityFeatures = ({ settings, onSettingsChange }) => {
  const sessionTimeoutOptions = [
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '120', label: '2 hours' },
    { value: '240', label: '4 hours' },
    { value: '480', label: '8 hours' },
    { value: 'never', label: 'Never expire' }
  ];

  const geographicRegions = [
    { value: 'worldwide', label: 'Worldwide Access' },
    { value: 'north_america', label: 'North America Only' },
    { value: 'europe', label: 'Europe Only' },
    { value: 'asia_pacific', label: 'Asia Pacific Only' },
    { value: 'custom', label: 'Custom Countries' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center mr-3">
          <Icon name="Lock" size={20} className="text-warning" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Advanced Security</h2>
          <p className="text-sm text-muted-foreground">Additional protection measures for sensitive galleries</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Screenshot Prevention */}
        <div>
          <Checkbox
            label="Disable Screenshots"
            description="Prevent clients from taking screenshots (may affect user experience)"
            checked={settings?.disableScreenshots}
            onChange={(e) => onSettingsChange({
              ...settings,
              disableScreenshots: e?.target?.checked
            })}
          />
          {settings?.disableScreenshots && (
            <div className="ml-6 mt-2 p-3 bg-warning/10 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={14} className="text-warning mt-0.5" />
                <div className="text-xs text-warning">
                  <p className="font-medium">Impact on User Experience</p>
                  <p>This may disable right-click, text selection, and some browser features</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right-click Disable */}
        <div>
          <Checkbox
            label="Disable Right-Click"
            description="Prevent right-click context menu to discourage image saving"
            checked={settings?.disableRightClick}
            onChange={(e) => onSettingsChange({
              ...settings,
              disableRightClick: e?.target?.checked
            })}
          />
        </div>

        {/* IP Restrictions */}
        <div className="space-y-4">
          <Checkbox
            label="IP Address Restrictions"
            description="Limit access to specific IP addresses or ranges"
            checked={settings?.enableIpRestrictions}
            onChange={(e) => onSettingsChange({
              ...settings,
              enableIpRestrictions: e?.target?.checked
            })}
          />
          
          {settings?.enableIpRestrictions && (
            <div className="ml-6">
              <Input
                label="Allowed IP Addresses"
                type="text"
                placeholder="192.168.1.1, 10.0.0.0/24"
                value={settings?.allowedIps}
                onChange={(e) => onSettingsChange({
                  ...settings,
                  allowedIps: e?.target?.value
                })}
                description="Enter IP addresses or ranges separated by commas"
              />
            </div>
          )}
        </div>

        {/* Geographic Restrictions */}
        <div className="space-y-4">
          <div>
            <Select
              label="Geographic Access Control"
              description="Restrict access based on client location"
              options={geographicRegions}
              value={settings?.geographicAccess}
              onChange={(value) => onSettingsChange({
                ...settings,
                geographicAccess: value
              })}
            />
          </div>
          
          {settings?.geographicAccess === 'custom' && (
            <div className="ml-6">
              <Input
                label="Allowed Countries"
                type="text"
                placeholder="US, CA, UK, AU"
                value={settings?.allowedCountries}
                onChange={(e) => onSettingsChange({
                  ...settings,
                  allowedCountries: e?.target?.value
                })}
                description="Enter country codes separated by commas"
              />
            </div>
          )}
        </div>

        {/* Session Management */}
        <div>
          <Select
            label="Session Timeout"
            description="Automatically log out inactive clients"
            options={sessionTimeoutOptions}
            value={settings?.sessionTimeout}
            onChange={(value) => onSettingsChange({
              ...settings,
              sessionTimeout: value
            })}
          />
        </div>

        {/* Activity Logging */}
        <div>
          <Checkbox
            label="Enhanced Activity Logging"
            description="Track detailed client interactions and access attempts"
            checked={settings?.enhancedLogging}
            onChange={(e) => onSettingsChange({
              ...settings,
              enhancedLogging: e?.target?.checked
            })}
          />
        </div>

        {/* Two-Factor Authentication */}
        <div>
          <Checkbox
            label="Require Two-Factor Authentication"
            description="Clients must verify their identity with SMS or email code"
            checked={settings?.requireTwoFactor}
            onChange={(e) => onSettingsChange({
              ...settings,
              requireTwoFactor: e?.target?.checked
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default SecurityFeatures;