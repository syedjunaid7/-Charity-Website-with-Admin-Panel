import "./styles.scss";
import banner2 from "../../../assets/images/banner2.jpeg";

export default function About({ handlePayment }) {
  return (
    <section>
      <div className="about-sec max-width content-heading" id="/about">
        <div className="img-box">
          <img src={banner2} alt="donation-banner" />
        </div>
        <div className="about-content">
          <h2>About Ek Kambal</h2>
          <p>
            आपका एक कंबल किसी की नींद को सुकून में बदल सकता है। कंबल का एक दान
            सिर्फ गर्मी ही नहीं है,यह एक जीवन रेखा है. यह आशा है कि कोई ना कोई,
            कहीं ना कहीं,परवाह करता है,करुणा के इस कार्य में हमारे साथ शामिल
            हो,आइए जरूरतमंदों के चारों ओर अपना कंबल लपेटे, आज एक कंबल दान करें
            और अंधेरे ठंडी रातों को गर्म और आराम से रोशन करने में हमारी मदद
            करें!
          </p>
          <button onClick={handlePayment}>Donate Now</button>
        </div>
      </div>
    </section>
  );
}
