/* ==================================================
   KEYAN CORPORATION — DEDICATED CONTACT US JS
   ================================================== */

document.addEventListener('DOMContentLoaded', () => {
  prefillProductQuote();
  prefillAuthenticatedCustomer();
  initContactForm();
});

async function prefillAuthenticatedCustomer() {
  if (!localStorage.getItem('keyan_api_token') || typeof window.keyanApiRequest !== 'function') return;

  try {
    const payload = await window.keyanApiRequest('/auth/me');
    const customer = payload.data || {};
    const nameParts = String(customer.name || '').trim().split(/\s+/).filter(Boolean);
    const fields = {
      cntFirstName: nameParts.shift() || '',
      cntLastName: nameParts.join(' '),
      cntEmail: customer.email || '',
      cntPhone: customer.phone || '',
      cntCompany: customer.company_name || ''
    };

    Object.entries(fields).forEach(([id, value]) => {
      const field = document.getElementById(id);
      if (field && !field.value) field.value = value;
    });
  } catch (error) {
    // The form remains usable if the session has expired or the API is offline.
  }
}

function prefillProductQuote() {
  const subjectField = document.getElementById('cntSubject');
  const messageField = document.getElementById('cntMessage');
  if (!subjectField || !messageField) return;

  const params = new URLSearchParams(window.location.search);
  let quoteRequest = null;

  try {
    const stored = sessionStorage.getItem('keyan_quote_request');
    quoteRequest = stored ? JSON.parse(stored) : null;
  } catch (error) {
    quoteRequest = null;
  }

  // Keep a useful fallback if the user opens a quote URL without session data.
  if (!quoteRequest && params.get('quote') && typeof CATALOG_ITEMS !== 'undefined') {
    const product = CATALOG_ITEMS.find(item => item.id === params.get('quote'));
    if (product) {
      quoteRequest = {
        name: product.name,
        sku: product.sku,
        brand: product.brand,
        category: product.categoryName,
        specs: product.specs
      };
    }
  }

  if (!quoteRequest || !quoteRequest.name) return;

  subjectField.value = `Quote Request: ${quoteRequest.name}`;
  messageField.value = [
    'Hello Keyan Corporation,',
    '',
    'I would like to request a quotation for:',
    `Product: ${quoteRequest.name}`,
    quoteRequest.sku ? `SKU: ${quoteRequest.sku}` : '',
    quoteRequest.brand ? `Brand: ${quoteRequest.brand}` : '',
    quoteRequest.category ? `Category: ${quoteRequest.category}` : '',
    quoteRequest.specs ? `Specifications: ${quoteRequest.specs}` : '',
    '',
    'Please share your best price, availability, lead time, and delivery options.'
  ].filter(Boolean).join('\n');

  document.querySelector('.cnt-form-title')?.replaceChildren(document.createTextNode('Request a Product Quote'));
  const subtitle = document.querySelector('.cnt-form-subtitle');
  if (subtitle) subtitle.textContent = 'Tell us your quantity and delivery requirements. Our team will respond shortly.';
}

function initContactForm() {
  const form = document.getElementById('contactFormMain');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstName = document.getElementById('cntFirstName')?.value.trim() || '';
    const lastName = document.getElementById('cntLastName')?.value.trim() || '';
    const fullName = (firstName + ' ' + lastName).trim() || 'Valued Customer';
    const params = new URLSearchParams(window.location.search);
    const submitButton = form.querySelector('button[type="submit"]');
    const request = {
      product_catalog_id: params.get('quote') && params.get('quote') !== '1' ? params.get('quote') : undefined,
      first_name: firstName,
      last_name: lastName,
      company_name: document.getElementById('cntSubject')?.value.trim() || '',
      email: document.getElementById('cntEmail')?.value.trim() || '',
      phone: document.getElementById('cntPhone')?.value.trim() || '',
      subject: document.getElementById('cntSubject')?.value.trim() || 'Website enquiry',
      message: document.getElementById('cntMessage')?.value.trim() || '',
      source: params.get('quote') ? 'product-card' : 'contact-page'
    };

    // The subject is the enquiry subject, not the company name.
    request.company_name = document.getElementById('cntCompany')?.value.trim() || '';
    if (submitButton) submitButton.disabled = true;

    if (typeof window.keyanApiRequest !== 'function') {
      showToast(`Thank you, ${fullName}! Your message has been received.`);
      sessionStorage.removeItem('keyan_quote_request');
      form.reset();
      if (submitButton) submitButton.disabled = false;
      return;
    }

    window.keyanApiRequest('/quote-requests', {
      method: 'POST',
      body: JSON.stringify(request)
    }).then(payload => {
      const reference = payload.data?.reference ? ` Reference: ${payload.data.reference}.` : '';
      showToast(`Thank you, ${fullName}! Your request has been sent.${reference}`);
      sessionStorage.removeItem('keyan_quote_request');
      form.reset();
    }).catch(error => {
      showToast(error.message || 'We could not send your message. Please try again.');
    }).finally(() => {
      if (submitButton) submitButton.disabled = false;
    });
  });
}
