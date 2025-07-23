import React from 'react';
import { Plus, Trash2, Eye } from 'lucide-react';
import { formatCurrency, calculateItemAmount, calculateSubtotal, calculateTax, calculateTotal } from '../utils/calculations';

const InvoiceForm = ({ invoice, setInvoice, onPreview }) => {
  const updateInvoiceField = (field, value) => {
    setInvoice(prev => ({ ...prev, [field]: value }));
  };

  const updateFromField = (field, value) => {
    setInvoice(prev => ({
      ...prev,
      from: { ...prev.from, [field]: value }
    }));
  };

  const updateToField = (field, value) => {
    setInvoice(prev => ({
      ...prev,
      to: { ...prev.to, [field]: value }
    }));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...invoice.items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    if (field === 'quantity' || field === 'rate') {
      const quantity = field === 'quantity' ? parseFloat(value) || 0 : newItems[index].quantity;
      const rate = field === 'rate' ? parseFloat(value) || 0 : newItems[index].rate;
      newItems[index].amount = calculateItemAmount(quantity, rate);
    }
    
    setInvoice(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, rate: 0, amount: 0 }]
    }));
  };

  const removeItem = (index) => {
    if (invoice.items.length > 1) {
      setInvoice(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  const subtotal = calculateSubtotal(invoice.items);
  const tax = calculateTax(subtotal, invoice.taxRate / 100);
  const total = calculateTotal(subtotal, tax);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Invoice Generator</h1>
            <button
              onClick={onPreview}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Eye size={16} />
              Preview
            </button>
          </div>

          {/* Invoice Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Invoice Number
              </label>
              <input
                type="text"
                value={invoice.invoiceNumber}
                onChange={(e) => updateInvoiceField('invoiceNumber', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue Date
              </label>
              <input
                type="date"
                value={invoice.date}
                onChange={(e) => updateInvoiceField('date', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={invoice.dueDate}
                onChange={(e) => updateInvoiceField('dueDate', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* From/To Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">From (Your Details)</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name/Company"
                  value={invoice.from.name}
                  onChange={(e) => updateFromField('name', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={invoice.from.email}
                  onChange={(e) => updateFromField('email', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={invoice.from.address}
                  onChange={(e) => updateFromField('address', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="City"
                    value={invoice.from.city}
                    onChange={(e) => updateFromField('city', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Zip Code"
                    value={invoice.from.zipCode}
                    onChange={(e) => updateFromField('zipCode', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Country"
                  value={invoice.from.country}
                  onChange={(e) => updateFromField('country', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">To (Client Details)</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Client Name/Company"
                  value={invoice.to.name}
                  onChange={(e) => updateToField('name', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="client@email.com"
                  value={invoice.to.email}
                  onChange={(e) => updateToField('email', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={invoice.to.address}
                  onChange={(e) => updateToField('address', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="City"
                    value={invoice.to.city}
                    onChange={(e) => updateToField('city', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Zip Code"
                    value={invoice.to.zipCode}
                    onChange={(e) => updateToField('zipCode', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Country"
                  value={invoice.to.country}
                  onChange={(e) => updateToField('country', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Invoice Items</h3>
              <button
                onClick={addItem}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Plus size={16} />
                Add Item
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <div className="min-w-full space-y-3">
                {invoice.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-3 items-center bg-white p-3 border rounded">
                    <div className="col-span-12 md:col-span-5">
                      <input
                        type="text"
                        placeholder="Item description"
                        value={item.description}
                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="col-span-4 md:col-span-2">
                      <input
                        type="number"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="col-span-4 md:col-span-2">
                      <input
                        type="number"
                        placeholder="Rate"
                        value={item.rate}
                        onChange={(e) => updateItem(index, 'rate', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="col-span-3 md:col-span-2">
                      <div className="p-2 bg-gray-100 rounded text-center font-medium text-sm">
                        {formatCurrency(item.amount)}
                      </div>
                    </div>
                    <div className="col-span-1 md:col-span-1">
                      <button
                        onClick={() => removeItem(index)}
                        className="text-red-500 hover:text-red-700 p-1 w-full flex justify-center"
                        disabled={invoice.items.length === 1}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tax Rate */}
            <div className="mt-4 flex justify-end">
              <div className="w-48">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  value={invoice.taxRate}
                  onChange={(e) => updateInvoiceField('taxRate', parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
            </div>

            {/* Totals */}
            <div className="mt-6 flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-medium">Subtotal:</span>
                  <span className="font-bold">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-medium">Tax ({invoice.taxRate}%):</span>
                  <span className="font-bold">{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded border-2 border-blue-200">
                  <span className="font-bold text-blue-700">Total:</span>
                  <span className="font-bold text-blue-700 text-lg">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes and Terms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={invoice.notes}
                onChange={(e) => updateInvoiceField('notes', e.target.value)}
                placeholder="Additional notes..."
                rows="4"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Terms & Conditions
              </label>
              <textarea
                value={invoice.terms}
                onChange={(e) => updateInvoiceField('terms', e.target.value)}
                placeholder="Payment terms and conditions..."
                rows="4"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;