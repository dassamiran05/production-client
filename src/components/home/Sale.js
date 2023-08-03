import React from "react";
import { Link } from "react-router-dom";

const Sale = () => {
  return (
    <>
      <section className="shop-banner">
        <div className="container">
          <h3>
            December sale is on! <br /> with big{" "}
            <span className="orange-text">Discount...</span>
          </h3>
          <div className="sale-percent mb-2">
            <span>
              Sale! <br /> Upto
            </span>
            50% <span>off</span>
          </div>
          <Link to={"/products"} className="cart-btn btn-lg">
            Shop Now
          </Link>
        </div>
      </section>
    </>
  );
};

export default Sale;
