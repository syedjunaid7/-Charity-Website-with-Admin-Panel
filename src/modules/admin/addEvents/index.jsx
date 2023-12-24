import { useEffect, useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import deleteIcon from "../../../assets/images/delete.png";
import editIcon from "../../../assets/images/edit.png";
import { Tooltip } from "react-tooltip";

export default function AddEvents() {
  const [isLoading, setisLoading] = useState(false);
  // Date
  const [videoDate, setVideoDate] = useState([]);
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const [gallery_img, setGallery_img] = useState(null);

  useEffect(() => {
    // Get Current Date
    setVideoDate(formattedDate);
  }, []);
  return (
    <div className="inputMainBox">
      <h1 className="admin-heading">
        Add <span style={{ color: "#0ea5e9" }}> Event</span>
      </h1>

      <form className="inputBox">
      {!gallery_img ? <div className="imgRequire">Image Required</div> : null}
      {gallery_img ? (
        <img
          key={gallery_img?.name}
          src={URL.createObjectURL(gallery_img)}
          alt="product Image"
          className="productImg"
          style={{ width: "auto", maxWidth: "10rem", margin: "0 auto" }}
        />
      ) : (
        <p>No Image has set for this Event</p>
      )}
        <span className="btn btn-default btn-file">
          <p>Choose Photo</p>
          <input
            type="file"
            name="gallery_img"
            onChange={(e) => setGallery_img(e.target.files[0])}
            required
          />
        </span>
        <div className="title-dateBox">
          <input
            type="text"
            placeholder="Add Event Title"
            // onChange={(e) => setCurrentPassword(e.target.value)}
            // value={currentPassword}
            required
          />
          <input
            type="date"
            value={videoDate}
            onChange={(e) => setVideoDate(e.target.value)}
          />
        </div>
        <textarea
          type="text"
          placeholder="Add Event Content"
          // value={newPassword}
          // onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <div className="btn-div">
          <button>
            {isLoading ? <BarLoader color="#fff" /> : "Save Details"}
          </button>
          <button>Reset</button>
        </div>
      </form>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Event Title</th>
              <th>Date</th>
              <th>Event Content</th>
              <th>Action Button</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>john@example.com</td>
              <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
              <td className="buttons-td">
                <img
                  src={editIcon}
                  alt="edit"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Edit"
                />
                <img
                  src={deleteIcon}
                  alt="delete"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Delete"
                />
                <Tooltip id="my-tooltip" />
              </td>
            </tr>
            <tr>
              <td>Jane Smith</td>
              <td>jane@example.com</td>
              <td>
                <div className="td-content">
                  Sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.
                </div>
              </td>
              <td className="buttons-td">
                <img
                  src={editIcon}
                  alt="edit"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Edit"
                />
                <img
                  src={deleteIcon}
                  alt="delete"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Delete"
                />
                <Tooltip id="my-tooltip" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
