/* ==================================================
   KEYAN CORPORATION — DEDICATED CONTACT US JS
   ================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById('contactFormMain');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstName = document.getElementById('cntFirstName')?.value.trim() || '';
    const lastName = document.getElementById('cntLastName')?.value.trim() || '';
    const fullName = (firstName + ' ' + lastName).trim() || 'Valued Customer';

    if (typeof showToast === 'function') {
      showToast(`Thank you, ${fullName}! Your message has been sent to Keyan Operations Desk.`);
    } else {
      alert(`Thank you, ${fullName}! Your message has been sent.`);
    }
    form.reset();
  });
}

