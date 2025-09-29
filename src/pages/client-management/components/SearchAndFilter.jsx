import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SearchAndFilter = ({ onSearch, onFilterChange, currentFilter, clientCount }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleFilterChange = (value) => {
    onFilterChange?.(value);
  };

  const segmentOptions = [
    { value: 'all', label: 'All Clients' },
    { value: 'premium', label: 'Premium' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'family', label: 'Family' },
    { value: 'personal', label: 'Personal' }
  ];

  const clearFilters = () => {
    setSearchTerm('');
    onSearch?.('');
    onFilterChange?.('all');
  };

  return (
    <div className="bg-white rounded-xl border border-border p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="text"
              placeholder="Search clients by name, email, or company..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-4">
          <div className="min-w-[160px]">
            <Select
              value={currentFilter}
              onValueChange={handleFilterChange}
              placeholder="Filter by segment"
            >
              {segmentOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </Select>
          </div>

          {(searchTerm || currentFilter !== 'all') && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="X" size={16} />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Showing {clientCount} {clientCount === 1 ? 'client' : 'clients'}
          {currentFilter !== 'all' && (
            <span> in {segmentOptions?.find(opt => opt?.value === currentFilter)?.label} segment</span>
          )}
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-muted-foreground">Active</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span className="text-muted-foreground">Inactive</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;