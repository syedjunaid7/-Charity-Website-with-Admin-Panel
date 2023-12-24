import "./styles.scss";
import Logo from "../../../assets/images/logo.jpeg";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { navData } from "../../../utils/data";
export default function Footer({ handlePayment }) {
  return (
    <footer className="footerContainer">
      <div className="footerContainer max-width">
        <div className="headerMiddle">
          <div>
            <img src={Logo} alt="Logo" className="logo" />
            <div className="contact-box">
              <div style={{ width: "fit-content" }}>
                <h3>ContactUs</h3>
                <hr />
              </div>
              <div className="footer-icon">
                <MdEmail style={{ translate: "0 3.5px", marginRight: "2px" }} />
                <span> jeehelp2002@gmail.com</span>
              </div>
              <div className="footer-icon">
                <BsFillTelephoneFill
                  style={{ translate: "0 3.5px", marginRight: "2px" }}
                />
                <span> +91 983 915 2842</span>
              </div>
              <div className="footer-icon">
                <FaLocationDot
                  style={{ translate: "-0.2rem 3.8px", marginRight: "2px" }}
                />
                <span>
                  SJ/2/204 Sugam Vihar Awas Yojana Kalindipuram ,
                  PRAYGRAJ-212211 (U.P)
                </span>
              </div>
            </div>
          </div>

          <div className="link-box">
            <div style={{ width: "fit-content" }}>
              <h3>Links</h3>
              <hr />
            </div>
            {navData.map((item, id) => (
              <span key={id}>
                <IoIosArrowForward style={{ translate: "0 0.2rem " }} />
                <Link to={item.link} style={{ textTransform: "capitalize" }}>
                  {item.nav}
                </Link>
              </span>
            ))}
            <button style={{ marginTop: "1rem" }} onClick={handlePayment}>
              Donate Now
            </button>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.212909488829!2d81.78422701433234!3d25.431144528411362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3985359a9ac19ec9%3A0xd839ceeb3b83e924!2sWellness%20India!5e0!3m2!1sen!2sin!4v1636956280338!5m2!1sen!2sin"
            width="30%"
            height="240"
            style={{ border: "1" }}
            allowFullScreen
            loading="lazy"
            title="Google Maps"
          ></iframe>
        </div>
      </div>
    </footer>
  );
}
