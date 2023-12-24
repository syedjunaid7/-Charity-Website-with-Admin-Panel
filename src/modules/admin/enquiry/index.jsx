import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BarLoader from "react-spinners/BarLoader";
import ScaleLoader from "react-spinners/ScaleLoader";
import { animateScroll as scroll } from "react-scroll";
import { useContext } from "react";
import { GlobalValue } from "../../../App";

export default function Enquiry() {
  const { globalApi } = useContext(GlobalValue);
  const [userData, setUserData] = useState([]);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOPen] = useState(false);

  const getEnquiry = async () => {
    axios(`${globalApi}/getEnquiry`).then((res) =>
      setUserData(res.data?.userdata)
    );
  };
  useEffect(() => {
    getEnquiry();
    setDeleteLoader(false);
  }, []);

  const [deleteId, setDeleteId] = useState();
  const handleConfirmation = (index) => {
    setIsConfirmationOPen(!isConfirmationOpen);
    setDeleteId(index);
  };
  const handleDeleteFromDb = async () => {
    setDeleteLoader(!deleteLoader);
    try {
      await axios(`${globalApi}/delEnquiry/` + deleteId);
      await getEnquiry();
      setDeleteLoader(false);
      setIsConfirmationOPen(!isConfirmationOpen);
      toast.success("Data Deleted Successfully!");
    } catch (error) {
      console.error("Error deleting from the database: ", error);
    }
  };
  return (
    <div className="inputMainBox">
      <ToastContainer autoClose={500} position="top-center" />

      <h1 className="admin-heading">
        Enquiry <span style={{ color: "#0ea5e9" }}> Section</span>
      </h1>
      
      <div className="table-container">
        {userData?.length >= 0 ? (
          userData ? (
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Enquiry Date</th>
                  <th>Action Button</th>
                </tr>
              </thead>
              {userData.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="8">
                      <ScaleLoader color="#3b82f6" />
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {userData?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.sendersName}</td>
                      <td>{item.sendersEmail}</td>
                      <td>{item.sendersNunmber}</td>
                      <td>{item.sendersMssg}</td>
                      <td>{item.sendersDate}</td>
                      <td>
                        <button onClick={() => handleConfirmation(item.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          ) : (
            <ScaleLoader color="#3b82f6" />
          )
        ) : (
          <p style={{ marginBottom: "1rem", color: "red" }}>
            No Data Added Yet
          </p>
        )}
      </div>

      {isConfirmationOpen && (
        <div
          className={`cnfrm-del-container ${
            !isConfirmationOpen ? null : "open"
          }`}
        >
          <div className="btn-box">
            <div className="btn-box-inside">
              <h2>Confirm Delete ?</h2>
              <div>
                <button
                  style={{
                    background: "#FE0000",
                    color: "white",
                    marginRight: "5px",
                  }}
                  onClick={handleDeleteFromDb}
                >
                  {deleteLoader ? <ScaleLoader /> : "Yes"}
                </button>
                <button
                  style={{
                    background: "#03C988",
                    color: "white",
                    marginLeft: "5px",
                  }}
                  onClick={() => setIsConfirmationOPen(!isConfirmationOpen)}
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
