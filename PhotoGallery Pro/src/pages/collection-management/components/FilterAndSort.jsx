import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FilterAndSort = ({
  onFilterChange,
  onSortChange,
  currentFilter,
  currentSort,
  viewMode,
  onViewModeChange,
  collectionCount
}) => {
  const filterOptions = [
    { value: 'all', label: 'All Collections' },
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' },
    { value: 'archived', label: 'Archived' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Recently Modified' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'client', label: 'Client A-Z' },
    { value: 'size', label: 'File Size' }
  ];

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
              placeholder="Search collections by title or client..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Filter */}
          <div className="min-w-[160px]">
            <Select
              value={currentFilter}
              onValueChange={onFilterChange}
              placeholder="Filter by status"
            >
              {filterOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </Select>
          </div>

          {/* Sort */}
          <div className="min-w-[180px]">
            <Select
              value={currentSort}
              onValueChange={onSortChange}
              placeholder="Sort by"
            >
              {sortOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </Select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex border border-border rounded-lg overflow-hidden">
            <Button
              onClick={() => onViewModeChange?.('grid')}
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              iconName="Grid3X3"
              className="rounded-none border-0"
            />
            <Button
              onClick={() => onViewModeChange?.('list')}
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              iconName="List"
              className="rounded-none border-0 border-l border-border"
            />
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Showing {collectionCount} {collectionCount === 1 ? 'collection' : 'collections'}
          {currentFilter !== 'all' && (
            <span> • {filterOptions?.find(opt => opt?.value === currentFilter)?.label}</span>
          )}
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-muted-foreground">Published</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-muted-foreground">Draft</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <span className="text-muted-foreground">Archived</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterAndSort;