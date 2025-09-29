import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InvoiceIntegration = ({ client, onClose }) => {
  const [activeTab, setActiveTab] = useState('history');
  const [newInvoiceAmount, setNewInvoiceAmount] = useState('');
  const [newInvoiceDescription, setNewInvoiceDescription] = useState('');

  // Mock invoice data
  const invoiceHistory = [
    {
      id: 'INV-001',
      description: 'Wedding Photography Package',
      amount: 1200,
      status: 'paid',
      dateIssued: '2024-12-01',
      datePaid: '2024-12-05',
      dueDate: '2024-12-15'
    },
    {
      id: 'INV-002',
      description: 'Engagement Session',
      amount: 450,
      status: 'paid',
      dateIssued: '2024-11-15',
      datePaid: '2024-11-18',
      dueDate: '2024-11-29'
    },
    {
      id: 'INV-003',
      description: 'Anniversary Photos',
      amount: 800,
      status: 'pending',
      dateIssued: '2024-12-20',
      datePaid: null,
      dueDate: '2025-01-03'
    }
  ];

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'overdue':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const totalSpent = invoiceHistory
    ?.filter(invoice => invoice?.status === 'paid')
    ?.reduce((sum, invoice) => sum + invoice?.amount, 0);

  const outstandingBalance = invoiceHistory
    ?.filter(invoice => invoice?.status === 'pending' || invoice?.status === 'overdue')
    ?.reduce((sum, invoice) => sum + invoice?.amount, 0);

  const handleCreateInvoice = () => {
    if (newInvoiceAmount && newInvoiceDescription) {
      console.log('Creating new invoice:', {
        client: client?.name,
        amount: newInvoiceAmount,
        description: newInvoiceDescription
      });
      // Implement invoice creation
      setNewInvoiceAmount('');
      setNewInvoiceDescription('');
    }
  };

  const handleSendReminder = (invoice) => {
    console.log('Sending payment reminder for:', invoice?.id);
    // Implement reminder functionality
  };

  const tabs = [
    { key: 'history', label: 'Invoice History' },
    { key: 'create', label: 'Create Invoice' },
    { key: 'settings', label: 'Settings' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <img
              src={client?.avatar}
              alt={client?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-bold text-foreground">Invoice Management - {client?.name}</h2>
              <p className="text-muted-foreground text-sm">Manage billing and payment tracking</p>
            </div>
          </div>
          <Button onClick={onClose} variant="ghost" size="sm" iconName="X" />
        </div>

        {/* Financial Summary */}
        <div className="p-6 border-b border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-700">${totalSpent?.toLocaleString()}</div>
              <div className="text-sm text-green-600">Total Paid</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="text-2xl font-bold text-orange-700">${outstandingBalance?.toLocaleString()}</div>
              <div className="text-sm text-orange-600">Outstanding</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-700">{invoiceHistory?.length}</div>
              <div className="text-sm text-blue-600">Total Invoices</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex">
            {tabs?.map((tab) => (
              <button
                key={tab?.key}
                onClick={() => setActiveTab(tab?.key)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab?.key
                    ? 'text-primary border-primary' :'text-muted-foreground border-transparent hover:text-foreground hover:border-border'
                }`}
              >
                {tab?.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {activeTab === 'history' && (
            <div className="space-y-4">
              <h3 className="font-medium text-foreground mb-4">Payment History</h3>
              {invoiceHistory?.map((invoice) => (
                <div key={invoice?.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-foreground">{invoice?.id}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(invoice?.status)}`}>
                        {invoice?.status?.charAt(0)?.toUpperCase() + invoice?.status?.slice(1)}
                      </span>
                    </div>
                    <span className="text-xl font-bold text-foreground">${invoice?.amount?.toLocaleString()}</span>
                  </div>
                  
                  <p className="text-muted-foreground mb-3">{invoice?.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Issued: </span>
                      <span>{formatDate(invoice?.dateIssued)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Due: </span>
                      <span>{formatDate(invoice?.dueDate)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Paid: </span>
                      <span>{formatDate(invoice?.datePaid)}</span>
                    </div>
                  </div>

                  {invoice?.status === 'pending' && (
                    <div className="flex gap-2 mt-3">
                      <Button
                        onClick={() => handleSendReminder(invoice)}
                        size="sm"
                        variant="outline"
                        iconName="Mail"
                      >
                        Send Reminder
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        iconName="Download"
                      >
                        Download PDF
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'create' && (
            <div className="space-y-6">
              <h3 className="font-medium text-foreground mb-4">Create New Invoice</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Amount ($)
                  </label>
                  <Input
                    type="number"
                    value={newInvoiceAmount}
                    onChange={(e) => setNewInvoiceAmount(e?.target?.value)}
                    placeholder="0.00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Due Date
                  </label>
                  <Input
                    type="date"
                    min={new Date()?.toISOString()?.split('T')?.[0]}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  value={newInvoiceDescription}
                  onChange={(e) => setNewInvoiceDescription(e?.target?.value)}
                  placeholder="Describe the services provided..."
                  className="w-full h-24 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Invoice Template Options</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 border border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <div className="font-medium text-sm">Standard Package</div>
                    <div className="text-xs text-muted-foreground">Photography session + editing</div>
                  </div>
                  <div className="p-3 border border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <div className="font-medium text-sm">Premium Package</div>
                    <div className="text-xs text-muted-foreground">Full service + prints</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleCreateInvoice}
                  iconName="Plus"
                  iconPosition="left"
                  disabled={!newInvoiceAmount || !newInvoiceDescription}
                >
                  Create Invoice
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="font-medium text-foreground mb-4">Billing Settings</h3>
              
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Automatic Reminders</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Send automated payment reminders for overdue invoices
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Enable auto-reminders</span>
                    <Button size="sm" variant="outline">
                      Configure
                    </Button>
                  </div>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Payment Methods</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Configure accepted payment methods for this client
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Bank Transfer
                    </Button>
                    <Button size="sm" variant="outline">
                      Credit Card
                    </Button>
                    <Button size="sm" variant="outline">
                      PayPal
                    </Button>
                  </div>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Invoice Templates</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Customize invoice templates and branding
                  </p>
                  <Button size="sm" variant="outline" iconName="Settings">
                    Customize Templates
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Total business value: ${client?.totalSpent?.toLocaleString()}
          </div>
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceIntegration;