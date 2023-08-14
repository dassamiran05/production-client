import React from "react";
import Singlenews from "./Singlenews";

const Latestnews = () => {
  return (
    <>
      <div className="latest-news pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="section-title">
                <h3>
                  <span className="orange-text">Our</span> News
                </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Aliquid, fuga quas itaque eveniet beatae optio.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <Singlenews
              blogImgClass="news-bg-1"
              title="You will vainly look for fruit on it in autumn."
              description="Vivamus lacus enim, pulvinar vel nulla sed, scelerisque
                    rhoncus nisi. Praesent vitae mattis nunc, egestas viverra
                    eros."
            />
            <Singlenews
              blogImgClass="news-bg-2"
              title="A man's worth has its season, like tomato."
              description="Vivamus lacus enim, pulvinar vel nulla sed, scelerisque
              rhoncus nisi. Praesent vitae mattis nunc, egestas viverra
              eros."
            />
            <Singlenews
              className="offset-md-3 offset-lg-0"
              blogImgClass="news-bg-3"
              title="Good thoughts bear good fresh juicy fruit."
              description="Vivamus lacus enim, pulvinar vel nulla sed, scelerisque
              rhoncus nisi. Praesent vitae mattis nunc, egestas viverra
              eros."
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Latestnews;
