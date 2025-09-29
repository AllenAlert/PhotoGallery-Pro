import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '../../components/ui/TopNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import ClientCard from './components/ClientCard';
import ClientProfile from './components/ClientProfile';
import SearchAndFilter from './components/SearchAndFilter';
import CommunicationTools from './components/CommunicationTools';
import ActivityTracking from './components/ActivityTracking';
import InvoiceIntegration from './components/InvoiceIntegration';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ClientManagement = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSegment, setFilterSegment] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showCommunicationModal, setShowCommunicationModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  // Mock client data
  const mockClients = [
    {
      id: 1,
      name: "Sarah Wilson",
      email: "sarah@email.com",
      phone: "+1 (555) 123-4567",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop",
      company: "Wilson Photography",
      projectCount: 3,
      totalSpent: 2450,
      lastContact: "2024-12-20",
      status: "active",
      segment: "premium",
      preferences: {
        communicationMethod: "email",
        deliveryFormat: "high-res",
        specialRequirements: "Prefers natural lighting, outdoor settings"
      },
      projects: [
        { id: 1, name: "Wedding Photography", status: "completed", value: 1200 },
        { id: 2, name: "Engagement Session", status: "completed", value: 450 },
        { id: 3, name: "Anniversary Photos", status: "ongoing", value: 800 }
      ],
      engagement: {
        galleryViews: 156,
        downloads: 45,
        favorites: 23,
        lastActivity: "2024-12-20"
      },
      notes: [
        { id: 1, content: "Prefers morning shoots", date: "2024-12-15", author: "Alex" },
        { id: 2, content: "Very responsive to emails", date: "2024-12-10", author: "Alex" }
      ]
    },
    {
      id: 2,
      name: "Mike Johnson",
      email: "mike@techcorp.com",
      phone: "+1 (555) 987-6543",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      company: "TechCorp Industries",
      projectCount: 2,
      totalSpent: 1890,
      lastContact: "2024-12-18",
      status: "active",
      segment: "corporate",
      preferences: {
        communicationMethod: "phone",
        deliveryFormat: "web-optimized",
        specialRequirements: "Corporate branding requirements, headshots only"
      },
      projects: [
        { id: 1, name: "Corporate Headshots", status: "completed", value: 1200 },
        { id: 2, name: "Team Photos", status: "ongoing", value: 690 }
      ],
      engagement: {
        galleryViews: 234,
        downloads: 67,
        favorites: 12,
        lastActivity: "2024-12-18"
      },
      notes: [
        { id: 1, content: "Needs quick turnaround", date: "2024-12-12", author: "Alex" },
        { id: 2, content: "Budget approved for additional sessions", date: "2024-12-08", author: "Alex" }
      ]
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma@email.com",
      phone: "+1 (555) 456-7890",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      company: null,
      projectCount: 1,
      totalSpent: 650,
      lastContact: "2024-12-15",
      status: "active",
      segment: "personal",
      preferences: {
        communicationMethod: "text",
        deliveryFormat: "mixed",
        specialRequirements: "Maternity shoot specialist, natural poses"
      },
      projects: [
        { id: 1, name: "Maternity Session", status: "in-review", value: 650 }
      ],
      engagement: {
        galleryViews: 89,
        downloads: 12,
        favorites: 8,
        lastActivity: "2024-12-15"
      },
      notes: [
        { id: 1, content: "First-time client, very excited", date: "2024-12-10", author: "Alex" }
      ]
    },
    {
      id: 4,
      name: "James Brown",
      email: "james@email.com",
      phone: "+1 (555) 321-0987",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      company: null,
      projectCount: 2,
      totalSpent: 950,
      lastContact: "2024-11-30",
      status: "inactive",
      segment: "family",
      preferences: {
        communicationMethod: "email",
        deliveryFormat: "print-ready",
        specialRequirements: "Family portraits, includes pets"
      },
      projects: [
        { id: 1, name: "Family Portraits", status: "completed", value: 500 },
        { id: 2, name: "Holiday Photos", status: "completed", value: 450 }
      ],
      engagement: {
        galleryViews: 45,
        downloads: 18,
        favorites: 5,
        lastActivity: "2024-11-30"
      },
      notes: [
        { id: 1, content: "Annual family photo tradition", date: "2024-11-25", author: "Alex" }
      ]
    }
  ];

  useEffect(() => {
    // Simulate loading
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setClients(mockClients);
      setFilteredClients(mockClients);
      setIsLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    let filtered = [...clients];

    // Apply search filter
    if (searchTerm?.trim()) {
      filtered = filtered?.filter(client =>
        client?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        client?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        client?.company?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Apply segment filter
    if (filterSegment !== 'all') {
      filtered = filtered?.filter(client => client?.segment === filterSegment);
    }

    setFilteredClients(filtered);
  }, [searchTerm, filterSegment, clients]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (segment) => {
    setFilterSegment(segment);
  };

  const handleClientSelect = (client) => {
    setSelectedClient(client);
  };

  const handleCommunicationOpen = (client) => {
    setSelectedClient(client);
    setShowCommunicationModal(true);
  };

  const handleActivityOpen = (client) => {
    setSelectedClient(client);
    setShowActivityModal(true);
  };

  const handleInvoiceOpen = (client) => {
    setSelectedClient(client);
    setShowInvoiceModal(true);
  };

  const handleExportData = () => {
    console.log('Exporting client data...');
    // Implement export functionality
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
                <p className="text-muted-foreground">Loading client data...</p>
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
              <h1 className="text-3xl font-bold text-foreground mb-2">Client Management</h1>
              <p className="text-muted-foreground">
                Organize contacts, track relationships, and manage client communications
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={handleExportData}
                variant="outline"
                iconName="Download"
                iconPosition="left"
              >
                Export Data
              </Button>
              <Button
                onClick={() => navigate('/admin-dashboard')}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Client Directory */}
            <div className="xl:col-span-2">
              <SearchAndFilter
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                currentFilter={filterSegment}
                clientCount={filteredClients?.length}
              />

              {/* Client Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredClients?.map((client) => (
                  <ClientCard
                    key={client?.id}
                    client={client}
                    onSelect={() => handleClientSelect(client)}
                    onCommunicate={() => handleCommunicationOpen(client)}
                    onViewActivity={() => handleActivityOpen(client)}
                    onViewInvoice={() => handleInvoiceOpen(client)}
                    isSelected={selectedClient?.id === client?.id}
                  />
                ))}
              </div>

              {filteredClients?.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Users" size={48} className="text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No clients found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm('');
                      setFilterSegment('all');
                    }}
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Client Profile Sidebar */}
            <div className="xl:col-span-1">
              <ClientProfile
                client={selectedClient}
                onCommunicate={() => handleCommunicationOpen(selectedClient)}
                onViewActivity={() => handleActivityOpen(selectedClient)}
                onViewInvoice={() => handleInvoiceOpen(selectedClient)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Communication Modal */}
      {showCommunicationModal && (
        <CommunicationTools
          client={selectedClient}
          onClose={() => setShowCommunicationModal(false)}
        />
      )}

      {/* Activity Modal */}
      {showActivityModal && (
        <ActivityTracking
          client={selectedClient}
          onClose={() => setShowActivityModal(false)}
        />
      )}

      {/* Invoice Modal */}
      {showInvoiceModal && (
        <InvoiceIntegration
          client={selectedClient}
          onClose={() => setShowInvoiceModal(false)}
        />
      )}
    </div>
  );
};

export default ClientManagement;