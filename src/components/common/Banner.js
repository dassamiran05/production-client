import React from "react";

const Banner = ({ subheading, heading }) => {
  return (
    <>
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <p>{subheading}</p>
                <h1>{heading}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
