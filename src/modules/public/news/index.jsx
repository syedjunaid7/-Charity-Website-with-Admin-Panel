import "./styles.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Mousewheel, Pagination, Autoplay } from "swiper/modules";
import logo from "../../../assets/images/logo.jpeg";
import banner from "../../../assets/images/banner.jpeg";
import axios from "axios";
import { GlobalValue } from "../../../App";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function News() {
  const { globalApi } = useContext(GlobalValue);
  const [userData, setUserData] = useState([]);

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
    <section className="event-box content-heading max-width" id="/news">
      <div className="newsBox">
        <div className="media-box">
          <div className="media-swiper-box">
            <h2 style={{ textAlign: "center" }}>News</h2>
            <Swiper
              direction={"horizontal"}
              slidesPerView={1}
              spaceBetween={20}
              mousewheel={true}
              autoplay={{
                delay: 2000,
              }}
              modules={[Mousewheel, Pagination, Autoplay]}
              className="mySwiper"
            >
              {userData.announcement?.userdata?.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="notice-card">
                    <div className="notice-details">
                      <h3>{item.title}</h3>
                      <a>{item.message}</a>
                      <br />
                      {/* <span>{item.submit_date}</span> */}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="media-swiper-box">
            <h2 style={{ textAlign: "center" }}>Event</h2>

            <Swiper
              direction={"horizontal"}
              slidesPerView={1}
              spaceBetween={20}
              mousewheel={true}
              autoplay={{
                delay: 2000,
              }}
              modules={[Mousewheel, Pagination, Autoplay]}
              className="mySwiper"
            >
              {userData.downloadData?.userdata?.map((item, id) => (
                <SwiperSlide key={id}>
                  {item.video_link && (
                    <div className="video-card" style={{ margin: "0 auto" }}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.video_link
                            .replace(/height="\d+"/, 'height="100%"')
                            .replace(/width="\d+"/, 'width="100%"'),
                        }}
                      />
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
