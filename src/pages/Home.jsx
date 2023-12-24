import { useContext } from "react";
import About from "../modules/public/about";
import ContactUs from "../modules/public/contact";
import Events from "../modules/public/events";
import Footer from "../modules/public/footer";
import FooterEnd from "../modules/public/footer/FooterEnd";
import Hero from "../modules/public/hero";
import Navbar from "../modules/public/navbar";
import News from "../modules/public/news";
import Payment from "../modules/public/payment";
import Topbar from "../modules/public/topbar";
import { GlobalValue } from "../App";
import whatsappLink from "../utils/WatsappLink";
import watsappLogo from "../assets/images/watsap.png";
export default function Home() {
  const { togglePayment, handlePayment } = useContext(GlobalValue);

  return (
    <section>
      <Topbar />
      <Navbar />
      <Hero handlePayment={handlePayment} />
      <About handlePayment={handlePayment} />
      <Events />
      <News />
      <ContactUs />
      <Footer handlePayment={handlePayment} />
      <FooterEnd />
      {togglePayment && (
        <Payment handlePayment={handlePayment} togglePayment={togglePayment} />
      )}
      <img
        src={watsappLogo}
        alt="watsapp-logo"
        className="watsapp"
        onClick={whatsappLink}
      />
    </section>
  );
}
