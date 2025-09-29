import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '../../components/ui/TopNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import CollectionGrid from './components/CollectionGrid';
import CollectionDetails from './components/CollectionDetails';
import FilterAndSort from './components/FilterAndSort';
import BulkActions from './components/BulkActions';
import CollectionStats from './components/CollectionStats';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CollectionManagement = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');

  // Mock collection data
  const mockCollections = [
    {
      id: 1,
      title: "Sarah & Mike\'s Wedding",
      client: "Sarah Wilson",
      clientEmail: "sarah@email.com",
      coverImage: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop",
      photoCount: 247,
      status: "published",
      privacy: "private",
      createdDate: "2024-12-15",
      lastModified: "2024-12-20",
      expiryDate: "2025-03-15",
      size: "1.2 GB",
      views: 156,
      downloads: 45,
      favorites: 23,
      tags: ["wedding", "outdoor", "ceremony"],
      description: "Beautiful outdoor wedding ceremony and reception photos",
      location: "Central Park, NYC"
    },
    {
      id: 2,
      title: "Corporate Headshots - TechCorp",
      client: "Mike Johnson",
      clientEmail: "mike@techcorp.com",
      coverImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop",
      photoCount: 89,
      status: "published",
      privacy: "public",
      createdDate: "2024-12-10",
      lastModified: "2024-12-18",
      expiryDate: null,
      size: "645 MB",
      views: 234,
      downloads: 67,
      favorites: 12,
      tags: ["corporate", "headshots", "professional"],
      description: "Professional headshots for company website and marketing",
      location: "TechCorp Office"
    },
    {
      id: 3,
      title: "Emma\'s Maternity Session",
      client: "Emma Davis",
      clientEmail: "emma@email.com",
      coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      photoCount: 156,
      status: "draft",
      privacy: "private",
      createdDate: "2024-12-20",
      lastModified: "2024-12-22",
      expiryDate: "2025-06-20",
      size: "890 MB",
      views: 0,
      downloads: 0,
      favorites: 0,
      tags: ["maternity", "outdoor", "golden-hour"],
      description: "Maternity photos in beautiful natural lighting",
      location: "Riverside Park"
    },
    {
      id: 4,
      title: "Johnson Family Portraits",
      client: "James Brown",
      clientEmail: "james@email.com",
      coverImage: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=300&fit=crop",
      photoCount: 78,
      status: "archived",
      privacy: "private",
      createdDate: "2024-11-05",
      lastModified: "2024-11-30",
      expiryDate: "2024-12-05",
      size: "420 MB",
      views: 89,
      downloads: 12,
      favorites: 8,
      tags: ["family", "portraits", "studio"],
      description: "Annual family portrait session",
      location: "Photography Studio"
    }
  ];

  useEffect(() => {
    // Simulate loading
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCollections(mockCollections);
      setFilteredCollections(mockCollections);
      setIsLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    let filtered = [...collections];

    // Apply status filter
    if (filterBy !== 'all') {
      filtered = filtered?.filter(collection => collection?.status === filterBy);
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b?.lastModified) - new Date(a?.lastModified);
        case 'oldest':
          return new Date(a?.lastModified) - new Date(b?.lastModified);
        case 'name':
          return a?.title?.localeCompare(b?.title);
        case 'client':
          return a?.client?.localeCompare(b?.client);
        case 'size':
          return parseFloat(b?.size) - parseFloat(a?.size);
        default:
          return 0;
      }
    });

    setFilteredCollections(filtered);
  }, [collections, filterBy, sortBy]);

  const handleFilterChange = (filter) => {
    setFilterBy(filter);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  const handleCollectionSelect = (collection) => {
    setSelectedCollection(collection);
  };

  const handleBulkSelect = (collectionIds) => {
    setSelectedCollections(collectionIds);
  };

  const handleBulkAction = (action, collectionIds) => {
    console.log(`Performing ${action} on collections:`, collectionIds);
    // Implement bulk actions
    setSelectedCollections([]);
  };

  const handleCreateCollection = () => {
    navigate('/admin-dashboard');
  };

  const handleUploadPhotos = (collection) => {
    navigate('/photo-upload', { state: { collection } });
  };

  const handleShareCollection = (collection) => {
    navigate('/share-and-publish', { state: { collection } });
  };

  const handleEditCollection = (collection) => {
    // Edit collection functionality
    console.log('Editing collection:', collection?.title);
  };

  const handleDeleteCollection = (collection) => {
    if (window.confirm(`Are you sure you want to delete "${collection?.title}"?`)) {
      setCollections(prev => prev?.filter(c => c?.id !== collection?.id));
      if (selectedCollection?.id === collection?.id) {
        setSelectedCollection(null);
      }
    }
  };

  const handleDuplicateCollection = (collection) => {
    const duplicated = {
      ...collection,
      id: Date.now(),
      title: `${collection?.title} (Copy)`,
      status: 'draft',
      views: 0,
      downloads: 0,
      favorites: 0,
      createdDate: new Date()?.toISOString()?.split('T')?.[0],
      lastModified: new Date()?.toISOString()?.split('T')?.[0]
    };
    setCollections(prev => [duplicated, ...prev]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <TopNavigation userRole="photographer" />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Icon name="Loader2" size={32} className="text-muted-foreground animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading collections...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation userRole="photographer" />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <BreadcrumbTrail userRole="photographer" />
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Collection Management</h1>
              <p className="text-muted-foreground">
                Organize, edit, and manage your photo collections and client galleries
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={handleCreateCollection}
                iconName="Plus"
                iconPosition="left"
                size="lg"
              >
                Create Collection
              </Button>
              <Button
                onClick={() => navigate('/admin-dashboard')}
                variant="outline"
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>

          {/* Collection Stats */}
          <CollectionStats collections={collections} />

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Collections Area */}
            <div className="xl:col-span-3">
              {/* Filter and Sort Controls */}
              <FilterAndSort
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                currentFilter={filterBy}
                currentSort={sortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                collectionCount={filteredCollections?.length}
              />

              {/* Bulk Actions */}
              {selectedCollections?.length > 0 && (
                <BulkActions
                  selectedCount={selectedCollections?.length}
                  onBulkAction={handleBulkAction}
                  selectedCollections={selectedCollections}
                  onClear={() => setSelectedCollections([])}
                />
              )}

              {/* Collections Grid/List */}
              <CollectionGrid
                collections={filteredCollections}
                viewMode={viewMode}
                selectedCollections={selectedCollections}
                onBulkSelect={handleBulkSelect}
                onCollectionSelect={handleCollectionSelect}
                onUploadPhotos={handleUploadPhotos}
                onShareCollection={handleShareCollection}
                onEditCollection={handleEditCollection}
                onDeleteCollection={handleDeleteCollection}
                onDuplicateCollection={handleDuplicateCollection}
                selectedCollection={selectedCollection}
              />

              {filteredCollections?.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="FolderOpen" size={48} className="text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No collections found</h3>
                  <p className="text-muted-foreground mb-6">
                    {filterBy === 'all' ?'Create your first collection to get started'
                      : `No collections match the current filter: ${filterBy}`
                    }
                  </p>
                  <div className="flex gap-3 justify-center">
                    {filterBy !== 'all' && (
                      <Button
                        onClick={() => setFilterBy('all')}
                        variant="outline"
                      >
                        Clear Filter
                      </Button>
                    )}
                    <Button
                      onClick={handleCreateCollection}
                      iconName="Plus"
                      iconPosition="left"
                    >
                      Create Collection
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Collection Details Sidebar */}
            <div className="xl:col-span-1">
              <CollectionDetails
                collection={selectedCollection}
                onUploadPhotos={() => handleUploadPhotos(selectedCollection)}
                onShareCollection={() => handleShareCollection(selectedCollection)}
                onEditCollection={() => handleEditCollection(selectedCollection)}
                onDeleteCollection={() => handleDeleteCollection(selectedCollection)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionManagement;