import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PhotoLightbox = ({ 
  photo, 
  photos, 
  isOpen, 
  onClose, 
  onNext, 
  onPrevious, 
  onToggleFavorite, 
  onAddComment,
  isSelected 
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [comment, setComment] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch (e?.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case ' ':
          e?.preventDefault();
          onToggleFavorite();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrevious, onToggleFavorite]);

  const handleCommentSubmit = (e) => {
    e?.preventDefault();
    if (comment?.trim()) {
      onAddComment(photo?.id, comment?.trim());
      setComment('');
      setShowCommentForm(false);
    }
  };

  if (!isOpen || !photo) return null;

  const currentIndex = photos?.findIndex(p => p?.id === photo?.id);
  const hasNext = currentIndex < photos?.length - 1;
  const hasPrevious = currentIndex > 0;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center gallery-transition"
      >
        <Icon name="X" size={20} className="text-white" />
      </button>
      {/* Navigation Buttons */}
      {hasPrevious && (
        <button
          onClick={onPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center gallery-transition"
        >
          <Icon name="ChevronLeft" size={24} className="text-white" />
        </button>
      )}
      {hasNext && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center gallery-transition"
        >
          <Icon name="ChevronRight" size={24} className="text-white" />
        </button>
      )}
      {/* Main Image */}
      <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        <Image
          src={photo?.fullSize || photo?.src}
          alt={photo?.title || `Photo ${photo?.id}`}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        <div className="max-w-4xl mx-auto">
          {/* Photo Info */}
          <div className="flex items-start justify-between mb-4">
            <div className="text-white">
              <h3 className="text-lg font-medium mb-1">
                {photo?.title || `IMG_${photo?.id}`}
              </h3>
              <p className="text-sm text-white/70">
                {currentIndex + 1} of {photos?.length}
              </p>
              {photo?.description && (
                <p className="text-sm text-white/80 mt-2">
                  {photo?.description}
                </p>
              )}
            </div>

            <button
              onClick={() => setShowInfo(!showInfo)}
              className="text-white/70 hover:text-white gallery-transition"
            >
              <Icon name="Info" size={20} />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onToggleFavorite}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg gallery-transition ${
                  isSelected
                    ? 'bg-error text-white' :'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Icon 
                  name="Heart" 
                  size={16} 
                  className={isSelected ? 'fill-current' : ''} 
                />
                <span className="text-sm">
                  {isSelected ? 'Remove from Favorites' : 'Add to Favorites'}
                </span>
              </button>

              <button
                onClick={() => setShowCommentForm(!showCommentForm)}
                className="flex items-center space-x-2 px-3 py-2 bg-white/10 text-white hover:bg-white/20 rounded-lg gallery-transition"
              >
                <Icon name="MessageCircle" size={16} />
                <span className="text-sm">Comment</span>
              </button>

              <button className="flex items-center space-x-2 px-3 py-2 bg-white/10 text-white hover:bg-white/20 rounded-lg gallery-transition">
                <Icon name="Download" size={16} />
                <span className="text-sm">Download</span>
              </button>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="hidden md:flex items-center space-x-4 text-xs text-white/50">
              <span>← → Navigate</span>
              <span>Space Favorite</span>
              <span>Esc Close</span>
            </div>
          </div>

          {/* Comment Form */}
          {showCommentForm && (
            <form onSubmit={handleCommentSubmit} className="mt-4 p-4 bg-white/10 rounded-lg">
              <textarea
                value={comment}
                onChange={(e) => setComment(e?.target?.value)}
                placeholder="Add a comment or edit request..."
                className="w-full p-3 bg-white/10 text-white placeholder-white/50 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none resize-none"
                rows={3}
              />
              <div className="flex justify-end space-x-2 mt-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCommentForm(false)}
                  className="text-white/70 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={!comment?.trim()}
                  className="bg-accent hover:bg-accent/90"
                >
                  Add Comment
                </Button>
              </div>
            </form>
          )}

          {/* Photo Metadata */}
          {showInfo && (
            <div className="mt-4 p-4 bg-white/10 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-white/80">
                <div>
                  <span className="text-white/60">Camera:</span>
                  <p>{photo?.camera || 'Canon EOS R5'}</p>
                </div>
                <div>
                  <span className="text-white/60">Lens:</span>
                  <p>{photo?.lens || '24-70mm f/2.8'}</p>
                </div>
                <div>
                  <span className="text-white/60">Settings:</span>
                  <p>{photo?.settings || 'f/2.8, 1/200s, ISO 400'}</p>
                </div>
                <div>
                  <span className="text-white/60">Date:</span>
                  <p>{photo?.date || 'Dec 15, 2024'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoLightbox;