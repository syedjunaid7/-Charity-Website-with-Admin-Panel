import "./styles.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { eventsData } from "../../../utils/data";
export default function Events() {
  return (
    <section>
      <div className="event-container max-width content-heading" id="/events">
        <h2 style={{ textAlign: "center", textTransform : "capitalize" }}>Boost our mission by providing your support</h2>
        <Swiper
          slidesPerView={3}
          spaceBetween={50}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 7000,
          }}
          loop={true}
          className="mySwiper"
          breakpoints={{
            "@0.00": {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            "@0.75": {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            "@1.00": {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
        >
          {eventsData?.map((item, id) => (
            <SwiperSlide key={id}>
              <div className="card">
                <img src={`${item.img}`} alt={item.title} />
                <div className="card-content">
                  <h3>{item.title}</h3>
                  <p style={{ color: "#ee4c20", textAlign: "center" }}>
                    {item.date}
                  </p>
                  <p>{item.content}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
