import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SlideshowModal = ({ 
  isOpen, 
  onClose, 
  photos, 
  startIndex = 0 
}) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [speed, setSpeed] = useState(3000); // 3 seconds
  const intervalRef = useRef();
  const timeoutRef = useRef();

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(startIndex);
    }
  }, [isOpen, startIndex]);

  useEffect(() => {
    if (isPlaying && isOpen) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % photos?.length);
      }, speed);
    } else {
      clearInterval(intervalRef?.current);
    }

    return () => clearInterval(intervalRef?.current);
  }, [isPlaying, isOpen, photos?.length, speed]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch (e?.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case ' ':
          e?.preventDefault();
          togglePlayPause();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % photos?.length);
    if (isPlaying) {
      clearInterval(intervalRef?.current);
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % photos?.length);
      }, speed);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev - 1 + photos?.length) % photos?.length);
    if (isPlaying) {
      clearInterval(intervalRef?.current);
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % photos?.length);
      }, speed);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(timeoutRef?.current);
    timeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const speedOptions = [
    { value: 2000, label: '2s' },
    { value: 3000, label: '3s' },
    { value: 5000, label: '5s' },
    { value: 10000, label: '10s' }
  ];

  if (!isOpen || photos?.length === 0) return null;

  const currentPhoto = photos?.[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-[1000] bg-black flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      {/* Main Image */}
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={currentPhoto?.fullSize || currentPhoto?.src}
          alt={currentPhoto?.title || `Photo ${currentPhoto?.id}`}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      {/* Controls Overlay */}
      <div className={`absolute inset-0 gallery-transition ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-6">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h3 className="text-lg font-medium">
                {currentPhoto?.title || `Photo ${currentIndex + 1}`}
              </h3>
              <p className="text-sm text-white/70">
                {currentIndex + 1} of {photos?.length}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              {/* Speed Control */}
              <div className="flex items-center space-x-2 bg-black/40 rounded-lg px-3 py-2">
                <Icon name="Clock" size={16} className="text-white/70" />
                <select
                  value={speed}
                  onChange={(e) => setSpeed(Number(e?.target?.value))}
                  className="bg-transparent text-white text-sm border-none outline-none"
                >
                  {speedOptions?.map(option => (
                    <option key={option?.value} value={option?.value} className="bg-black">
                      {option?.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-10 h-10 bg-black/40 hover:bg-black/60 rounded-lg flex items-center justify-center gallery-transition"
              >
                <Icon name="X" size={20} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center gallery-transition"
        >
          <Icon name="ChevronLeft" size={24} className="text-white" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center gallery-transition"
        >
          <Icon name="ChevronRight" size={24} className="text-white" />
        </button>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <div className="flex items-center justify-center space-x-4">
            {/* Play/Pause */}
            <button
              onClick={togglePlayPause}
              className="w-12 h-12 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center gallery-transition"
            >
              <Icon 
                name={isPlaying ? "Pause" : "Play"} 
                size={20} 
                className="text-white" 
              />
            </button>

            {/* Progress Indicator */}
            <div className="flex-1 max-w-md">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs text-white/70">
                  {String(currentIndex + 1)?.padStart(2, '0')}
                </span>
                <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white gallery-transition"
                    style={{ width: `${((currentIndex + 1) / photos?.length) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-white/70">
                  {String(photos?.length)?.padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex items-center space-x-1">
              {photos?.slice(Math.max(0, currentIndex - 2), currentIndex + 3)?.map((photo, index) => {
                const photoIndex = Math.max(0, currentIndex - 2) + index;
                return (
                  <button
                    key={photo?.id}
                    onClick={() => setCurrentIndex(photoIndex)}
                    className={`w-8 h-8 rounded overflow-hidden gallery-transition ${
                      photoIndex === currentIndex 
                        ? 'ring-2 ring-white' :'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={photo?.thumbnail}
                      alt={`Thumbnail ${photoIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-6 text-xs text-white/50">
              <span>← → Navigate</span>
              <span>Space Play/Pause</span>
              <span>Esc Exit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideshowModal;