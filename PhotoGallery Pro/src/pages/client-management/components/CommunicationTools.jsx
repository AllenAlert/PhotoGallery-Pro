import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CommunicationTools = ({ client, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [messageSubject, setMessageSubject] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [communicationMethod, setCommunicationMethod] = useState('email');

  const emailTemplates = [
    { value: 'gallery_ready', label: 'Gallery Ready', content: 'Your photo gallery is now ready for viewing!' },
    { value: 'appointment_reminder', label: 'Appointment Reminder', content: 'This is a reminder about your upcoming photo session.' },
    { value: 'follow_up', label: 'Follow Up', content: 'Thank you for choosing us for your photography needs.' },
    { value: 'custom', label: 'Custom Message', content: '' }
  ];

  const handleTemplateChange = (templateValue) => {
    setSelectedTemplate(templateValue);
    const template = emailTemplates?.find(t => t?.value === templateValue);
    if (template) {
      setMessageSubject(template?.label);
      setMessageContent(template?.content);
    }
  };

  const handleSendMessage = () => {
    console.log('Sending message to:', client?.name);
    console.log('Method:', communicationMethod);
    console.log('Subject:', messageSubject);
    console.log('Content:', messageContent);
    // Implement send message functionality
    onClose?.();
  };

  const handleScheduleMessage = () => {
    console.log('Scheduling message for:', scheduledDate);
    // Implement schedule functionality
    onClose?.();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <img
              src={client?.avatar}
              alt={client?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-bold text-foreground">Communicate with {client?.name}</h2>
              <p className="text-muted-foreground text-sm">{client?.email}</p>
            </div>
          </div>
          <Button onClick={onClose} variant="ghost" size="sm" iconName="X" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
          {/* Communication Method */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Communication Method
            </label>
            <Select
              value={communicationMethod}
              onValueChange={setCommunicationMethod}
            >
              <option value="email">Email</option>
              <option value="phone">Phone Call</option>
              <option value="text">Text Message</option>
            </Select>
          </div>

          {/* Email Template Selection */}
          {communicationMethod === 'email' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Template
              </label>
              <Select
                value={selectedTemplate}
                onValueChange={handleTemplateChange}
                placeholder="Choose a template"
              >
                {emailTemplates?.map((template) => (
                  <option key={template?.value} value={template?.value}>
                    {template?.label}
                  </option>
                ))}
              </Select>
            </div>
          )}

          {/* Subject Line */}
          {communicationMethod === 'email' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Subject
              </label>
              <Input
                value={messageSubject}
                onChange={(e) => setMessageSubject(e?.target?.value)}
                placeholder="Enter email subject..."
              />
            </div>
          )}

          {/* Message Content */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Message
            </label>
            <textarea
              value={messageContent}
              onChange={(e) => setMessageContent(e?.target?.value)}
              placeholder={`Enter your ${communicationMethod} message...`}
              className="w-full h-32 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Schedule Options */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium text-foreground mb-3">Schedule Message</h3>
            <div className="flex items-center gap-4">
              <Input
                type="datetime-local"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e?.target?.value)}
                className="flex-1"
              />
              <Button
                onClick={handleScheduleMessage}
                variant="outline"
                iconName="Clock"
                disabled={!scheduledDate || !messageContent}
              >
                Schedule
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-medium text-foreground mb-2">Appointment Scheduling</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Schedule a photo session with {client?.name}
              </p>
              <Button size="sm" variant="outline" iconName="Calendar" className="w-full">
                Schedule Session
              </Button>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-medium text-foreground mb-2">Follow-up Reminders</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Set automated follow-up reminders
              </p>
              <Button size="sm" variant="outline" iconName="Bell" className="w-full">
                Set Reminder
              </Button>
            </div>
          </div>

          {/* Client Preferences */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Info" size={16} className="text-blue-600" />
              <h4 className="font-medium text-blue-900">Client Preferences</h4>
            </div>
            <p className="text-sm text-blue-800">
              Preferred communication: <span className="font-medium capitalize">{client?.preferences?.communicationMethod}</span>
            </p>
            {client?.preferences?.specialRequirements && (
              <p className="text-sm text-blue-800 mt-1">
                Notes: {client?.preferences?.specialRequirements}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <div className="flex gap-3">
            <Button
              onClick={handleSendMessage}
              iconName="Send"
              iconPosition="left"
              disabled={!messageContent}
            >
              Send {communicationMethod === 'email' ? 'Email' : 'Message'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationTools;