import React from "react";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import strawberry from "../../assets/img/a.jpg";
import { useCart } from "../../context/cart";

const CardBanner = ({product}) => {
  const {handleAddToCart} = useCart();
  return (
    <>
      <section className="cart-banner pt-80 pb-80">
        <div className="container">
          <div className="row clearfix">
            {/*Image Column*/}
            <div className="image-column col-lg-6">
              <div className="image">
                <div className="price-box">
                  <div className="inner-price">
                    <span className="price">
                      <strong>30%</strong> <br /> off per kg
                    </span>
                  </div>
                </div>
                <img src={strawberry} alt />
              </div>
            </div>
            {/*Content Column*/}
            <div className="content-column col-lg-6">
              <h3>
                <span className="orange-text">Deal</span> of the month
              </h3>
              <h4>Hikan Strwaberry</h4>
              <div className="text">
                Quisquam minus maiores repudiandae nobis, minima saepe id, fugit
                ullam similique! Beatae, minima quisquam molestias facere ea.
                Perspiciatis unde omnis iste natus error sit voluptatem accusant
              </div>
              {/*Countdown Timer*/}
              <CountDown />
              <button  className="cart-btn mt-3" onClick={() => handleAddToCart(product)}>
                <BsFillCartFill /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CardBanner;
