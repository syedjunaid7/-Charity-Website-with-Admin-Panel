import { useContext, useEffect, useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import deleteIcon from "../../../assets/images/delete.png";
import editIcon from "../../../assets/images/edit.png";
import { Tooltip } from "react-tooltip";
import { GlobalValue } from "../../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function AddNews() {
  const { globalApi } = useContext(GlobalValue);
  const [isLoading, setisLoading] = useState(false);
  // Date
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const [submit_date, setSubmit_date] = useState(formattedDate);

  const [newsData, setNewsData] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setDesc] = useState("");

  useEffect(() => {
    fetchVideoData();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleUpload();
  };
  const handleUpload = async () => {
    setisLoading(true);

    const formData = new FormData();
    formData.append("act", "newsInsert");
    isEdit ? formData.append("news_id", editId) : null;
    formData.append("title", title);
    formData.append("message", message);
    formData.append("submit_date", submit_date);
    try {
      const res = await axios.post(`${globalApi}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await fetchVideoData();
      !isEdit && toast.success("Data Added Successfully!");
      setisLoading(false);
      handleReset();
      isEdit && setEdit(!isEdit);
      isEdit && toast.success("Data Updated Successfully!");
    } catch (error) {
      setisLoading(false);
    }
  };
  const fetchVideoData = async () => {
    const { data, error } = await axios(`${globalApi}/getNews`);
    if (error) {
      toast.error("Error");
    } else {
      setNewsData(data.userdata);
    }
  };

  const [isEdit, setEdit] = useState(false);
  const [editId, setId] = useState();
  const handleEdit = (id) => {
    setEdit(!isEdit);
    setId(id);
    fetchNewsId(id);
    scrollToTop();
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const fetchNewsId = async (id) => {
    try {
      const getVideodata = await fetch(`${globalApi}/getNews/` + id);
      const reVideodata = await getVideodata.json();
      setTitle(reVideodata.title);
      setDesc(reVideodata.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Reset
  const handleReset = () => {
    setTitle("");
    setDesc("");
  };

  const [deleteLoader, setDeleteLoader] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOPen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const handleConfirmation = (index) => {
    setIsConfirmationOPen(!isConfirmationOpen);
    setDeleteId(index);
  };
  const handleDeleteFromDb = async () => {
    setDeleteLoader(!deleteLoader);
    try {
      await axios(`${globalApi}/delNews/` + deleteId);
      await fetchVideoData();
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
        Add <span style={{ color: "#0ea5e9" }}> News</span>
      </h1>

      <form className="inputBox" onSubmit={handleSubmit}>
        <div className="title-dateBox">
          <input
            type="text"
            placeholder="Add News Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
            name="title"
          />
          <input
            type="date"
            value={submit_date}
            onChange={(e) => setSubmit_date(e.target.value)}
            name="submit_date"
          />
        </div>
        <textarea
          type="text"
          placeholder="Add News Description"
          onChange={(e) => setDesc(e.target.value)}
          value={message}
          required
          name="description"
        />
        <div className="btn-div">
          <button>
            {isLoading ? <BarLoader color="#fff" /> : "Save Details"}
          </button>
          <button>Reset</button>
        </div>
      </form>

      <div className="table-container">
        {newsData?.length >= 0 ? (
          newsData ? (
            <table className="custom-table">
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>News Title</th>
                  <th>News Desc</th>
                  <th>Date</th>
                  <th>Action Button</th>
                </tr>
              </thead>
              {newsData?.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="8">
                      <ScaleLoader color="#3b82f6" />
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {newsData?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.message}</td>
                      <td>{item.submit_date}</td>
                      <td className="buttons-td">
                        <img
                          src={editIcon}
                          alt="edit"
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content="Edit"
                          onClick={() => handleEdit(item.id)}
                        />
                        <img
                          src={deleteIcon}
                          alt="delete"
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content="Delete"
                          onClick={() => handleConfirmation(item.id)}
                        />
                        <Tooltip id="my-tooltip" />
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
