import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BarLoader from "react-spinners/BarLoader";
// import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalValue } from "../../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Settings() {
  const { globalApi } = useContext(GlobalValue);
  const [isLoading, setisLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUserId(sessionStorage.getItem("isLoggedIn"));
  }, []);

  const handlePasswordChange = async () => {
    setisLoading(!isLoading);
    if (confirmPassword == newPassword) {
      const changePassowrd = new FormData();
      changePassowrd.append("act", "changePassowrd");
      changePassowrd.append("currentPassword", currentPassword);
      changePassowrd.append("newPassword", newPassword);
      changePassowrd.append("userId", userId);
      try {
        const { data } = await axios.post(`${globalApi}`, changePassowrd);
        if (data.error === "Invalid Current Password, , Please try again !!.") {
          toast.error(`Error: ${data.error}`);
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setisLoading(false);
        } else {
          toast.success("Password Changed Succesfully");
          setTimeout(() => {
            localStorage.setItem("sideBarIndex", 0);
            navigate("/admin/dashboard");
          }, 1500);
        }

        // const isAuthenticated = +data?.login_id;
        // sessionStorage.setItem("isLoggedIn", isAuthenticated);
        // isAuthenticated ? alert() : toast.error("Invalid Credentials!");
      } catch (error) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setisLoading(false);
        toast.error(`Error: ${error.message}`);
      }
    } else {
      toast.error(
        "Confirm Password and New Password does not matched, Please check !!!"
      );
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setisLoading(false);
      navigate("/admin/dashboard");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handlePasswordChange();
  };
  return (
    <div className="inputMainBox">
      <ToastContainer autoClose={500} />
      <h1 className="admin-heading">
        Change <span style={{ color: "#0ea5e9" }}> Your Password</span>
      </h1>
      <form className="inputBox" onSubmit={handleSubmit}>
        <div style={{ width: "100%" }}>
          <p style={{ marginBottom: "0.5rem" }}>Current Password</p>
          <input
            type="password"
            placeholder="Current Password"
            onChange={(e) => setCurrentPassword(e.target.value)}
            value={currentPassword}
            required
            style={{ width: "100%" }}
            name="current password"
          />
        </div>
        <div style={{ width: "100%" }}>
          <p style={{ marginBottom: "0.5rem" }}>New Password</p>
          <input
            type="password"
            placeholder="New Password"
            name="new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ width: "100%" }}>
          <p style={{ marginBottom: "0.5rem" }}>Confirm Password</p>
          <input
            type="password"
            name="confirm password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div className="btn-div">
          <button>
            {isLoading ? <BarLoader color="#fff" /> : "Update Confirm"}
          </button>
        </div>
      </form>
    </div>
  );
}
