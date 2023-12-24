import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import logo from "../../../assets/images/logo.jpeg";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { navData } from "../../../utils/data";
import "./styles.scss";

const OFFSET_VALUES = {
  "/about": -80,
  "/news": -30,
  "/contact": -50,
};

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [offsetVal, setOffset] = useState(null);
  const [activeLink, setActiveLink] = useState("/");

  const handleMenuClick = (link) => {
    setMobileMenu(false); // Close mobile menu on link click
    setOffset(OFFSET_VALUES[link] || 0); // Set the offset based on the link clicked
    setActiveLink(link);
  };

  useEffect(() => {
    if (offsetVal === null) {
      setOffset(0);
    }
    sessionStorage.removeItem('isLoggedIn');

  }, [offsetVal]);

  return (
    <nav className="navbar max-width">
      <img src={logo} alt="charity-logo" />
      <ul className={`desktopMenu ${mobileMenu ? "mob-menu" : ""}`}>
        {navData.map((item, id) => (
          <li key={id}>
            <Link
              to={item.link}
              smooth
              duration={500}
              offset={offsetVal}
              onClick={() => handleMenuClick(item.link)}
              className={activeLink === item.link ? "active" : ""}
            >
              {item.nav}
            </Link>
          </li>
        ))}
      </ul>
      <div onClick={() => setMobileMenu(!mobileMenu)} className="ham">
        {mobileMenu ? (
          <RxCross2 className="ham" />
        ) : (
          <RxHamburgerMenu className="ham" />
        )}
      </div>
    </nav>
  );
}
