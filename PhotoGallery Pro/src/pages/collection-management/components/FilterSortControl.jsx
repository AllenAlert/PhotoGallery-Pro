import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

const FilterSortControls = ({
  totalPhotos,
  filteredPhotos,
  selectedPhotos,
  sortOption,
  filterOption,
  onSortChange,
  onFilterChange,
  onSelectAll
}) => {
  const sortOptions = [
    { value: 'date-desc', label: 'Newest First', icon: 'Calendar' },
    { value: 'date-asc', label: 'Oldest First', icon: 'Calendar' },
    { value: 'name-asc', label: 'Name A-Z', icon: 'ArrowUpAZ' },
    { value: 'name-desc', label: 'Name Z-A', icon: 'ArrowDownZA' },
    { value: 'size-desc', label: 'Largest First', icon: 'HardDrive' },
    { value: 'size-asc', label: 'Smallest First', icon: 'HardDrive' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Photos', icon: 'Image', count: totalPhotos },
    { value: 'published', label: 'Published', icon: 'Globe' },
    { value: 'draft', label: 'Draft', icon: 'Eye' },
    { value: 'processing', label: 'Processing', icon: 'Clock' },
    { value: 'favorites', label: 'Favorites', icon: 'Heart' },
    { value: 'watermarked', label: 'Watermarked', icon: 'Shield' }
  ];

  const selectedSort = sortOptions?.find(option => option?.value === sortOption);
  const selectedFilter = filterOptions?.find(option => option?.value === filterOption);

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left side - Stats and Select All */}
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Showing {filteredPhotos} of {totalPhotos} photos
            {selectedPhotos > 0 && (
              <span className="text-accent font-medium ml-2">
                ({selectedPhotos} selected)
              </span>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onSelectAll}
            iconName={selectedPhotos === filteredPhotos && filteredPhotos > 0 ? "CheckSquare" : "Square"}
            iconPosition="left"
            className="text-xs"
          >
            {selectedPhotos === filteredPhotos && filteredPhotos > 0 ? 'Deselect All' : 'Select All'}
          </Button>
        </div>

        {/* Right side - Filters and Sort */}
        <div className="flex items-center gap-3">
          {/* Filter Dropdown */}
          <div className="relative">
            <select
              value={filterOption}
              onChange={(e) => onFilterChange?.(e?.target?.value)}
              className="appearance-none pl-10 pr-8 py-2 bg-input border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              {filterOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                  {option?.count !== undefined && ` (${option?.count})`}
                </option>
              ))}
            </select>
            <Icon 
              name={selectedFilter?.icon} 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" 
            />
            <Icon 
              name="ChevronDown" 
              size={16} 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" 
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => onSortChange?.(e?.target?.value)}
              className="appearance-none pl-10 pr-8 py-2 bg-input border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              {sortOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
            <Icon 
              name={selectedSort?.icon} 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" 
            />
            <Icon 
              name="ChevronDown" 
              size={16} 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" 
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center border border-border rounded-md overflow-hidden">
            <button
              className={cn(
                "p-2 text-sm transition-colors",
                "bg-accent text-accent-foreground" // Grid view is default
              )}
              title="Grid view"
            >
              <Icon name="Grid3x3" size={16} />
            </button>
            <button
              className={cn(
                "p-2 text-sm transition-colors",
                "text-muted-foreground hover:text-foreground hover:bg-muted/20"
              )}
              title="List view"
            >
              <Icon name="List" size={16} />
            </button>
          </div>
        </div>
      </div>
      {/* Active Filters */}
      {filterOption !== 'all' && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground">Active filter:</span>
          <div className="flex items-center gap-1 px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
            <Icon name={selectedFilter?.icon} size={12} />
            {selectedFilter?.label}
            <button
              onClick={() => onFilterChange?.('all')}
              className="ml-1 text-accent hover:text-accent/70"
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSortControls;