
(function(){
  emailjs.init(CONFIG.PUBLIC_KEY); // 🔑 paste from EmailJS
})();

document.getElementById("contact-form")
.addEventListener("submit", function(e){
  e.preventDefault();
const formData = new FormData(e.target);
  // get values
   const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
    time: new Date().toLocaleString()
  };

  // send email
  emailjs.send(CONFIG.SERVICE_ID, CONFIG.TEMPLATE_ID, data)
  .then(function(){
    alert("✅ Message sent successfully!");
    document.getElementById("contact-form").reset();
  })
  .catch(function(error){
    alert("❌ Failed to send message");
    console.log(error);
  });
});
