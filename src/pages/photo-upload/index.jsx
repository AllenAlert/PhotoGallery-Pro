import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TopNavigation from '../../components/ui/TopNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import UploadZone from './components/UploadZone';
import UploadQueue from './components/UploadQueue';
import ProcessingOptions from './components/ProcessingOptions';
import CollectionSelector from './components/CollectionSelector';
import UploadProgress from './components/UploadProgress';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PhotoUpload = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploadQueue, setUploadQueue] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingOptions, setProcessingOptions] = useState({
    autoResize: true,
    maxWidth: 2048,
    quality: 85,
    addWatermark: false,
    watermarkPosition: 'bottom-right',
    preserveMetadata: true,
    autoCategorizationType: 'exif-filename',
    generateThumbnails: true
  });

  // Mock collections data
  const mockCollections = [
    {
      id: 1,
      title: "Sarah & Mike\'s Wedding",
      clientName: "Sarah Wilson",
      photoCount: 247,
      status: "published",
      createdDate: "Dec 15, 2024"
    },
    {
      id: 2,
      title: "Corporate Headshots - TechCorp",
      clientName: "Mike Johnson",
      photoCount: 89,
      status: "published",
      createdDate: "Dec 10, 2024"
    },
    {
      id: 3,
      title: "Emma\'s Maternity Session",
      clientName: "Emma Davis",
      photoCount: 156,
      status: "draft",
      createdDate: "Dec 20, 2024"
    }
  ];

  // Initialize with collection from navigation state
  useEffect(() => {
    if (location?.state?.collectionId) {
      const collection = mockCollections?.find(c => c?.id === location?.state?.collectionId);
      if (collection) {
        setSelectedCollection(collection);
      }
    }
  }, [location?.state?.collectionId]);

  const handleFilesSelected = useCallback((selectedFiles) => {
    const newFiles = Array.from(selectedFiles)?.map((file, index) => ({
      id: Date.now() + index,
      file: file,
      name: file?.name,
      size: file?.size,
      type: file?.type,
      preview: file?.type?.startsWith('image/') ? URL.createObjectURL(file) : null,
      status: 'pending',
      progress: 0,
      error: null,
      suggestedCategory: getSuggestedCategory(file),
      metadata: null
    }));

    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const getSuggestedCategory = (file) => {
    const fileName = file?.name?.toLowerCase();
    
    if (fileName?.includes('wedding') || fileName?.includes('ceremony') || fileName?.includes('reception')) {
      return 'Wedding';
    }
    if (fileName?.includes('portrait') || fileName?.includes('headshot')) {
      return 'Portrait';
    }
    if (fileName?.includes('maternity') || fileName?.includes('pregnancy')) {
      return 'Maternity';
    }
    if (fileName?.includes('family')) {
      return 'Family';
    }
    if (fileName?.includes('corporate') || fileName?.includes('business')) {
      return 'Corporate';
    }
    
    return 'Other';
  };

  const handleFileRemove = (fileId) => {
    setFiles(prev => prev?.filter(f => f?.id !== fileId));
  };

  const handleFileUpdate = (fileId, updates) => {
    setFiles(prev => prev?.map(f => 
      f?.id === fileId ? { ...f, ...updates } : f
    ));
  };

  const validateFiles = () => {
    const errors = [];
    
    if (!selectedCollection) {
      errors?.push('Please select a collection');
    }
    
    if (files?.length === 0) {
      errors?.push('Please select files to upload');
    }

    const invalidFiles = files?.filter(f => !f?.type?.startsWith('image/'));
    if (invalidFiles?.length > 0) {
      errors?.push(`${invalidFiles?.length} file(s) are not valid images`);
    }

    const largeFiles = files?.filter(f => f?.size > 50 * 1024 * 1024); // 50MB
    if (largeFiles?.length > 0) {
      errors?.push(`${largeFiles?.length} file(s) exceed size limit (50MB)`);
    }

    return errors;
  };

  const simulateUpload = async (file) => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          resolve({
            id: Date.now(),
            filename: file?.name,
            url: file?.preview,
            size: `${(file?.size / 1024 / 1024)?.toFixed(1)} MB`,
            uploadDate: new Date()?.toISOString(),
            status: 'uploaded'
          });
        }
        
        handleFileUpdate(file?.id, { 
          status: 'uploading', 
          progress: Math.min(progress, 100) 
        });
      }, 200);
    });
  };

  const startUpload = async () => {
    const errors = validateFiles();
    if (errors?.length > 0) {
      alert(errors?.join('\n'));
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    
    // Update all files to uploading status
    setFiles(prev => prev?.map(f => ({ ...f, status: 'uploading', progress: 0 })));

    try {
      const totalFiles = files?.length;
      let completedFiles = 0;

      // Process files sequentially for demo
      for (const file of files) {
        try {
          const result = await simulateUpload(file);
          handleFileUpdate(file?.id, { 
            status: 'completed', 
            progress: 100, 
            uploadedFile: result 
          });
          completedFiles++;
          setUploadProgress((completedFiles / totalFiles) * 100);
        } catch (error) {
          handleFileUpdate(file?.id, { 
            status: 'error', 
            error: 'Upload failed: ' + error?.message 
          });
        }
      }

      // Show success and navigate after brief delay
      setTimeout(() => {
        setIsUploading(false);
        navigate('/collection-management', { 
          state: { 
            collection: selectedCollection,
            uploadedFiles: files?.filter(f => f?.status === 'completed')?.length
          }
        });
      }, 1000);

    } catch (error) {
      console.error('Upload failed:', error);
      setIsUploading(false);
    }
  };

  const handleRetryFailed = () => {
    const failedFiles = files?.filter(f => f?.status === 'error');
    failedFiles?.forEach(file => {
      handleFileUpdate(file?.id, { status: 'pending', progress: 0, error: null });
    });
  };

  const clearCompleted = () => {
    setFiles(prev => prev?.filter(f => f?.status !== 'completed'));
  };

  const pendingFiles = files?.filter(f => f?.status === 'pending');
  const uploadingFiles = files?.filter(f => f?.status === 'uploading');
  let completedFiles = files?.filter(f => f?.status === 'completed');
  const errorFiles = files?.filter(f => f?.status === 'error');

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation userRole="photographer" />
      <div className="md:ml-72">
        <div className="pt-16 md:pt-8">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <BreadcrumbTrail userRole="photographer" />

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Photo Upload</h1>
                <p className="text-muted-foreground">
                  Upload and organize your photos with intelligent batch processing
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/collection-management')}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back to Collections
                </Button>
                {files?.length > 0 && (
                  <Button
                    onClick={startUpload}
                    disabled={isUploading || !selectedCollection}
                    iconName={isUploading ? "Loader2" : "Upload"}
                    iconPosition="left"
                    className={isUploading ? "animate-spin" : ""}
                  >
                    {isUploading ? 'Uploading...' : `Upload ${files?.length} Photos`}
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="xl:col-span-3 space-y-6">
                {/* Collection Selection */}
                <CollectionSelector
                  collections={mockCollections}
                  selectedCollection={selectedCollection}
                  onSelectionChange={setSelectedCollection}
                />

                {/* Upload Zone */}
                <UploadZone
                  onFilesSelected={handleFilesSelected}
                  isUploading={isUploading}
                  acceptedTypes="image/*"
                  maxFileSize={50 * 1024 * 1024} // 50MB
                  supportsBatch={true}
                />

                {/* Upload Progress */}
                {isUploading && (
                  <UploadProgress
                    progress={uploadProgress}
                    currentFile={uploadingFiles?.[0]?.name}
                    totalFiles={files?.length}
                    completedFiles={completedFiles?.length}
                    errorFiles={errorFiles?.length}
                  />
                )}

                {/* Upload Queue */}
                {files?.length > 0 && (
                  <UploadQueue
                    files={files}
                    onFileRemove={handleFileRemove}
                    onFileUpdate={handleFileUpdate}
                    onRetryFailed={handleRetryFailed}
                    onClearCompleted={clearCompleted}
                    isUploading={isUploading}
                  />
                )}

                {/* Empty State */}
                {files?.length === 0 && !isUploading && (
                  <div className="text-center py-12">
                    <Icon name="Upload" size={48} className="text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">Ready to upload</h3>
                    <p className="text-muted-foreground mb-6">
                      Select photos above or drag and drop them into the upload zone
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Icon name="Image" size={16} />
                        <span>JPG, PNG, HEIC</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="HardDrive" size={16} />
                        <span>Up to 50MB each</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="FolderOpen" size={16} />
                        <span>Batch upload support</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Processing Options Sidebar */}
              <div className="xl:col-span-1">
                <ProcessingOptions
                  options={processingOptions}
                  onOptionsChange={setProcessingOptions}
                  isUploading={isUploading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;
