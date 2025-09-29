import React from 'react';
import MetricsCard from '../../admin-dashboard/components/MetricsCard';

const CollectionStats = ({ collections }) => {
  const totalCollections = collections?.length || 0;
  const publishedCollections = collections?.filter(c => c?.status === 'published')?.length || 0;
  const totalPhotos = collections?.reduce((sum, c) => sum + (c?.photoCount || 0), 0) || 0;
  const totalViews = collections?.reduce((sum, c) => sum + (c?.views || 0), 0) || 0;

  const calculateStorageUsed = () => {
    const totalMB = collections?.reduce((sum, c) => {
      const sizeString = c?.size || '0 MB';
      let sizeInMB = 0;
      
      if (sizeString?.includes('GB')) {
        sizeInMB = parseFloat(sizeString) * 1024;
      } else if (sizeString?.includes('MB')) {
        sizeInMB = parseFloat(sizeString);
      }
      
      return sum + sizeInMB;
    }, 0) || 0;

    if (totalMB >= 1024) {
      return `${(totalMB / 1024)?.toFixed(1)} GB`;
    }
    return `${totalMB?.toFixed(0)} MB`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MetricsCard
        title="Total Collections"
        value={totalCollections}
        change={publishedCollections > 0 ? `${publishedCollections} published` : 'No published collections'}
        changeType="neutral"
        icon="FolderOpen"
        color="accent"
      />
      <MetricsCard
        title="Total Photos"
        value={totalPhotos?.toLocaleString()}
        change={`Across ${totalCollections} collections`}
        changeType="neutral"
        icon="Camera"
        color="success"
      />
      <MetricsCard
        title="Total Views"
        value={totalViews?.toLocaleString()}
        change={totalViews > 0 ? 'Active engagement' : 'No views yet'}
        changeType={totalViews > 0 ? 'positive' : 'neutral'}
        icon="Eye"
        color="warning"
      />
      <MetricsCard
        title="Storage Used"
        value={calculateStorageUsed()}
        change="All collections"
        changeType="neutral"
        icon="HardDrive"
        color="secondary"
      />
    </div>
  );
};

export default CollectionStats;