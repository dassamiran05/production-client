import React from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const VideoSection = () => {
  return (
    <>
      <div className="abt-section mb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="abt-bg d-flex align-items-center justify-content-center">
                <Link
                  to={"https://youtu.be/7LDm72BgRGI"}
                  className="video-play-btn popup-youtube text-center rounded-circle d-block position-relative"
                >
                  <AiOutlinePlayCircle />
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="abt-text">
                <p className="top-sub">Since Year 1999</p>
                <h2>
                  We are <span className="orange-text">Fruitkha</span>
                </h2>
                <p>
                  Etiam vulputate ut augue vel sodales. In sollicitudin neque et
                  massa porttitor vestibulum ac vel nisi. Vestibulum placerat
                  eget dolor sit amet posuere. In ut dolor aliquet, aliquet
                  sapien sed, interdum velit. Nam eu molestie lorem.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Sapiente facilis illo repellat veritatis minus, et labore
                  minima mollitia qui ducimus.
                </p>
                <Link to={"/about"} className="boxed-btn mt-4">
                  know more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoSection;
