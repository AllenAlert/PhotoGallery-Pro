import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FilterBar = ({ onFilterChange, onSearch, selectedCollections, onBulkAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedClient, setSelectedClient] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' },
    { value: 'expired', label: 'Expired' }
  ];

  const clientOptions = [
    { value: 'all', label: 'All Clients' },
    { value: 'sarah-wilson', label: 'Sarah Wilson' },
    { value: 'mike-johnson', label: 'Mike Johnson' },
    { value: 'emma-davis', label: 'Emma Davis' },
    { value: 'james-brown', label: 'James Brown' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  const bulkActionOptions = [
    { value: 'publish', label: 'Publish Selected' },
    { value: 'unpublish', label: 'Unpublish Selected' },
    { value: 'duplicate', label: 'Duplicate Selected' },
    { value: 'delete', label: 'Delete Selected' }
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    onFilterChange({ status: value, client: selectedClient, dateRange });
  };

  const handleClientChange = (value) => {
    setSelectedClient(value);
    onFilterChange({ status: selectedStatus, client: value, dateRange });
  };

  const handleDateRangeChange = (value) => {
    setDateRange(value);
    onFilterChange({ status: selectedStatus, client: selectedClient, dateRange: value });
  };

  const handleBulkAction = (action) => {
    onBulkAction(action, selectedCollections);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setSelectedClient('all');
    setDateRange('all');
    onSearch('');
    onFilterChange({ status: 'all', client: 'all', dateRange: 'all' });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 gallery-shadow mb-6">
      {/* Search and Filters Row */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Search collections..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Select
            options={statusOptions}
            value={selectedStatus}
            onChange={setSelectedStatus}
            placeholder="Status"
            className="w-full sm:w-32"
          />
          
          <Select
            options={clientOptions}
            value={selectedClient}
            onChange={setSelectedClient}
            placeholder="Client"
            className="w-full sm:w-40"
          />
          
          <Select
            options={dateRangeOptions}
            value={dateRange}
            onChange={setDateRange}
            placeholder="Date Range"
            className="w-full sm:w-36"
          />

          <Button
            variant="outline"
            onClick={clearFilters}
            iconName="X"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Clear
          </Button>
        </div>
      </div>
      {/* Bulk Actions Row */}
      {selectedCollections?.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-border">
          <div className="flex items-center text-sm text-muted-foreground">
            <Icon name="CheckSquare" size={16} className="mr-2" />
            {selectedCollections?.length} collection{selectedCollections?.length !== 1 ? 's' : ''} selected
          </div>

          <div className="flex flex-wrap gap-2">
            {bulkActionOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={option?.value === 'delete' ? 'destructive' : 'outline'}
                size="sm"
                onClick={() => handleBulkAction(option?.value)}
              >
                {option?.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;