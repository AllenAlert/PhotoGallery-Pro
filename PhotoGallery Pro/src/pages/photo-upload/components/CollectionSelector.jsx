import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { cn } from '../../../utils/cn';

const CollectionSelector = ({ collections, selectedCollection, onSelectionChange }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newCollectionData, setNewCollectionData] = useState({
    title: '',
    clientName: '',
    clientEmail: '',
    description: ''
  });

  const handleCreateCollection = () => {
    if (newCollectionData?.title?.trim()) {
      const newCollection = {
        id: Date.now(),
        title: newCollectionData?.title,
        clientName: newCollectionData?.clientName,
        clientEmail: newCollectionData?.clientEmail,
        description: newCollectionData?.description,
        photoCount: 0,
        status: 'draft',
        createdDate: new Date()?.toLocaleDateString(),
        isNew: true
      };

      // Add to collections array (in a real app, this would be handled by parent state)
      onSelectionChange?.(newCollection);
      
      // Reset form
      setNewCollectionData({
        title: '',
        clientName: '',
        clientEmail: '',
        description: ''
      });
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setNewCollectionData({
      title: '',
      clientName: '',
      clientEmail: '',
      description: ''
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg gallery-shadow">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Select Collection</h3>
            <p className="text-sm text-muted-foreground">
              Choose where to upload your photos
            </p>
          </div>
          
          <Button
            onClick={() => setIsCreating(true)}
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            disabled={isCreating}
          >
            New Collection
          </Button>
        </div>
      </div>
      <div className="p-6">
        {isCreating ? (
          /* Create New Collection Form */
          (<div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="FolderPlus" size={20} className="text-accent" />
              <h4 className="text-base font-medium text-foreground">Create New Collection</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Collection Title *
                </label>
                <Input
                  value={newCollectionData?.title}
                  onChange={(e) => setNewCollectionData(prev => ({ ...prev, title: e?.target?.value }))}
                  placeholder="e.g., Smith Family Wedding"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Client Name
                </label>
                <Input
                  value={newCollectionData?.clientName}
                  onChange={(e) => setNewCollectionData(prev => ({ ...prev, clientName: e?.target?.value }))}
                  placeholder="e.g., John Smith"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Client Email
                </label>
                <Input
                  type="email"
                  value={newCollectionData?.clientEmail}
                  onChange={(e) => setNewCollectionData(prev => ({ ...prev, clientEmail: e?.target?.value }))}
                  placeholder="e.g., john@email.com"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <Input
                  value={newCollectionData?.description}
                  onChange={(e) => setNewCollectionData(prev => ({ ...prev, description: e?.target?.value }))}
                  placeholder="Brief description"
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button 
                onClick={handleCreateCollection}
                disabled={!newCollectionData?.title?.trim()}
              >
                Create Collection
              </Button>
            </div>
          </div>)
        ) : (
          /* Collection Selection */
          (<div className="space-y-3">
            {collections?.map((collection) => (
              <div
                key={collection?.id}
                onClick={() => onSelectionChange?.(collection)}
                className={cn(
                  "p-4 border rounded-lg cursor-pointer transition-all duration-200",
                  selectedCollection?.id === collection?.id
                    ? "border-accent bg-accent/5 ring-2 ring-accent/20" :"border-border hover:border-accent/50 hover:bg-accent/5"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <input
                          type="radio"
                          checked={selectedCollection?.id === collection?.id}
                          onChange={() => onSelectionChange?.(collection)}
                          className="w-4 h-4 text-accent border-border focus:ring-accent"
                        />
                      </div>
                      
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium text-foreground truncate">
                            {collection?.title}
                          </h4>
                          <span className={cn(
                            "px-2 py-1 text-xs font-medium rounded-full",
                            collection?.status === 'published' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
                          )}>
                            {collection?.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span>{collection?.clientName}</span>
                          <span>{collection?.photoCount} photos</span>
                          <span>Created {collection?.createdDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 ml-4">
                    <Icon 
                      name={selectedCollection?.id === collection?.id ? "CheckCircle" : "Circle"} 
                      size={20} 
                      className={
                        selectedCollection?.id === collection?.id 
                          ? "text-accent" :"text-muted-foreground"
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
            {collections?.length === 0 && (
              <div className="text-center py-8">
                <Icon name="FolderOpen" size={32} className="text-muted-foreground/50 mx-auto mb-2" />
                <h4 className="text-sm font-medium text-foreground mb-1">No collections found</h4>
                <p className="text-xs text-muted-foreground mb-4">
                  Create your first collection to get started
                </p>
                <Button
                  onClick={() => setIsCreating(true)}
                  size="sm"
                  iconName="Plus"
                  iconPosition="left"
                >
                  Create Collection
                </Button>
              </div>
            )}
          </div>)
        )}
      </div>
      {/* Selected Collection Summary */}
      {selectedCollection && !isCreating && (
        <div className="p-4 bg-accent/5 border-t border-border">
          <div className="flex items-center gap-3">
            <Icon name="CheckCircle" size={16} className="text-accent" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Selected: {selectedCollection?.title}
              </p>
              <p className="text-xs text-muted-foreground">
                Photos will be added to this collection
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionSelector;