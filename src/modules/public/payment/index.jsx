import "./styles.scss";
import slide from "../../../assets/images/banner.jpeg";
import qrcode from "../../../assets/images/qrcode.jpeg";
import { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { GlobalValue } from "../../../App";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BarLoader from "react-spinners/BarLoader";

export default function Payment({ handlePayment }) {
  const { globalApi } = useContext(GlobalValue);
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const [isLoading, setisLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [trans_id, setTransId] = useState("");
  // Blanket-Count
  const [count, setCount] = useState(0);
  const [showBarcode, setBarcode] = useState(false);

  const handleCounter = (item) => {
    if (item === "+") {
      setCount(count + 1);
    } else {
      if (count > 0) {
        setCount(count - 1);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (count === 0) {
      toast.error("Blanket Should not be Zero (0)");
    } else {
      if (trans_id === "") {
        toast.error("Transaction ID or UPI Reference ID is Must !!");
      } else {
        handleUpload();
      }
    }
  };

  const handleUpload = async () => {
    setisLoading(true);

    const formData = new FormData();
    formData.append("act", "donateInsert");
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("address", address);
    formData.append("message", message);
    formData.append("no_blankets", count);
    formData.append("trans_id", trans_id);
    formData.append("submit_date", formattedDate);
    formData.append("amount", count*100);
    try {
      const res = await axios.post(`${globalApi}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Payment Successfully!");
      setisLoading(false);
      handlePayment();
    } catch (error) {
      setisLoading(false);
    }
  };

  return (
    <section className="blur-effect">
      <div className="payment-box">
        <div className="payment-box-inside">
          <RxCross2 className="icon" onClick={handlePayment} />
          <img src={slide} alt="charity-img" className="slideImg" />
          <h3 className="payout">Payout : ₹ {count * 100}</h3>
          <div className="qr-box">
            <button onClick={() => setBarcode(true)}>
              {showBarcode ? "Scan" : "Get"} the QR Code For Payment
            </button>
            {showBarcode && <img src={qrcode} alt="qr" />}
          </div>
          <input
            placeholder="Transaction ID or UPI Reference ID"
            className="input"
            type="text"
            required
            onChange={(e) => setTransId(e.target.value)}
            value={trans_id}
          />
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="header">Donate : Ek Kambal Pyar Bhara</h1>
          <div className="inputs">
            <form className="increase">
              <span>No. Of Blankets : </span>
              <div
                className="value-button"
                id="decrease"
                onClick={() => handleCounter("-")}
                value="Decrease Value"
              >
                -
              </div>
              <input type="number" id="number" value={count} required />
              <div
                className="value-button"
                id="increase"
                onClick={() => handleCounter("+")}
                value="Increase Value"
              >
                +
              </div>
              <p>₹100 = 1 Blanket</p>
            </form>
            <input
              placeholder="Name"
              className="input"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
            <input
              placeholder="Email"
              className="input"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <input
              placeholder="Mobile"
              className="input"
              type="number"
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
              required
            />
            <input
              placeholder="Address"
              className="input"
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              required
            />
            <textarea
              placeholder="Please share a personalized message for the team."
              id="message"
              name="message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              required
            />
            <button className="sigin-btn">
              {isLoading ? (
                <BarLoader color="#fff" className="loader" />
              ) : (
                "Send"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
