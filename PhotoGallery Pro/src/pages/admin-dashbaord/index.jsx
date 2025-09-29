import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '../../components/ui/TopNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import MetricsCard from './components/MetricsCard';
import CollectionCard from './components/CollectionCard';
import ActivityFeed from './components/ActivityFeed';
import FilterBar from './components/FilterBar';
import CreateCollectionModal from './components/CreateCollectionModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activities, setActivities] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  const mockCollections = [
    {
      id: 1,
      title: "Sarah & Mike\'s Wedding",
      clientName: "Sarah Wilson",
      clientEmail: "sarah@email.com",
      coverImage: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop",
      photoCount: 247,
      status: "published",
      isPrivate: true,
      views: 156,
      favorites: 23,
      downloads: 45,
      createdDate: "Dec 15, 2024",
      expiryDate: "Mar 15, 2025",
      isExpired: false
    },
    {
      id: 2,
      title: "Corporate Headshots - TechCorp",
      clientName: "Mike Johnson",
      clientEmail: "mike@techcorp.com",
      coverImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop",
      photoCount: 89,
      status: "published",
      isPrivate: false,
      views: 234,
      favorites: 12,
      downloads: 67,
      createdDate: "Dec 10, 2024",
      expiryDate: null,
      isExpired: false
    },
    {
      id: 3,
      title: "Emma\'s Maternity Session",
      clientName: "Emma Davis",
      clientEmail: "emma@email.com",
      coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      photoCount: 156,
      status: "draft",
      isPrivate: true,
      views: 0,
      favorites: 0,
      downloads: 0,
      createdDate: "Dec 20, 2024",
      expiryDate: "Jun 20, 2025",
      isExpired: false
    },
    {
      id: 4,
      title: "Johnson Family Portraits",
      clientName: "James Brown",
      clientEmail: "james@email.com",
      coverImage: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=300&fit=crop",
      photoCount: 78,
      status: "expired",
      isPrivate: true,
      views: 89,
      favorites: 8,
      downloads: 12,
      createdDate: "Nov 5, 2024",
      expiryDate: "Dec 5, 2024",
      isExpired: true
    }
  ];

  const mockActivities = [
    {
      id: 1,
      type: "favorite",
      clientName: "Sarah Wilson",
      clientAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop",
      description: "Added 5 photos to favorites in Wedding Collection",
      collectionName: "Sarah & Mike\'s Wedding",
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      type: "download",
      clientName: "Mike Johnson",
      clientAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      description: "Downloaded 12 high-resolution photos",
      collectionName: "Corporate Headshots",
      timestamp: new Date(Date.now() - 1800000)
    },
    {
      id: 3,
      type: "comment",
      clientName: "Emma Davis",
      clientAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      description: "Left a comment: 'These are absolutely beautiful! Thank you!'",
      collectionName: "Maternity Session",
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 4,
      type: "view",
      clientName: "James Brown",
      clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      description: "Viewed Family Portraits collection",
      collectionName: "Johnson Family Portraits",
      timestamp: new Date(Date.now() - 7200000)
    }
  ];

  const mockMetrics = {
    totalCollections: 24,
    activeGalleries: 18,
    totalViews: 1247,
    totalDownloads: 356
  };

  useEffect(() => {
    // Simulate loading
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCollections(mockCollections);
      setFilteredCollections(mockCollections);
      setActivities(mockActivities);
      setMetrics(mockMetrics);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleFilterChange = (filters) => {
    let filtered = [...collections];

    if (filters?.status !== 'all') {
      filtered = filtered?.filter(collection => collection?.status === filters?.status);
    }

    if (filters?.client !== 'all') {
      filtered = filtered?.filter(collection => 
        collection?.clientName?.toLowerCase()?.includes(filters?.client?.replace('-', ' '))
      );
    }

    setFilteredCollections(filtered);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm?.trim()) {
      setFilteredCollections(collections);
      return;
    }

    let filtered = collections?.filter(collection =>
      collection?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      collection?.clientName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );

    setFilteredCollections(filtered);
  };

  const handleCollectionSelect = (collectionId, isSelected) => {
    if (isSelected) {
      setSelectedCollections(prev => [...prev, collectionId]);
    } else {
      setSelectedCollections(prev => prev?.filter(id => id !== collectionId));
    }
  };

  const handleBulkAction = (action, selectedIds) => {
    console.log(`Performing ${action} on collections:`, selectedIds);
    // Implement bulk actions here
    setSelectedCollections([]);
  };

  const handleCreateCollection = (newCollection) => {
    setCollections(prev => [newCollection, ...prev]);
    setFilteredCollections(prev => [newCollection, ...prev]);
  };

  const handleShareCollection = (collection) => {
    navigate('/share-and-publish', { state: { collection } });
  };

  const handleEditCollection = (collection) => {
    console.log('Edit collection:', collection);
    // Navigate to collection edit page
  };

  const handleDeleteCollection = (collection) => {
    if (window.confirm(`Are you sure you want to delete "${collection?.title}"?`)) {
      setCollections(prev => prev?.filter(c => c?.id !== collection?.id));
      setFilteredCollections(prev => prev?.filter(c => c?.id !== collection?.id));
    }
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
                <p className="text-muted-foreground">Loading dashboard...</p>
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
              <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your photo collections and track client engagement
              </p>
            </div>
            
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              iconName="Plus"
              iconPosition="left"
              size="lg"
            >
              Create New Collection
            </Button>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricsCard
              title="Total Collections"
              value={metrics?.totalCollections}
              change="+3 this month"
              changeType="positive"
              icon="FolderOpen"
              color="accent"
            />
            <MetricsCard
              title="Active Galleries"
              value={metrics?.activeGalleries}
              change="+2 this week"
              changeType="positive"
              icon="Globe"
              color="success"
            />
            <MetricsCard
              title="Total Views"
              value={metrics?.totalViews?.toLocaleString()}
              change="+12% vs last month"
              changeType="positive"
              icon="Eye"
              color="warning"
            />
            <MetricsCard
              title="Downloads"
              value={metrics?.totalDownloads}
              change="+8% vs last month"
              changeType="positive"
              icon="Download"
              color="secondary"
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Collections Section */}
            <div className="xl:col-span-3">
              <FilterBar
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                selectedCollections={selectedCollections}
                onBulkAction={handleBulkAction}
              />

              {/* Collections Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCollections?.map((collection) => (
                  <CollectionCard
                    key={collection?.id}
                    collection={collection}
                    onShare={handleShareCollection}
                    onEdit={handleEditCollection}
                    onDelete={handleDeleteCollection}
                  />
                ))}
              </div>

              {filteredCollections?.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="FolderOpen" size={48} className="text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No collections found</h3>
                  <p className="text-muted-foreground mb-6">
                    Create your first collection to get started
                  </p>
                  <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Create Collection
                  </Button>
                </div>
              )}
            </div>

            {/* Activity Feed Sidebar */}
            <div className="xl:col-span-1">
              <ActivityFeed activities={activities} />
            </div>
          </div>
        </div>
      </div>
      {/* Create Collection Modal */}
      <CreateCollectionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateCollection={handleCreateCollection}
      />
    </div>
  );
};

export default AdminDashboard;