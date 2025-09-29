import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '../../components/ui/TopNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import GalleryHeader from './components/GalleryHeader';
import PhotoGrid from './components/PhotoGrid';
import PhotoLightbox from './components/PhotoLightbox';
import ShareModal from './components/ShareModal';
import DownloadModal from './components/DownloadModal';
import SlideshowModal from './components/SlideshowModal';

const ClientGalleryView = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('all');
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isSlideshowOpen, setIsSlideshowOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Mock collection data
  const collection = {
    id: 'wedding-sarah-mike-2024',
    title: 'Sarah & Mike Wedding Collection',
    photographer: 'Alex Johnson Photography',
    description: 'Beautiful moments from Sarah and Mike\'s wedding day at Riverside Gardens. A celebration of love, joy, and unforgettable memories.',
    lastUpdated: 'Dec 15, 2024',
    totalPhotos: 247,
    isPasswordProtected: true,
    allowDownloads: true,
    allowComments: true
  };

  // Mock photos data
  const mockPhotos = [
    {
      id: 1,
      title: 'Ceremony Entrance',
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
      fullSize: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920',
      description: 'Sarah walking down the aisle in her stunning dress',
      camera: 'Canon EOS R5',
      lens: '85mm f/1.4',
      settings: 'f/2.8, 1/250s, ISO 400',
      date: 'Dec 15, 2024',
      hasComments: false
    },
    {
      id: 2,
      title: 'First Kiss',
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400',
      fullSize: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920',
      description: 'The magical moment of their first kiss as husband and wife',
      camera: 'Canon EOS R5',
      lens: '70-200mm f/2.8',
      settings: 'f/2.8, 1/320s, ISO 800',
      date: 'Dec 15, 2024',
      hasComments: true
    },
    {
      id: 3,
      title: 'Ring Exchange',
      src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400',
      fullSize: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920',
      description: 'Intimate moment during the ring exchange ceremony',
      camera: 'Canon EOS R5',
      lens: '85mm f/1.4',
      settings: 'f/1.8, 1/200s, ISO 400',
      date: 'Dec 15, 2024',
      hasComments: false
    },
    {
      id: 4,
      title: 'Bridal Portrait',
      src: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400',
      fullSize: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=1920',
      description: 'Beautiful bridal portrait in natural light',
      camera: 'Canon EOS R5',
      lens: '85mm f/1.4',
      settings: 'f/2.0, 1/160s, ISO 200',
      date: 'Dec 15, 2024',
      hasComments: false
    },
    {
      id: 5,
      title: 'Reception Dance',
      src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400',
      fullSize: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1920',
      description: 'First dance under the romantic lighting',
      camera: 'Canon EOS R5',
      lens: '24-70mm f/2.8',
      settings: 'f/2.8, 1/125s, ISO 1600',
      date: 'Dec 15, 2024',
      hasComments: true
    },
    {
      id: 6,
      title: 'Wedding Party',
      src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400',
      fullSize: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920',
      description: 'Group photo with the wedding party',
      camera: 'Canon EOS R5',
      lens: '24-70mm f/2.8',
      settings: 'f/5.6, 1/200s, ISO 400',
      date: 'Dec 15, 2024',
      hasComments: false
    },
    {
      id: 7,
      title: 'Cake Cutting',
      src: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400',
      fullSize: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1920',
      description: 'Sweet moment during the cake cutting ceremony',
      camera: 'Canon EOS R5',
      lens: '50mm f/1.8',
      settings: 'f/2.8, 1/160s, ISO 800',
      date: 'Dec 15, 2024',
      hasComments: false
    },
    {
      id: 8,
      title: 'Sunset Portraits',
      src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400',
      fullSize: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1920',
      description: 'Romantic sunset portraits by the lake',
      camera: 'Canon EOS R5',
      lens: '85mm f/1.4',
      settings: 'f/1.8, 1/250s, ISO 200',
      date: 'Dec 15, 2024',
      hasComments: true
    }
  ];

  // Initialize photos on component mount
  useEffect(() => {
    setPhotos(mockPhotos);
  }, []);

  // Filter photos based on view mode
  const filteredPhotos = viewMode === 'favorites' 
    ? photos?.filter(photo => selectedPhotos?.includes(photo?.id))
    : photos;

  const handlePhotoSelect = (photoId) => {
    setSelectedPhotos(prev => 
      prev?.includes(photoId)
        ? prev?.filter(id => id !== photoId)
        : [...prev, photoId]
    );
  };

  const handlePhotoClick = (photo) => {
    setCurrentPhoto(photo);
    setIsLightboxOpen(true);
  };

  const handleLightboxNext = () => {
    const currentIndex = filteredPhotos?.findIndex(p => p?.id === currentPhoto?.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos?.length;
    setCurrentPhoto(filteredPhotos?.[nextIndex]);
  };

  const handleLightboxPrevious = () => {
    const currentIndex = filteredPhotos?.findIndex(p => p?.id === currentPhoto?.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos?.length) % filteredPhotos?.length;
    setCurrentPhoto(filteredPhotos?.[prevIndex]);
  };

  const handleToggleFavorite = () => {
    if (currentPhoto) {
      handlePhotoSelect(currentPhoto?.id);
    }
  };

  const handleAddComment = (photoId, comment) => {
    console.log('Adding comment to photo:', photoId, comment);
    // In a real app, this would make an API call
  };

  const handleLoadMore = () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    // Simulate loading more photos
    setTimeout(() => {
      setPage(prev => prev + 1);
      setLoading(false);
      // For demo, stop loading after page 3
      if (page >= 3) {
        setHasMore(false);
      }
    }, 1000);
  };

  const handleSlideshow = () => {
    setIsSlideshowOpen(true);
  };

  const handleDownload = (downloadData) => {
    console.log('Downloading photos:', downloadData);
    // In a real app, this would trigger the download process
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation userRole="client" />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <BreadcrumbTrail userRole="client" />
        </div>

        <GalleryHeader
          collection={collection}
          totalPhotos={filteredPhotos?.length}
          selectedCount={selectedPhotos?.length}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onSlideshow={handleSlideshow}
          onDownload={() => setIsDownloadModalOpen(true)}
          onShare={handleShare}
        />

        <PhotoGrid
          photos={filteredPhotos}
          selectedPhotos={selectedPhotos}
          onPhotoSelect={handlePhotoSelect}
          onPhotoClick={handlePhotoClick}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
          loading={loading}
        />

        {/* Modals */}
        <PhotoLightbox
          photo={currentPhoto}
          photos={filteredPhotos}
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          onNext={handleLightboxNext}
          onPrevious={handleLightboxPrevious}
          onToggleFavorite={handleToggleFavorite}
          onAddComment={handleAddComment}
          isSelected={currentPhoto ? selectedPhotos?.includes(currentPhoto?.id) : false}
        />

        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          collection={collection}
        />

        <DownloadModal
          isOpen={isDownloadModalOpen}
          onClose={() => setIsDownloadModalOpen(false)}
          selectedPhotos={selectedPhotos}
          photos={photos}
          onDownload={handleDownload}
        />

        <SlideshowModal
          isOpen={isSlideshowOpen}
          onClose={() => setIsSlideshowOpen(false)}
          photos={filteredPhotos}
          startIndex={0}
        />
      </main>
    </div>
  );
};

export default ClientGalleryView;