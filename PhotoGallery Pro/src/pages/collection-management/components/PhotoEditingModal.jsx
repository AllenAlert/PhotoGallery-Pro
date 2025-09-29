import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { cn } from '../../../utils/cn';

const PhotoEditingModal = ({ isOpen, onClose, photo, onUpdate }) => {
  const [editData, setEditData] = useState({
    title: '',
    tags: [],
    status: 'draft',
    isFavorited: false,
    hasWatermark: false
  });
  const [newTag, setNewTag] = useState('');
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    if (photo) {
      setEditData({
        title: photo?.title || '',
        tags: photo?.tags || [],
        status: photo?.status || 'draft',
        isFavorited: photo?.isFavorited || false,
        hasWatermark: photo?.hasWatermark || false
      });
    }
  }, [photo]);

  const handleSave = () => {
    onUpdate?.({ ...photo, ...editData });
    onClose?.();
  };

  const handleAddTag = () => {
    if (newTag?.trim() && !editData?.tags?.includes(newTag?.trim()?.toLowerCase())) {
      setEditData(prev => ({
        ...prev,
        tags: [...prev?.tags, newTag?.trim()?.toLowerCase()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setEditData(prev => ({
      ...prev,
      tags: prev?.tags?.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      e?.preventDefault();
      handleAddTag();
    }
  };

  const tabs = [
    { id: 'details', label: 'Details', icon: 'Info' },
    { id: 'adjustments', label: 'Adjustments', icon: 'Sliders' },
    { id: 'effects', label: 'Effects', icon: 'Sparkles' }
  ];

  if (!isOpen || !photo) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg gallery-shadow max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Edit Photo</h2>
          <Button variant="ghost" size="sm" onClick={onClose} iconName="X" />
        </div>

        <div className="flex flex-col lg:flex-row max-h-[calc(90vh-140px)]">
          {/* Image Preview */}
          <div className="lg:w-2/3 p-6 flex items-center justify-center bg-muted/10">
            <div className="relative max-w-full max-h-full">
              <img
                src={photo?.url}
                alt={photo?.title}
                className="max-w-full max-h-[400px] lg:max-h-[500px] object-contain rounded-lg"
              />
              {photo?.hasWatermark && (
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  © Watermark
                </div>
              )}
            </div>
          </div>

          {/* Editing Panel */}
          <div className="lg:w-1/3 border-l border-border">
            {/* Tabs */}
            <div className="flex border-b border-border">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 p-4 text-sm font-medium transition-colors",
                    activeTab === tab?.id
                      ? "text-accent border-b-2 border-accent bg-accent/5" :"text-muted-foreground hover:text-foreground hover:bg-muted/20"
                  )}
                >
                  <Icon name={tab?.icon} size={16} />
                  {tab?.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6 overflow-y-auto max-h-[400px]">
              {activeTab === 'details' && (
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Photo Title
                    </label>
                    <Input
                      value={editData?.title}
                      onChange={(e) => setEditData(prev => ({ ...prev, title: e?.target?.value }))}
                      placeholder="Enter photo title"
                      className="w-full"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Tags
                    </label>
                    <div className="flex gap-2 mb-3">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e?.target?.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Add tag"
                        className="flex-1"
                      />
                      <Button
                        onClick={handleAddTag}
                        variant="outline"
                        size="sm"
                        iconName="Plus"
                      />
                    </div>
                    
                    {/* Tag List */}
                    <div className="flex flex-wrap gap-2">
                      {editData?.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full"
                        >
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="text-secondary hover:text-secondary/70 ml-1"
                          >
                            <Icon name="X" size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Status
                    </label>
                    <select
                      value={editData?.status}
                      onChange={(e) => setEditData(prev => ({ ...prev, status: e?.target?.value }))}
                      className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="processing">Processing</option>
                    </select>
                  </div>

                  {/* Toggles */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-foreground">Favorite</label>
                      <button
                        onClick={() => setEditData(prev => ({ ...prev, isFavorited: !prev?.isFavorited }))}
                        className={cn(
                          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                          editData?.isFavorited ? "bg-error" : "bg-muted"
                        )}
                      >
                        <span
                          className={cn(
                            "inline-block h-4 w-4 transform rounded-full bg-card transition-transform",
                            editData?.isFavorited ? "translate-x-6" : "translate-x-1"
                          )}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-foreground">Watermark</label>
                      <button
                        onClick={() => setEditData(prev => ({ ...prev, hasWatermark: !prev?.hasWatermark }))}
                        className={cn(
                          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                          editData?.hasWatermark ? "bg-accent" : "bg-muted"
                        )}
                      >
                        <span
                          className={cn(
                            "inline-block h-4 w-4 transform rounded-full bg-card transition-transform",
                            editData?.hasWatermark ? "translate-x-6" : "translate-x-1"
                          )}
                        />
                      </button>
                    </div>
                  </div>

                  {/* File Info */}
                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-semibold text-foreground mb-3">File Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Filename</span>
                        <span className="text-foreground">{photo?.filename}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Size</span>
                        <span className="text-foreground">{photo?.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Dimensions</span>
                        <span className="text-foreground">{photo?.dimensions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Upload Date</span>
                        <span className="text-foreground">
                          {new Date(photo?.uploadDate)?.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'adjustments' && (
                <div className="space-y-6">
                  <div className="text-center py-8">
                    <Icon name="Sliders" size={48} className="text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">Basic Adjustments</h3>
                    <p className="text-sm text-muted-foreground">
                      Photo editing adjustments coming soon
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'effects' && (
                <div className="space-y-6">
                  <div className="text-center py-8">
                    <Icon name="Sparkles" size={48} className="text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">Effects & Filters</h3>
                    <p className="text-sm text-muted-foreground">
                      Photo effects and filters coming soon
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhotoEditingModal;