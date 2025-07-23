import React, { useState } from 'react';
import InvoiceForm from './InvoiceForm';
import InvoicePreview from './InvoicePreview';

const InvoiceGenerator = () => {
  const [invoice, setInvoice] = useState({
    invoiceNumber: 'INV-001',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    from: {
      name: '',
      email: '',
      address: '',
      city: '',
      zipCode: '',
      country: ''
    },
    to: {
      name: '',
      email: '',
      address: '',
      city: '',
      zipCode: '',
      country: ''
    },
    items: [{
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    }],
    notes: '',
    terms: '',
    taxRate: 10
  });

  const [isPreview, setIsPreview] = useState(false);

  return (
    <div>
      {isPreview ? (
        <InvoicePreview 
          invoice={invoice} 
          onBackToEdit={() => setIsPreview(false)} 
        />
      ) : (
        <InvoiceForm 
          invoice={invoice} 
          setInvoice={setInvoice} 
          onPreview={() => setIsPreview(true)} 
        />
      )}
    </div>
  );
};

export default InvoiceGenerator;