import { GiPublicSpeaker } from "react-icons/gi";
import { BsFillChatLeftFill } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { GlobalValue } from "../../../App";
import { useNavigate } from "react-router-dom";
import { FiVideo } from "react-icons/fi";

export default function Card() {
  const { globalApi } = useContext(GlobalValue);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          studentsResponse,
          announcementResponse,
          programResponse,
          downloadResponse,
        ] = await Promise.all([
          axios(`${globalApi}/getDonate`),
          axios(`${globalApi}/getNews`),
          axios(`${globalApi}/getEnquiry`),
          axios(`${globalApi}/getVideo`),
        ]);

        const studentsData = studentsResponse.data;
        const announcementData = announcementResponse.data;
        const programData = programResponse.data;
        const downloadData = downloadResponse.data;
        setUserData({
          students: studentsData,
          announcement: announcementData,
          programData: programData,
          downloadData: downloadData,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="cards">
        <div className="card red" onClick={() => navigate("/admin/verify")}>
          <AiOutlineUser style={{ fontSize: "1.9rem" }} />
          <div className="detailsSec">
            <span className="tip">Verification</span>:
            <span className="second-text">
              {userData.students?.userdata?.length
                ? userData.students?.userdata?.length
                : "n/a"}
            </span>
          </div>
        </div>

        <div className="card blue" onClick={() => navigate("/admin/add-news")}>
          <GiPublicSpeaker style={{ fontSize: "1.9rem" }} />
          <div className="detailsSec">
            <span className="tip">News</span>:
            <span className="second-text">
              {userData.announcement?.userdata?.length
                ? userData.announcement?.userdata?.length
                : "n/a"}
            </span>
          </div>
        </div>

        <div className="card green" onClick={() => navigate("/admin/enquiry")}>
          <BsFillChatLeftFill style={{ fontSize: "2.5rem" }} />
          <div className="detailsSec">
            <span className="tip">Enquiry</span>:
            <span className="second-text">
              {userData.programData?.userdata?.length
                ? userData.programData?.userdata?.length
                : "n/a"}
            </span>
          </div>
        </div>

        <div
          className="card red"
          onClick={() => navigate("/admin/add-video")}
          style={{ background: "#D0A2F7" }}
        >
          <FiVideo style={{ fontSize: "2.5rem" }} />
          <div className="detailsSec">
            <span className="tip">Video : </span>
            <span className="second-text">
              {userData.downloadData?.userdata?.length
                ? userData.downloadData?.userdata?.length
                : "n/a"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
