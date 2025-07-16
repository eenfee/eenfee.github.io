function sopServiceFormSubmit() {
  const msg = document.getElementById("sopServiceMessage");
  msg.innerHTML = `
    <div class="sop-service-alert success">
      <div class="sop-service-alert-icon">✓</div>
      <div class="sop-service-alert-content">
        <h3>Thank you!</h3>
        <p>We'll contact you soon for SOP assistance.</p>
      </div>
    </div>
  `;
  msg.style.display = 'block';
  
  setTimeout(() => {
    msg.querySelector('.sop-service-alert').classList.add('fade-out');
    setTimeout(() => {
      msg.style.display = 'none';
      msg.innerHTML = '';
    }, 300);
  }, 5000);
  
  return true;
}