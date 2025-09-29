import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const PrivacyControls = ({ settings, onSettingsChange }) => {
  const [showPasswordField, setShowPasswordField] = useState(settings?.passwordProtection);

  const handlePasswordToggle = (checked) => {
    setShowPasswordField(checked);
    onSettingsChange({
      ...settings,
      passwordProtection: checked,
      password: checked ? settings?.password : ''
    });
  };

  const handleExpirationToggle = (checked) => {
    onSettingsChange({
      ...settings,
      hasExpiration: checked,
      expirationDate: checked ? settings?.expirationDate : ''
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mr-3">
          <Icon name="Shield" size={20} className="text-accent" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Privacy Controls</h2>
          <p className="text-sm text-muted-foreground">Secure your gallery with access restrictions</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Password Protection */}
        <div className="space-y-4">
          <Checkbox
            label="Password Protection"
            description="Require a password to access this gallery"
            checked={settings?.passwordProtection}
            onChange={(e) => handlePasswordToggle(e?.target?.checked)}
          />
          
          {showPasswordField && (
            <div className="ml-6 space-y-3">
              <Input
                label="Gallery Password"
                type="password"
                placeholder="Enter a secure password"
                value={settings?.password}
                onChange={(e) => onSettingsChange({
                  ...settings,
                  password: e?.target?.value
                })}
                description="Clients will need this password to view the gallery"
              />
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Info" size={14} />
                <span>Password will be shared with clients via email invitation</span>
              </div>
            </div>
          )}
        </div>

        {/* Expiration Date */}
        <div className="space-y-4">
          <Checkbox
            label="Set Expiration Date"
            description="Automatically disable gallery access after a specific date"
            checked={settings?.hasExpiration}
            onChange={(e) => handleExpirationToggle(e?.target?.checked)}
          />
          
          {settings?.hasExpiration && (
            <div className="ml-6">
              <Input
                label="Expiration Date"
                type="date"
                value={settings?.expirationDate}
                onChange={(e) => onSettingsChange({
                  ...settings,
                  expirationDate: e?.target?.value
                })}
                description="Gallery will become inaccessible after this date"
                min={new Date()?.toISOString()?.split('T')?.[0]}
              />
            </div>
          )}
        </div>

        {/* Client Registration */}
        <div>
          <Checkbox
            label="Require Client Registration"
            description="Clients must provide their email address before viewing"
            checked={settings?.requireRegistration}
            onChange={(e) => onSettingsChange({
              ...settings,
              requireRegistration: e?.target?.checked
            })}
          />
        </div>

        {/* Gallery Visibility */}
        <div className="pt-4 border-t border-border">
          <h3 className="text-sm font-medium text-foreground mb-4">Gallery Visibility</h3>
          <div className="space-y-4">
            <Checkbox
              label="Public Gallery"
              description="Allow gallery to be discovered through search engines"
              checked={settings?.isPublic}
              onChange={(e) => onSettingsChange({
                ...settings,
                isPublic: e?.target?.checked
              })}
            />
            
            <Checkbox
              label="Allow Direct Link Sharing"
              description="Enable clients to share gallery links with others"
              checked={settings?.allowLinkSharing}
              onChange={(e) => onSettingsChange({
                ...settings,
                allowLinkSharing: e?.target?.checked
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyControls;