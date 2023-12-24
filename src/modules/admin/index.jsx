import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./login";
import Sidebar from "./SideBar/SideBar";
import Topbar from "./TopBar/TopBar";
import Dashboard from "./Dashboard/Dashboard";
import Settings from "./AdminSettings/Settings";
import Enquiry from "./enquiry";
import AddVideo from "./addVideo";
import AddEvents from "./addEvents";
import AddNews from "./addNews";
import DonationVerify from "./donationVerify";
import PrivateRoute from "./privateRoute";

export default function Admin() {
  const location = useLocation();
  const showHShowSidebarHeader = (location.pathname || "").includes(
    "/admin/login"
  );
  return (
    <section>
      <div className="admin-container">
        {!showHShowSidebarHeader && <Sidebar />}
        <div className={"admin-inside admin-inside2"}>
          {!showHShowSidebarHeader && <Topbar />}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />{" "}
                </PrivateRoute>
              }
            />
            <Route
              path="change-password"
              element={
                <PrivateRoute>
                  <Settings />{" "}
                </PrivateRoute>
              }
            />
            <Route
              path="enquiry"
              element={
                <PrivateRoute>
                  {" "}
                  <Enquiry />
                </PrivateRoute>
              }
            />
            <Route
              path="add-video"
              element={
                <PrivateRoute>
                  <AddVideo />{" "}
                </PrivateRoute>
              }
            />
            <Route path="add-events" element={<AddEvents />} />
            <Route
              path="add-news"
              element={
                <PrivateRoute>
                  <AddNews />{" "}
                </PrivateRoute>
              }
            />
            <Route
              path="verify"
              element={
                <PrivateRoute>
                  {" "}
                  <DonationVerify />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </section>
  );
}
