import { useEffect, useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import deleteIcon from "../../../assets/images/delete.png";
import editIcon from "../../../assets/images/edit.png";
import { Tooltip } from "react-tooltip";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import { GlobalValue } from "../../../App";
import { useContext } from "react";

export default function AddVideo() {
  const { globalApi } = useContext(GlobalValue);
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const [isLoading, setisLoading] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [video_title, setVideo_title] = useState("");
  const [video_link, setVideo_link] = useState("");
  const [video_date, setVideo_date] = useState("");
  const [isEdit, setEdit] = useState(false);
  const [editId, setId] = useState();

  const handleUpload = async () => {
    setisLoading(true);

    const formData = new FormData();
    formData.append("act", "videoInsert");
    isEdit ? formData.append("video_id", editId) : null;
    formData.append("video_title", video_title);
    formData.append("video_link", video_link);
    formData.append("video_date", video_date);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleUpload();
  };
  const handleEdit = (id) => {
    setEdit(!isEdit);
    setId(id);
    fetchVideoId(id);
    scrollToTop();
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleReset = () => {
    setVideo_title("");
    setVideo_link("");
  };

  //To Get Data
  useEffect(() => {
    fetchVideoData();

    // Get Current Date
    setVideo_date(formattedDate);
  }, []);

  const fetchVideoId = async (id) => {
    try {
      const getVideodata = await fetch(`${globalApi}/getVideo/` + id);
      const reVideodata = await getVideodata.json();
      setVideo_title(reVideodata.video_title);
      setVideo_link(reVideodata.video_link);
      setVideo_date(reVideodata.video_date);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchVideoData = async () => {
    const { data, error } = await axios(`${globalApi}/getVideo`);
    if (error) {
      toast.error("Error");
    } else {
      setTableData(data.userdata);
    }
  };

  //Delete
  const [isConfirmationOpen, setIsConfirmationOPen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const handleConfirmation = (index) => {
    setIsConfirmationOPen(!isConfirmationOpen);
    setDeleteId(index);
  };
  const handleDeleteFromDb = async () => {
    setDeleteLoader(!deleteLoader);
    try {
      await axios(`${globalApi}/delVideo/` + deleteId);
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
        Add <span style={{ color: "#0ea5e9" }}> Videos</span>
      </h1>

      <form className="inputBox" onSubmit={handleSubmit}>
        <div className="title-dateBox">
          <input
            type="text"
            placeholder="Add Video Title"
            onChange={(e) => setVideo_title(e.target.value)}
            value={video_title}
            required
          />
          <input
            type="date"
            value={video_date}
            onChange={(e) => setVideo_date(e.target.value)}
          />
        </div>
        <input
          type="text"
          placeholder="Add Video Link"
          value={video_link}
          onChange={(e) => setVideo_link(e.target.value)}
          style={{ width: "100%" }}
          required
        />
        <div className="btn-div">
          <button>
            {isLoading ? (
              <BarLoader color="#fff" className="loader" />
            ) : isEdit ? (
              "Update Details"
            ) : (
              "Save Details"
            )}
          </button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </form>

      <div className="table-container">
        {tableData?.length >= 0 ? (
          tableData ? (
            <table className="custom-table">
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Video</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Action Button</th>
                </tr>
              </thead>
              {tableData.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="8">
                      <ScaleLoader color="#3b82f6" />
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {tableData?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td
                        dangerouslySetInnerHTML={{
                          __html: item.video_link
                            .replace(/width="(\d+)"/, 'width="250"')
                            .replace(/height="(\d+)"/, 'height="100"'),
                        }}
                      />
                      <td>{item.video_title}</td>
                      <td>{item.video_date}</td>
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
