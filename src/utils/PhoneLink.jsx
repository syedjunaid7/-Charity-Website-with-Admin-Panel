const PhoneLink = () => {
    const handlePhoneClick = () => {
      const phoneNumber = '+919839152842';
      window.location.href = `tel:${phoneNumber}`;
    };
  
    return (
      <span onClick={handlePhoneClick}>
        +91 983-915-2842
      </span>
    );
  };
  
  export default PhoneLink;