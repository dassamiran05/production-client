import React from "react";
import Feature from "../feature/Feature";
import { BiSupport } from "react-icons/bi";
import { RiRefundFill } from "react-icons/ri";
import { FaShippingFast } from "react-icons/fa";

const MainFeature = () => {
  return (
    <>
      <div className="list-section pt-80 pb-80">
        <div className="container">
          <div className="row">
            <Feature
              title="Free Shipping"
              desc="When order over $75"
              colClass="col-lg-4 col-md-6 mb-4 mb-lg-0"
              flexClass="list-box d-flex align-items-center"
              icon={<FaShippingFast />}
            />
            <Feature
              title="24/7 Support"
              desc="Get support all day"
              colClass="col-lg-4 col-md-6 mb-4 mb-lg-0"
              flexClass="list-box d-flex align-items-center"
              icon={<BiSupport />}
            />
            <Feature
              title="Refund"
              desc="Get refund within 3 days!"
              colClass="col-lg-4 col-md-6"
              flexClass="list-box d-flex justify-content-start align-items-center"
              icon={<RiRefundFill />}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainFeature;
