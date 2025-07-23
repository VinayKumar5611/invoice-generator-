import React from 'react';
import { Download, ArrowLeft } from 'lucide-react';
import { formatCurrency, calculateSubtotal, calculateTax, calculateTotal } from '../utils/calculations';

const InvoicePreview = ({ invoice, onBackToEdit }) => {
  const handlePrint = () => {
    window.print();
  };

  const subtotal = calculateSubtotal(invoice.items);
  const tax = calculateTax(subtotal, invoice.taxRate / 100);
  const total = calculateTotal(subtotal, tax);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white mb-4 p-4 rounded-lg shadow flex justify-between items-center print-hidden">
          <button
            onClick={onBackToEdit}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Edit
          </button>
          <button
            onClick={handlePrint}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Download size={16} />
            Print/Download
          </button>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="border-b-2 border-gray-200 pb-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">INVOICE</h1>
                <p className="text-gray-600">#{invoice.invoiceNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Date: {new Date(invoice.date).toLocaleDateString()}</p>
                {invoice.dueDate && (
                  <p className="text-gray-600">Due: {new Date(invoice.dueDate).toLocaleDateString()}</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">From:</h3>
              <div className="text-gray-600 space-y-1">
                {invoice.from.name && <p className="font-medium">{invoice.from.name}</p>}
                {invoice.from.email && <p>{invoice.from.email}</p>}
                {invoice.from.address && <p>{invoice.from.address}</p>}
                {(invoice.from.city || invoice.from.zipCode) && (
                  <p>{invoice.from.city} {invoice.from.zipCode}</p>
                )}
                {invoice.from.country && <p>{invoice.from.country}</p>}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">To:</h3>
              <div className="text-gray-600 space-y-1">
                {invoice.to.name && <p className="font-medium">{invoice.to.name}</p>}
                {invoice.to.email && <p>{invoice.to.email}</p>}
                {invoice.to.address && <p>{invoice.to.address}</p>}
                {(invoice.to.city || invoice.to.zipCode) && (
                  <p>{invoice.to.city} {invoice.to.zipCode}</p>
                )}
                {invoice.to.country && <p>{invoice.to.country}</p>}
              </div>
            </div>
          </div>

          <div className="mb-8 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Qty</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Rate</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4">{item.description}</td>
                    <td className="py-3 px-4 text-center">{item.quantity}</td>
                    <td className="py-3 px-4 text-center">{formatCurrency(item.rate)}</td>
                    <td className="py-3 px-4 text-right">{formatCurrency(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mb-8">
            <div className="w-64">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Tax ({invoice.taxRate}%):</span>
                <span className="font-medium">{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between py-2 text-lg font-bold">
                <span>Total:</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          {(invoice.notes || invoice.terms) && (
            <div className="border-t pt-6">
              {invoice.notes && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Notes:</h4>
                  <p className="text-gray-600 whitespace-pre-wrap">{invoice.notes}</p>
                </div>
              )}
              {invoice.terms && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Terms & Conditions:</h4>
                  <p className="text-gray-600 whitespace-pre-wrap">{invoice.terms}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;