import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActions = ({ selectedCount, onBulkAction, selectedCollections, onClear }) => {
  const [selectedAction, setSelectedAction] = useState('');

  const bulkActions = [
    { value: '', label: 'Choose action...', disabled: true },
    { value: 'publish', label: 'Publish Selected' },
    { value: 'unpublish', label: 'Set to Draft' },
    { value: 'archive', label: 'Archive Selected' },
    { value: 'duplicate', label: 'Duplicate Selected' },
    { value: 'export', label: 'Export Selected' },
    { value: 'delete', label: 'Delete Selected' }
  ];

  const handleActionExecute = () => {
    if (selectedAction && selectedCollections?.length > 0) {
      onBulkAction?.(selectedAction, selectedCollections);
      setSelectedAction('');
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'publish':
        return 'Globe';
      case 'unpublish':
        return 'Edit';
      case 'archive':
        return 'Archive';
      case 'duplicate':
        return 'Copy';
      case 'export':
        return 'Download';
      case 'delete':
        return 'Trash2';
      default:
        return 'Settings';
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'delete':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'archive':
        return 'bg-gray-50 border-gray-200 text-gray-700';
      case 'publish':
        return 'bg-green-50 border-green-200 text-green-700';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-700';
    }
  };

  return (
    <div className={`bg-white rounded-xl border-2 border-primary/20 p-4 mb-6 ${getActionColor(selectedAction)}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="font-medium">
              {selectedCount} {selectedCount === 1 ? 'collection' : 'collections'} selected
            </span>
          </div>

          <div className="w-px h-6 bg-border"></div>

          <div className="flex items-center gap-3">
            <Select
              value={selectedAction}
              onValueChange={setSelectedAction}
              placeholder="Choose action..."
              className="min-w-[180px]"
            >
              {bulkActions?.map((action) => (
                <option 
                  key={action?.value} 
                  value={action?.value}
                  disabled={action?.disabled}
                >
                  {action?.label}
                </option>
              ))}
            </Select>

            <Button
              onClick={handleActionExecute}
              disabled={!selectedAction}
              size="sm"
              iconName={selectedAction ? getActionIcon(selectedAction) : 'Play'}
              iconPosition="left"
              variant={selectedAction === 'delete' ? 'destructive' : 'default'}
            >
              Execute
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={onClear}
            variant="ghost"
            size="sm"
            iconName="X"
          >
            Clear Selection
          </Button>
        </div>
      </div>

      {/* Action Preview */}
      {selectedAction && (
        <div className="mt-3 pt-3 border-t border-current/20">
          <div className="flex items-center gap-2 text-sm">
            <Icon name={getActionIcon(selectedAction)} size={16} />
            <span>
              Ready to <strong>{bulkActions?.find(a => a?.value === selectedAction)?.label?.toLowerCase()}</strong> on {selectedCount} {selectedCount === 1 ? 'collection' : 'collections'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActions;