import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ClientCard = ({ 
  client, 
  onSelect, 
  onCommunicate, 
  onViewActivity, 
  onViewInvoice, 
  isSelected 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'inactive':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getSegmentColor = (segment) => {
    switch (segment) {
      case 'premium':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'corporate':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'family':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'personal':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div 
      className={`bg-white rounded-xl border-2 transition-all duration-200 hover:shadow-lg cursor-pointer ${
        isSelected ? 'border-primary shadow-md' : 'border-border'
      }`}
      onClick={onSelect}
    >
      {/* Header with Avatar and Status */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={client?.avatar}
                alt={client?.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-border"
              />
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                client?.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
              }`} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-lg">{client?.name}</h3>
              <p className="text-muted-foreground text-sm">{client?.email}</p>
              {client?.company && (
                <p className="text-muted-foreground text-sm">{client?.company}</p>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(client?.status)}`}>
              {client?.status?.charAt(0)?.toUpperCase() + client?.status?.slice(1)}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-medium border ${getSegmentColor(client?.segment)}`}>
              {client?.segment?.charAt(0)?.toUpperCase() + client?.segment?.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Client Stats */}
      <div className="p-6 border-b border-border">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{client?.projectCount}</div>
            <div className="text-xs text-muted-foreground">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">${client?.totalSpent?.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total Spent</div>
          </div>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="p-6 border-b border-border">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 mb-1">
              <Icon name="Eye" size={14} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{client?.engagement?.galleryViews}</span>
            </div>
            <div className="text-xs text-muted-foreground">Views</div>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 mb-1">
              <Icon name="Download" size={14} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{client?.engagement?.downloads}</span>
            </div>
            <div className="text-xs text-muted-foreground">Downloads</div>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 mb-1">
              <Icon name="Heart" size={14} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{client?.engagement?.favorites}</span>
            </div>
            <div className="text-xs text-muted-foreground">Favorites</div>
          </div>
        </div>
      </div>

      {/* Contact Info and Actions */}
      <div className="p-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Phone" size={14} />
            <span>{client?.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Calendar" size={14} />
            <span>Last contact: {formatDate(client?.lastContact)}</span>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            onClick={(e) => {
              e?.stopPropagation();
              onCommunicate?.();
            }}
            size="sm"
            variant="outline"
            iconName="MessageSquare"
            className="flex-1"
          >
            Message
          </Button>
          <Button
            onClick={(e) => {
              e?.stopPropagation();
              onViewActivity?.();
            }}
            size="sm"
            variant="outline"
            iconName="Activity"
            className="flex-1"
          >
            Activity
          </Button>
          <Button
            onClick={(e) => {
              e?.stopPropagation();
              onViewInvoice?.();
            }}
            size="sm"
            variant="outline"
            iconName="Receipt"
            className="flex-1"
          >
            Invoice
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;