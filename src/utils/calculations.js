export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount || 0);
};

export const calculateItemAmount = (quantity, rate) => {
  return (parseFloat(quantity) || 0) * (parseFloat(rate) || 0);
};

export const calculateSubtotal = (items) => {
  return items.reduce((sum, item) => sum + (item.amount || 0), 0);
};

export const calculateTax = (subtotal, taxRate = 0.1) => {
  return subtotal * taxRate;
};

export const calculateTotal = (subtotal, tax) => {
  return subtotal + tax;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString();
};

export const generateInvoiceNumber = () => {
  const timestamp = Date.now();
  return `INV-${timestamp.toString().slice(-6)}`;
};