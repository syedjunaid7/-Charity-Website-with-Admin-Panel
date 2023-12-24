const whatsappLink = () => {
  const phoneNumber = "9839152842";
  const message = "I am Interested";
  const encodedMessage = encodeURIComponent(message);
  const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
  window.open(url, "_blank");
};
export default whatsappLink;
