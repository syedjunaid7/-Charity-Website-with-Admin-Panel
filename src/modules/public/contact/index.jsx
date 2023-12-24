import "./styles.scss";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BarLoader from "react-spinners/BarLoader";
import axios from "axios";
import { GlobalValue } from "../../../App";

export default function ContactUs() {
  const { globalApi } = useContext(GlobalValue);
  const [isLoading, setisLoading] = useState(false);

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  useEffect(() => {
    setSendersDate(formattedDate);
  }, []);

  const [sendersName, setSendersName] = useState("");
  const [sendersEmail, setSendersEmail] = useState("");
  const [sendersNunmber, setSendersNunmber] = useState("");
  const [sendersMssg, setSendersMssg] = useState("");
  const [sendersDate, setSendersDate] = useState("");

  const handleUpload = async () => {
    setisLoading(true);
    const formData = new FormData();
    formData.append("act", "enquiryInsert");
    formData.append("sendersName", sendersName);
    formData.append("sendersEmail", sendersEmail);
    formData.append("sendersNunmber", sendersNunmber);
    formData.append("sendersMssg", sendersMssg);
    formData.append("sendersDate", sendersDate);

    try {
      const res = await axios.post(`${globalApi}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Data Send Successfully!");
      if (res.data) {
        setisLoading(false);
        setSendersName("");
        setSendersEmail("");
        setSendersNunmber("");
        setSendersMssg("");
      } else {
        setisLoading(false);
      }
    } catch (error) {
      setisLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleUpload();
  };


  return (
    <section
      className="contact-container content-heading max-width"
      id="/contact"
    >
      <ToastContainer autoClose={500} />
      <h2>Contact Us</h2>
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="Name"
            required
            value={sendersName}
            onChange={(e) => setSendersName(e.target.value)}
          />
          <div style={{ display: "flex", gap: "2rem" }}>
            <div style={{ width: "100%" }}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="E-Mail"
                value={sendersEmail}
                onChange={(e) => setSendersEmail(e.target.value)}
                required
              />
            </div>
            <div style={{ width: "100%" }}>
              <label htmlFor="phone">Phone:</label>
              <input
                type="number"
                id="phone"
                name="phone"
                placeholder="Mobile Number"
                required
                value={sendersNunmber}
                onChange={(e) => setSendersNunmber(e.target.value)}
              />
            </div>
          </div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            type="text"
            placeholder="Enter Your Message"
            required
            value={sendersMssg}
            onChange={(e) => setSendersMssg(e.target.value)}
          />
          <button type="submit">
            {isLoading ? <BarLoader color="#fff" className="loader" /> : "Send"}
          </button>
        </form>
      </div>
    </section>
  );
}
