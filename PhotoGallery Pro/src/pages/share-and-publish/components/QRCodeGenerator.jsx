import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QRCodeGenerator = ({ galleryUrl }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const generateQRCode = async () => {
    setIsGenerating(true);
    
    // Simulate QR code generation with a delay
    setTimeout(() => {
      // Using QR Server API for demonstration
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(galleryUrl)}`;
      setQrCodeUrl(qrUrl);
      setShowQRCode(true);
      setIsGenerating(false);
    }, 1000);
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'gallery-qr-code.png';
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  const printQRCode = () => {
    const printWindow = window.open('', '_blank');
    printWindow?.document?.write(`
      <html>
        <head>
          <title>Gallery QR Code</title>
          <style>
            body { 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              min-height: 100vh; 
              margin: 0; 
              font-family: Arial, sans-serif;
            }
            .qr-container {
              text-align: center;
              padding: 40px;
            }
            .qr-code {
              margin: 20px 0;
            }
            h2 {
              margin-bottom: 10px;
              color: #333;
            }
            p {
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <h2>PhotoGallery Pro</h2>
            <div class="qr-code">
              <img src="${qrCodeUrl}" alt="Gallery QR Code" />
            </div>
            <p>Scan to view gallery</p>
            <p style="font-size: 12px; word-break: break-all;">${galleryUrl}</p>
          </div>
        </body>
      </html>
    `);
    printWindow?.document?.close();
    printWindow?.print();
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">QR Code</h3>
        {showQRCode && (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              onClick={downloadQRCode}
            />
            <Button
              variant="outline"
              size="sm"
              iconName="Printer"
              onClick={printQRCode}
            />
          </div>
        )}
      </div>

      {!showQRCode ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="QrCode" size={32} className="text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Generate a QR code for easy mobile access to your gallery
          </p>
          <Button
            variant="default"
            iconName="QrCode"
            iconPosition="left"
            loading={isGenerating}
            onClick={generateQRCode}
          >
            {isGenerating ? "Generating..." : "Generate QR Code"}
          </Button>
        </div>
      ) : (
        <div className="text-center">
          <div className="inline-block p-4 bg-white rounded-lg border border-border mb-4">
            <img 
              src={qrCodeUrl} 
              alt="Gallery QR Code" 
              className="w-48 h-48 mx-auto"
            />
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Clients can scan this code with their phone camera to access the gallery
          </p>
          <div className="flex items-center justify-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              onClick={generateQRCode}
            >
              Regenerate
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              onClick={downloadQRCode}
            >
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Printer"
              iconPosition="left"
              onClick={printQRCode}
            >
              Print
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;