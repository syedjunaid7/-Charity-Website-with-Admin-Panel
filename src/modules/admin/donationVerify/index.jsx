import { useContext, useEffect, useState } from "react";
import { GlobalValue } from "../../../App";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function DonationVerify() {
  const { globalApi } = useContext(GlobalValue);
  const [donateData, setDonateData] = useState([]);
  const initialCheckboxes = {};
  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [verifyId, setVerifyId] = useState();

  const fetchDonateData = async () => {
    try {
      const { data } = await axios(`${globalApi}/getDonate`);
      setDonateData(data.userdata || []);
    } catch (error) {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchDonateData();
  }, []);

  const handleCheckboxChange = () => {
    if (verifyId !== undefined && checkboxes[verifyId] !== undefined) {
      const checkboxValue = checkboxes[verifyId];
      handleUpload(checkboxValue);
    }
  };

  const handleUpload = async (checkboxValue) => {
    if (verifyId !== null && checkboxes[verifyId] !== undefined) {
      const formData = new FormData();
      formData.append("act", "donateInsert");
      formData.append("donate_id", verifyId);
      formData.append("verify", checkboxValue); // Use the passed checkbox value
      try {
        const res = await axios.post(`${globalApi}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Verified Successfully!");
        await fetchDonateData();
        setDeleteLoader(false);
        setIsConfirmationOPen(!isConfirmationOpen);
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const [isConfirmationOpen, setIsConfirmationOPen] = useState(false);

  const handleConfirmation = (index) => {
    setIsConfirmationOPen(!isConfirmationOpen);
    setVerifyId(index);

    // Update the checkboxes state when a checkbox is clicked
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [index]: !prevCheckboxes[index],
    }));
  };

  const handleNo = () => {
    setIsConfirmationOPen(!isConfirmationOpen);
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [verifyId]: !prevCheckboxes[verifyId],
    }));
  };

  return (
    <div className="inputMainBox">
      <ToastContainer autoClose={1000} position="top-center" />

      <h1 className="admin-heading">
        Donation <span style={{ color: "#0ea5e9" }}> Verification</span>
      </h1>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Adress</th>
              <th>Message</th>
              <th>No. Of Blankets</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Verify</th>
            </tr>
          </thead>
          <tbody>
            {donateData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.mobile}</td>
                <td>{item.address}</td>
                <td>{item.message}</td>
                <td>{item.no_blankets}</td>
                <td>₹ {item.amount}</td>
                <td>{item.trans_id}</td>
                <td
                  className="checkbox-td"
                  style={{ pointerEvents: +item.verify ? "none" : "auto" }}
                >
                  <label className="container">
                    <input
                      type="checkbox"
                      checked={+item.verify ? true : false}
                      onChange={() => handleConfirmation(item.id)}
                    />

                    <div className="checkmark"></div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isConfirmationOpen && (
        <div
          className={`cnfrm-del-container ${isConfirmationOpen ? "open" : ""}`}
        >
          <div className="btn-box">
            <div className="btn-box-inside">
              <h2>Verify Confirmation ?</h2>
              <div>
                <button
                  style={{
                    background: "#FE0000",
                    color: "white",
                    marginRight: "5px",
                  }}
                  onClick={handleCheckboxChange}
                >
                  {deleteLoader ? <ScaleLoader /> : "Yes"}
                </button>
                <button
                  style={{
                    background: "#03C988",
                    color: "white",
                    marginLeft: "5px",
                  }}
                  onClick={handleNo}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
