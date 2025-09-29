import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ClientProfile = ({ client, onCommunicate, onViewActivity, onViewInvoice }) => {
  if (!client) {
    return (
      <div className="bg-white rounded-xl border border-border p-6 h-fit">
        <div className="text-center py-12">
          <Icon name="User" size={48} className="text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Select a Client</h3>
          <p className="text-muted-foreground text-sm">
            Choose a client from the list to view their detailed profile and activity
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getProjectStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'ongoing':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'in-review':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-border p-6 h-fit">
      {/* Client Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <img
            src={client?.avatar}
            alt={client?.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-border"
          />
          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
            client?.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
          }`} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">{client?.name}</h2>
          <p className="text-muted-foreground">{client?.email}</p>
          {client?.company && (
            <p className="text-sm text-muted-foreground">{client?.company}</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        <Button
          onClick={onCommunicate}
          iconName="MessageSquare"
          iconPosition="left"
          className="justify-start"
        >
          Send Message
        </Button>
        <Button
          onClick={onViewActivity}
          variant="outline"
          iconName="Activity"
          iconPosition="left"
          className="justify-start"
        >
          View Activity
        </Button>
        <Button
          onClick={onViewInvoice}
          variant="outline"
          iconName="Receipt"
          iconPosition="left"
          className="justify-start"
        >
          Manage Invoice
        </Button>
      </div>

      {/* Contact Information */}
      <div className="space-y-3 mb-6">
        <h3 className="font-medium text-foreground">Contact Information</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Icon name="Phone" size={16} className="text-muted-foreground" />
            <span>{client?.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span>Last contact: {formatDate(client?.lastContact)}</span>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="space-y-3 mb-6">
        <h3 className="font-medium text-foreground">Preferences</h3>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-muted-foreground">Communication: </span>
            <span className="capitalize">{client?.preferences?.communicationMethod}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Delivery: </span>
            <span className="capitalize">{client?.preferences?.deliveryFormat}</span>
          </div>
          {client?.preferences?.specialRequirements && (
            <div>
              <span className="text-muted-foreground">Special Requirements: </span>
              <span>{client?.preferences?.specialRequirements}</span>
            </div>
          )}
        </div>
      </div>

      {/* Projects */}
      <div className="space-y-3 mb-6">
        <h3 className="font-medium text-foreground">Projects</h3>
        <div className="space-y-2">
          {client?.projects?.map((project) => (
            <div key={project?.id} className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">{project?.name}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getProjectStatusColor(project?.status)}`}>
                  {project?.status}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                ${project?.value?.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Summary */}
      <div className="space-y-3 mb-6">
        <h3 className="font-medium text-foreground">Engagement</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 bg-muted/50 rounded-lg">
            <div className="text-lg font-bold text-foreground">{client?.engagement?.galleryViews}</div>
            <div className="text-xs text-muted-foreground">Gallery Views</div>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded-lg">
            <div className="text-lg font-bold text-foreground">{client?.engagement?.downloads}</div>
            <div className="text-xs text-muted-foreground">Downloads</div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-3">
        <h3 className="font-medium text-foreground">Notes</h3>
        <div className="space-y-2">
          {client?.notes?.slice(0, 2)?.map((note) => (
            <div key={note?.id} className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-foreground mb-1">{note?.content}</p>
              <div className="text-xs text-muted-foreground">
                {formatDate(note?.date)} - {note?.author}
              </div>
            </div>
          ))}
          {client?.notes?.length > 2 && (
            <Button variant="ghost" size="sm" className="w-full">
              View all notes ({client?.notes?.length})
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;