import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const EmailInvitationSystem = ({ galleryTitle, galleryUrl }) => {
  const [emailList, setEmailList] = useState('');
  const [customMessage, setCustomMessage] = useState(`Hi there!\n\nI'm excited to share my latest photo gallery with you: "${galleryTitle}"\n\nYou can view and download your photos using the link below:\n${galleryUrl}\n\nBest regards,\nAlex Johnson`);
  const [includeQRCode, setIncludeQRCode] = useState(true);
  const [sendCopy, setSendCopy] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sentEmails, setSentEmails] = useState([]);

  const recentContacts = [
    { name: 'Sarah Wilson', email: 'sarah@email.com', lastSent: '2 days ago' },
    { name: 'Mike Johnson', email: 'mike@email.com', lastSent: '1 week ago' },
    { name: 'Emily Davis', email: 'emily@email.com', lastSent: '2 weeks ago' },
    { name: 'David Brown', email: 'david@email.com', lastSent: '1 month ago' }
  ];

  const emailTemplates = [
    {
      name: 'Wedding Gallery',
      subject: 'Your Wedding Photos Are Ready! 💕',
      message: `Dear [Client Name],\n\nYour beautiful wedding photos are now ready for viewing!\n\nI had such a wonderful time capturing your special day, and I'm thrilled to share these memories with you.\n\nView Gallery: ${galleryUrl}\n\nWith love,\n[Photographer Name]`
    },
    {
      name: 'Portrait Session',subject: 'Your Portrait Session Photos',
      message: `Hi [Client Name],\n\nThank you for the amazing portrait session! Your photos are now ready for viewing.\n\nGallery Link: ${galleryUrl}\n\nFeel free to download your favorites and let me know if you need any prints.\n\nBest,\n[Photographer Name]`
    },
    {
      name: 'Event Photography',subject: 'Event Photos Ready for Download',
      message: `Hello!\n\nThe photos from your recent event are now available for viewing and download.\n\nAccess your gallery here: ${galleryUrl}\n\nThank you for choosing us to capture your special moments!\n\n[Photographer Name]`
    }
  ];

  const handleAddContact = (contact) => {
    const emails = emailList?.split(',')?.map(email => email?.trim())?.filter(email => email);
    if (!emails?.includes(contact?.email)) {
      setEmailList(emails?.length > 0 ? `${emailList}, ${contact?.email}` : contact?.email);
    }
  };

  const handleUseTemplate = (template) => {
    setCustomMessage(template?.message);
  };

  const handleSendInvitations = async () => {
    setIsSending(true);
    
    // Simulate sending emails
    const emails = emailList?.split(',')?.map(email => email?.trim())?.filter(email => email);
    
    setTimeout(() => {
      setSentEmails(emails);
      setIsSending(false);
      setEmailList('');
    }, 2000);
  };

  const validateEmails = () => {
    const emails = emailList?.split(',')?.map(email => email?.trim())?.filter(email => email);
    return emails?.length > 0 && emails?.every(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(email));
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Email Invitations</h3>
      <div className="space-y-6">
        {/* Recent Contacts */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Recent Contacts</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {recentContacts?.map((contact, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {contact?.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {contact?.email}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last sent: {contact?.lastSent}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Plus"
                  onClick={() => handleAddContact(contact)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Email Input */}
        <div>
          <Input
            label="Email Addresses"
            type="text"
            value={emailList}
            onChange={(e) => setEmailList(e?.target?.value)}
            placeholder="client1@email.com, client2@email.com, client3@email.com"
            description="Separate multiple email addresses with commas"
          />
        </div>

        {/* Email Templates */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Quick Templates</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {emailTemplates?.map((template, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleUseTemplate(template)}
              >
                {template?.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Message */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Custom Message
          </label>
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e?.target?.value)}
            rows={8}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm resize-vertical focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Write your custom message here..."
          />
          <p className="text-xs text-muted-foreground mt-1">
            Use [Client Name] and [Photographer Name] as placeholders
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <Checkbox
            label="Include QR code in email"
            description="Adds a QR code for easy mobile access"
            checked={includeQRCode}
            onChange={(e) => setIncludeQRCode(e?.target?.checked)}
          />
          <Checkbox
            label="Send me a copy"
            description="Receive a copy of the invitation email"
            checked={sendCopy}
            onChange={(e) => setSendCopy(e?.target?.checked)}
          />
        </div>

        {/* Send Button */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {emailList && `${emailList?.split(',')?.filter(email => email?.trim())?.length} recipient(s)`}
          </div>
          <Button
            variant="default"
            iconName="Send"
            iconPosition="left"
            loading={isSending}
            disabled={!validateEmails() || !customMessage?.trim()}
            onClick={handleSendInvitations}
          >
            {isSending ? 'Sending...' : 'Send Invitations'}
          </Button>
        </div>

        {/* Success Message */}
        {sentEmails?.length > 0 && (
          <div className="flex items-center space-x-2 p-4 bg-success/10 text-success rounded-lg">
            <Icon name="CheckCircle" size={20} />
            <div>
              <p className="font-medium">Invitations sent successfully!</p>
              <p className="text-sm opacity-80">
                Sent to {sentEmails?.length} recipient(s): {sentEmails?.join(', ')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailInvitationSystem;