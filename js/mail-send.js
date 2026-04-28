
(function(){
  emailjs.init(CONFIG.PUBLIC_KEY);
})();

const form = document.getElementById("contact-form");
const submitBtn = form.querySelector("button");

form.addEventListener("submit", function(e){
  e.preventDefault();

  const formData = new FormData(form);

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
    time: new Date().toLocaleString()
  };

  // 🔒 Disable button + change text
  submitBtn.disabled = true;
  const originalText = submitBtn.innerText;
  submitBtn.innerText = "Sending...";

  // 🔄 SweetAlert loading
  Swal.fire({
    title: 'Sending...',
    text: 'Please wait',
    allowOutsideClick: false,
    background: '#5200b6cc',
    color: '#fff',
    didOpen: () => {
      Swal.showLoading();
    }
  });

  emailjs.send(CONFIG.SERVICE_ID, CONFIG.TEMPLATE_ID, data)
  .then(function(){

    Swal.fire({
      icon: 'success',
      title: 'Message Sent!',
      text: 'Thanks! I’ll get back to you soon.',
      background: '#5200b6cc',
      color: '#ffffff',
      timer: 2500,
      showConfirmButton: false
    });

    form.reset();
  })
  .catch(function(error){

    Swal.fire({
      icon: 'error',
      title: 'Failed!',
      text: 'Something went wrong. Try again.',
      background: '#5200b6cc',
      color: '#ffffff',
      confirmButtonColor: '#ffffff'
    });

    console.log(error);
  })
  .finally(() => {
    // 🔓 Re-enable button + restore text
    submitBtn.disabled = false;
    submitBtn.innerText = originalText;
  });
});
