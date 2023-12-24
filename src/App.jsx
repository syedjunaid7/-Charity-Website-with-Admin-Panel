import "./App.css";
import "./assets/styles/GlobalStyles.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Admin, Public } from "./modules";
// import Public from "./modules/public";
// import { useEffect } from "react";
// import Aos from "aos";
// import 'aos/dist/aos.css'
import { createContext, useEffect, useState } from "react";

export const GlobalValue = createContext();
function App() {
  const [togglePayment, setPayment] = useState(false);
  const handlePayment = () => {
    setPayment(!togglePayment);
  };
  useEffect(() => {
    if (togglePayment) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [togglePayment]);
  const globalApi = "https://bodhicharity.org/php_api.php";

  // useEffect(()  => {
  //   Aos.init({duration : 900});
  // })
  return (
    <>
      <GlobalValue.Provider value={{ togglePayment, handlePayment ,globalApi}}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Public />} />
            <Route path="/admin/*" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </GlobalValue.Provider>
    </>
  );
}

export default App;
