import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const ClientAccessManagement = ({ settings, onSettingsChange }) => {
  const [newClientEmail, setNewClientEmail] = useState('');
  const [showAddClient, setShowAddClient] = useState(false);

  // Mock registered clients data
  const registeredClients = [
    {
      id: 1,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      registeredAt: '2024-09-25',
      lastActive: '2024-09-28',
      viewCount: 24,
      downloadCount: 8,
      status: 'active'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      email: 'michael.r@email.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      registeredAt: '2024-09-20',
      lastActive: '2024-09-27',
      viewCount: 15,
      downloadCount: 3,
      status: 'active'
    },
    {
      id: 3,
      name: 'Emily Chen',
      email: 'emily.chen@email.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      registeredAt: '2024-09-18',
      lastActive: '2024-09-26',
      viewCount: 42,
      downloadCount: 12,
      status: 'active'
    }
  ];

  const handleAddClient = () => {
    if (newClientEmail?.trim()) {
      // In a real app, this would send an invitation
      console.log('Inviting client:', newClientEmail);
      setNewClientEmail('');
      setShowAddClient(false);
    }
  };

  const handleRemoveClient = (clientId) => {
    console.log('Removing client:', clientId);
  };

  const handleViewActivity = (clientId) => {
    console.log('Viewing activity for client:', clientId);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
            <Icon name="Users" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Client Access Management</h2>
            <p className="text-sm text-muted-foreground">Manage who can access this gallery</p>
          </div>
        </div>
        
        <Button
          variant="outline"
          iconName="Plus"
          iconPosition="left"
          onClick={() => setShowAddClient(!showAddClient)}
        >
          Add Client
        </Button>
      </div>
      {/* Add Client Form */}
      {showAddClient && (
        <div className="mb-6 p-4 bg-muted/50 rounded-lg border border-border">
          <h3 className="text-sm font-medium text-foreground mb-3">Invite New Client</h3>
          <div className="flex space-x-3">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter client email address"
                value={newClientEmail}
                onChange={(e) => setNewClientEmail(e?.target?.value)}
              />
            </div>
            <Button
              variant="default"
              onClick={handleAddClient}
              disabled={!newClientEmail?.trim()}
            >
              Send Invitation
            </Button>
            <Button
              variant="ghost"
              iconName="X"
              size="icon"
              onClick={() => setShowAddClient(false)}
            />
          </div>
        </div>
      )}
      {/* Registered Clients List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">
            Registered Clients ({registeredClients?.length})
          </h3>
        </div>

        {registeredClients?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="UserPlus" size={32} className="text-muted-foreground/50 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No clients have registered yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Invite clients to start tracking their gallery access
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {registeredClients?.map((client) => (
              <div key={client?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={client?.avatar}
                      alt={client?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-foreground">{client?.name}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        client?.status === 'active' ?'bg-success/10 text-success' :'bg-muted text-muted-foreground'
                      }`}>
                        {client?.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{client?.email}</p>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                      <span>Registered: {new Date(client.registeredAt)?.toLocaleDateString()}</span>
                      <span>Last active: {new Date(client.lastActive)?.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Activity Stats */}
                  <div className="text-right">
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Eye" size={12} />
                        <span>{client?.viewCount} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Download" size={12} />
                        <span>{client?.downloadCount} downloads</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Activity"
                      onClick={() => handleViewActivity(client?.id)}
                    >
                      Activity
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="MoreVertical"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Access Statistics */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-foreground mb-4">Access Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">Total Clients</span>
            </div>
            <p className="text-2xl font-semibold text-foreground mt-1">{registeredClients?.length}</p>
          </div>
          
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Eye" size={16} className="text-accent" />
              <span className="text-sm text-muted-foreground">Total Views</span>
            </div>
            <p className="text-2xl font-semibold text-foreground mt-1">
              {registeredClients?.reduce((sum, client) => sum + client?.viewCount, 0)}
            </p>
          </div>
          
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Download" size={16} className="text-success" />
              <span className="text-sm text-muted-foreground">Total Downloads</span>
            </div>
            <p className="text-2xl font-semibold text-foreground mt-1">
              {registeredClients?.reduce((sum, client) => sum + client?.downloadCount, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientAccessManagement;