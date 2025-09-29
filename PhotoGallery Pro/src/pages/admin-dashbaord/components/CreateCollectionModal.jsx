import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const CreateCollectionModal = ({ isOpen, onClose, onCreateCollection }) => {
  const [formData, setFormData] = useState({
    title: '',
    clientName: '',
    clientEmail: '',
    description: '',
    template: 'wedding',
    isPrivate: true,
    allowDownloads: true,
    allowComments: true,
    expiryDate: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const templateOptions = [
    { value: 'wedding', label: 'Wedding Collection' },
    { value: 'portrait', label: 'Portrait Session' },
    { value: 'event', label: 'Event Photography' },
    { value: 'corporate', label: 'Corporate Headshots' },
    { value: 'family', label: 'Family Photos' },
    { value: 'custom', label: 'Custom Collection' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.title?.trim()) {
      newErrors.title = 'Collection title is required';
    }
    
    if (!formData?.clientName?.trim()) {
      newErrors.clientName = 'Client name is required';
    }
    
    if (!formData?.clientEmail?.trim()) {
      newErrors.clientEmail = 'Client email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.clientEmail)) {
      newErrors.clientEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newCollection = {
        id: Date.now(),
        ...formData,
        status: 'draft',
        photoCount: 0,
        views: 0,
        favorites: 0,
        downloads: 0,
        createdDate: new Date()?.toLocaleDateString(),
        coverImage: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop'
      };
      
      onCreateCollection(newCollection);
      onClose();
      
      // Reset form
      setFormData({
        title: '',
        clientName: '',
        clientEmail: '',
        description: '',
        template: 'wedding',
        isPrivate: true,
        allowDownloads: true,
        allowComments: true,
        expiryDate: ''
      });
    } catch (error) {
      console.error('Error creating collection:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1020] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg gallery-shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mr-3">
              <Icon name="Plus" size={18} className="text-accent" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Create New Collection</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Collection Title"
                name="title"
                value={formData?.title}
                onChange={handleInputChange}
                error={errors?.title}
                placeholder="e.g., Sarah & Mike's Wedding"
                required
              />
              
              <Select
                label="Collection Template"
                options={templateOptions}
                value={formData?.template}
                onChange={(value) => setFormData(prev => ({ ...prev, template: value }))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Client Name"
                name="clientName"
                value={formData?.clientName}
                onChange={handleInputChange}
                error={errors?.clientName}
                placeholder="Sarah Wilson"
                required
              />
              
              <Input
                label="Client Email"
                name="clientEmail"
                type="email"
                value={formData?.clientEmail}
                onChange={handleInputChange}
                error={errors?.clientEmail}
                placeholder="sarah@email.com"
                required
              />
            </div>

            <Input
              label="Description (Optional)"
              name="description"
              value={formData?.description}
              onChange={handleInputChange}
              placeholder="Brief description of the collection"
            />
          </div>

          {/* Privacy & Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Privacy & Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Checkbox
                  label="Private Collection"
                  description="Require password to access"
                  checked={formData?.isPrivate}
                  onChange={(e) => setFormData(prev => ({ ...prev, isPrivate: e?.target?.checked }))}
                />
                
                <Checkbox
                  label="Allow Downloads"
                  description="Clients can download photos"
                  checked={formData?.allowDownloads}
                  onChange={(e) => setFormData(prev => ({ ...prev, allowDownloads: e?.target?.checked }))}
                />
              </div>
              
              <div className="space-y-4">
                <Checkbox
                  label="Allow Comments"
                  description="Clients can leave comments"
                  checked={formData?.allowComments}
                  onChange={(e) => setFormData(prev => ({ ...prev, allowComments: e?.target?.checked }))}
                />
                
                <Input
                  label="Expiry Date (Optional)"
                  name="expiryDate"
                  type="date"
                  value={formData?.expiryDate}
                  onChange={handleInputChange}
                  description="Collection will be automatically hidden after this date"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              iconName="Plus"
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              Create Collection
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCollectionModal;