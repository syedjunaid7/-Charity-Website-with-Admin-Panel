import { Route, Routes } from "react-router-dom";
import Home from "../../pages/home";

// import { RiArrowUpDoubleFill } from "react-icons/ri";
// import ScrollToTop from "../../hooks/ScrollToTop";
// import { scrollToTopBtn } from "../../hooks/ScrollUtils";
// import watsappLogo from "../../assets/images/watsap.png";

export default function Public() {
  return (
    <>
      {/* <ScrollToTop /> */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>


    </>
  );
}
