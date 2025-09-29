import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const CollectionGrid = ({
  collections,
  viewMode,
  selectedCollections,
  onBulkSelect,
  onCollectionSelect,
  onUploadPhotos,
  onShareCollection,
  onEditCollection,
  onDeleteCollection,
  onDuplicateCollection,
  selectedCollection
}) => {

  const handleCheckboxChange = (collectionId, isChecked) => {
    let newSelected;
    if (isChecked) {
      newSelected = [...selectedCollections, collectionId];
    } else {
      newSelected = selectedCollections?.filter(id => id !== collectionId);
    }
    onBulkSelect?.(newSelected);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'draft':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'archived':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getPrivacyIcon = (privacy) => {
    return privacy === 'private' ? 'Lock' : 'Globe';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {collections?.map((collection) => (
        <div
          key={collection?.id}
          className={`bg-white rounded-xl border-2 transition-all duration-200 hover:shadow-lg cursor-pointer ${
            selectedCollection?.id === collection?.id ? 'border-primary shadow-md' : 'border-border'
          }`}
          onClick={() => onCollectionSelect?.(collection)}
        >
          {/* Image Header */}
          <div className="relative">
            <img
              src={collection?.coverImage}
              alt={collection?.title}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="absolute top-3 left-3">
              <Checkbox
                checked={selectedCollections?.includes(collection?.id)}
                onCheckedChange={(checked) => handleCheckboxChange(collection?.id, checked)}
                onClick={(e) => e?.stopPropagation()}
                className="bg-white/90 border-white shadow-sm"
              />
            </div>
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(collection?.status)}`}>
                {collection?.status?.charAt(0)?.toUpperCase() + collection?.status?.slice(1)}
              </span>
              <div className="bg-white/90 p-1 rounded-full">
                <Icon name={getPrivacyIcon(collection?.privacy)} size={14} className="text-muted-foreground" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {collection?.photoCount} photos
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-foreground text-lg mb-1 line-clamp-1">
              {collection?.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-3">
              Client: {collection?.client}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
              <div>
                <div className="text-sm font-medium text-foreground">{collection?.views}</div>
                <div className="text-xs text-muted-foreground">Views</div>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{collection?.downloads}</div>
                <div className="text-xs text-muted-foreground">Downloads</div>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{collection?.favorites}</div>
                <div className="text-xs text-muted-foreground">Favorites</div>
              </div>
            </div>

            {/* Dates and Size */}
            <div className="text-xs text-muted-foreground space-y-1 mb-4">
              <div>Created: {formatDate(collection?.createdDate)}</div>
              <div>Modified: {formatDate(collection?.lastModified)}</div>
              <div>Size: {collection?.size}</div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={(e) => {
                  e?.stopPropagation();
                  onUploadPhotos?.(collection);
                }}
                size="sm"
                variant="outline"
                iconName="Upload"
                className="flex-1"
              >
                Upload
              </Button>
              <Button
                onClick={(e) => {
                  e?.stopPropagation();
                  onShareCollection?.(collection);
                }}
                size="sm"
                variant="outline"
                iconName="Share"
                className="flex-1"
              >
                Share
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-foreground">
                <Checkbox
                  checked={selectedCollections?.length === collections?.length && collections?.length > 0}
                  indeterminate={selectedCollections?.length > 0 && selectedCollections?.length < collections?.length}
                  onCheckedChange={(checked) => {
                    onBulkSelect?.(checked ? collections?.map(c => c?.id) : []);
                  }}
                />
              </th>
              <th className="text-left p-4 text-sm font-medium text-foreground">Collection</th>
              <th className="text-left p-4 text-sm font-medium text-foreground">Client</th>
              <th className="text-left p-4 text-sm font-medium text-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-foreground">Photos</th>
              <th className="text-left p-4 text-sm font-medium text-foreground">Views</th>
              <th className="text-left p-4 text-sm font-medium text-foreground">Modified</th>
              <th className="text-left p-4 text-sm font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {collections?.map((collection) => (
              <tr
                key={collection?.id}
                className={`border-b border-border hover:bg-muted/20 cursor-pointer transition-colors ${
                  selectedCollection?.id === collection?.id ? 'bg-primary/5' : ''
                }`}
                onClick={() => onCollectionSelect?.(collection)}
              >
                <td className="p-4">
                  <Checkbox
                    checked={selectedCollections?.includes(collection?.id)}
                    onCheckedChange={(checked) => handleCheckboxChange(collection?.id, checked)}
                    onClick={(e) => e?.stopPropagation()}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={collection?.coverImage}
                      alt={collection?.title}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <div className="font-medium text-foreground">{collection?.title}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Icon name={getPrivacyIcon(collection?.privacy)} size={12} />
                        {collection?.privacy}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-muted-foreground">{collection?.client}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(collection?.status)}`}>
                    {collection?.status?.charAt(0)?.toUpperCase() + collection?.status?.slice(1)}
                  </span>
                </td>
                <td className="p-4 text-muted-foreground">{collection?.photoCount}</td>
                <td className="p-4 text-muted-foreground">{collection?.views}</td>
                <td className="p-4 text-muted-foreground">{formatDate(collection?.lastModified)}</td>
                <td className="p-4">
                  <div className="flex gap-1">
                    <Button
                      onClick={(e) => {
                        e?.stopPropagation();
                        onEditCollection?.(collection);
                      }}
                      size="sm"
                      variant="ghost"
                      iconName="Edit"
                    />
                    <Button
                      onClick={(e) => {
                        e?.stopPropagation();
                        onShareCollection?.(collection);
                      }}
                      size="sm"
                      variant="ghost"
                      iconName="Share"
                    />
                    <Button
                      onClick={(e) => {
                        e?.stopPropagation();
                        onDuplicateCollection?.(collection);
                      }}
                      size="sm"
                      variant="ghost"
                      iconName="Copy"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return viewMode === 'grid' ? <GridView /> : <ListView />;
};

export default CollectionGrid;