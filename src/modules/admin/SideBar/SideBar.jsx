import { useContext, useEffect, useState } from "react";
import "./Sidebar.scss";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { MdFactCheck } from "react-icons/md";
import { RiCalendarEventLine } from "react-icons/ri";
import { IoNewspaperOutline } from "react-icons/io5";
import { FiVideo } from "react-icons/fi";
import { BsFillChatLeftFill } from "react-icons/bs";
import { FcSettings } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
const indexFromLocal = localStorage.getItem("sideBarIndex");
const Sidebar = () => {
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    setSelected(indexFromLocal);
    setSelected(1);
  }, []);

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [confirmModal, setConfirmModal] = useState(true);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLandingPage = (confirmation) => {
    if (confirmation) {
      navigate("/");
      localStorage.setItem("isAdminOpen", false);
    } else {
      setConfirmModal(false);
    }
  };

  const handleModal = () => {
    setConfirmModal(!confirmModal);
    setTimeout(() => {
      setConfirmModal(true);
    }, 7000);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.setItem("sideBarIndex", 0);
    handleLandingPage(true);
  };
  return (
    <div className="SideBarcontainer">
      <div style={{ width: isOpen ? "190px" : "70px" }} className="sidebar">
        <div className="top_section">
          <div style={{ display: isOpen ? "block" : "none" }} className="logo">
            Admin Panel
          </div>
          <div className="bars">
            <HiMiniBars3CenterLeft
              onClick={toggle}
              style={{ cursor: "pointer", translate: "0 0.2rem " }}
            />
          </div>
        </div>

        <div>
          <span
            className={selected == 1 ? "menuItem active" : "menuItem "}
            onClick={() => {
              setSelected(1);
              navigate("/admin/dashboard");
            }}
            style={{
              display: isOpen ? "block" : "none",
              fontSize: "0.8rem",
              fontWeight: "600",
              letterSpacing: "0.7px",
            }}
          >
            <MdOutlineSpaceDashboard className="icon"/>
            Dashboard
          </span>
          <span
            className={selected == 2 ? "menuItem active" : "menuItem "}
            onClick={() => {
              setSelected(2);
              navigate("verify");
            }}
            style={{
              display: isOpen ? "block" : "none",
              fontSize: "0.8rem",
              fontWeight: "600",
              letterSpacing: "0.7px",
            }}
          >
            
            <MdFactCheck className="icon" />
            Donation Verify
          </span>
          {/* <span
            className={selected == 3 ? "menuItem active" : "menuItem "}
            onClick={() => {
              setSelected(3);
              navigate("add-events");
            }}
            style={{
              display: isOpen ? "block" : "none",
              fontSize: "0.8rem",
              fontWeight: "600",
              letterSpacing: "0.7px",
            }}
          >
           <RiCalendarEventLine className="icon"/>

            Add Events
          </span> */}
          <span
            className={selected == 4 ? "menuItem active" : "menuItem "}
            onClick={() => {
              setSelected(4);
              navigate("add-news");
            }}
            style={{
              display: isOpen ? "block" : "none",
              fontSize: "0.8rem",
              fontWeight: "600",
              letterSpacing: "0.7px",
            }}
          >
            <IoNewspaperOutline className="icon" />
            Add News
          </span>
          <span
            className={selected == 5 ? "menuItem active" : "menuItem "}
            onClick={() => {
              setSelected(5);
              navigate("add-video");
            }}
            style={{
              display: isOpen ? "block" : "none",
              fontSize: "0.8rem",
              fontWeight: "600",
              letterSpacing: "0.7px",
            }}
          >
            <FiVideo className="icon" />
            Add Videos
          </span>
          <span
            className={selected == 6 ? "menuItem active" : "menuItem "}
            onClick={() => {
              setSelected(6);
              navigate("enquiry");
            }}
            style={{
              display: isOpen ? "block" : "none",
              fontSize: "0.8rem",
              fontWeight: "600",
              letterSpacing: "0.7px",
            }}
          >
            <BsFillChatLeftFill className="icon" />
            Enquiry
          </span>
          <span
            className={selected == 7 ? "menuItem active" : "menuItem "}
            onClick={() => {
              setSelected(7);
              navigate("change-password");
            }}
            style={{
              display: isOpen ? "block" : "none",
              fontSize: "0.8rem",
              fontWeight: "600",
              letterSpacing: "0.7px",
            }}
          >
            <FcSettings className="icon"/>
            Change Password
          </span>
        </div>

        <div className="menuItem" onClick={handleModal}>
          <MdLogout style={{ fontSize: "1.2rem" }} className="logoutIcon" />
          <span
            style={{
              display: isOpen ? "block" : "none",
              fontSize: "0.8rem",
              fontWeight: "600",
              letterSpacing: "0.7px",
            }}
            className="logoutIcon"
          >
            Log Out
          </span>
          <div
            className={`confirm-modal ${confirmModal ? null : "show-modal"}`}
          >
            <h1 style={{ color: "black" }}>Are u sure ?</h1>
            <div className="btn-box">
              <button
                style={{ background: "#FE0000", color: "white" }}
                onClick={handleLogout}
              >
                Yes
              </button>
              <button
                style={{ background: "#03C988", color: "white" }}
                onClick={() => handleLandingPage(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
