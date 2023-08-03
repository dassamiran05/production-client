import React from "react";
import avatar1 from "../../assets/img/avaters/avatar1.png";
import avatar2 from "../../assets/img/avaters/avatar2.png";
import avatar3 from "../../assets/img/avaters/avatar3.png";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

// import required modules
import { Pagination } from "swiper/modules";
import { BiSolidQuoteRight } from "react-icons/bi";

const data = [
  {
    name: "Saira Hakim",
    designation: "Local shop owner",
    review:
      "Sed ut perspiciatis unde omnis iste natus error veritatis et quasi architecto beatae vitae dict eaque ipsa quae ab illo inventore Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium",
    image: avatar1,
  },
  {
    name: "David Niph",
    designation: "Local shop owner",
    review:
      "Sed ut perspiciatis unde omnis iste natus error veritatis et quasi architecto beatae vitae dict eaque ipsa quae ab illo inventore Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium",
    image: avatar2,
  },
  {
    name: "Jacob Sikim",
    designation: "Local shop owner",
    review:
      "Sed ut perspiciatis unde omnis iste natus error veritatis et quasi architecto beatae vitae dict eaque ipsa quae ab illo inventore Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium",
    image: avatar3,
  },
];

const Testimonial = () => {
  return (
    <>
      <div className="testimonail-section mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 text-center">
              <div className="testimonial-sliders">
                <Swiper
                  spaceBetween={30}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                  className="mySwiper"
                >
                  {data.map((d, idx) => (
                    <>
                      <SwiperSlide key={idx + 1}>
                        <div className="single-testimonial-slider">
                          <div className="client-avater">
                            <img src={d?.image} alt={d?.name} />
                          </div>
                          <div className="client-meta">
                            <h3>
                              {d?.name} <span>{d?.designation}</span>
                            </h3>
                            <p className="testimonial-body">{d?.review}</p>
                            <div className="last-icon">
                              <BiSolidQuoteRight />
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    </>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
