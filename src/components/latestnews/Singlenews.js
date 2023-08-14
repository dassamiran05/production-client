import React from "react";
import { AiFillCalendar, AiOutlineArrowRight } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Singlenews = ({ className, title, description, blogImgClass }) => {
  return (
    <>
      <div className={`col-lg-4 col-md-6 ${className ? className : ""}`}>
        <div className="single-latest-news">
          <a href="single-news.html">
            <div className={`latest-news-bg ${blogImgClass}`} />
          </a>
          <div className="news-text-box">
            <h3>
              <Link to={"#"}>{title}</Link>
            </h3>
            <p className="blog-meta d-flex align-items-center gap-2">
              <span className="author d-flex align-items-center gap-2">
                <FaUserAlt /> Admin
              </span>
              <span className="date d-flex align-items-center gap-2">
                <AiFillCalendar /> 27 December, 2019
              </span>
            </p>
            <p className="excerpt">{description}</p>
            <button className="cart-btn">
              read more <AiOutlineArrowRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Singlenews;
