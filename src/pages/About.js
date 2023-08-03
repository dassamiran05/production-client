import React from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { ImPriceTag } from "react-icons/im";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import Banner from "../components/common/Banner";

const About = () => {
  return (
    <Layout title="About us - Ecommerce app">
      <div>
        <Banner subheading="lorem ipsum lorem" heading="About Us" />
        <div className="feature-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-12 ">
                <div className="featured-text">
                  <h2 className="pb-3">
                    Why <span className="orange-text">Lorem ipsum</span>
                  </h2>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 mb-4 mb-md-5">
                      <div className="list-box d-flex">
                        <div className="list-icon">
                          <AiFillHome />
                        </div>
                        <div className="content">
                          <h3>Home Delivery</h3>
                          <p>
                            sit voluptatem accusantium dolore mque laudantium,
                            totam rem aperiam, eaque ipsa quae ab illo.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 mb-5 mb-md-5">
                      <div className="list-box d-flex">
                        <div className="list-icon">
                          <ImPriceTag />
                        </div>
                        <div className="content">
                          <h3>Best Price</h3>
                          <p>
                            sit voluptatem accusantium dolore mque laudantium,
                            totam rem aperiam, eaque ipsa quae ab illo.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 mb-5 mb-md-5">
                      <div className="list-box d-flex">
                        <div className="list-icon">
                          <AiFillHome />
                        </div>
                        <div className="content">
                          <h3>Custom Box</h3>
                          <p>
                            sit voluptatem accusantium dolore mque laudantium,
                            totam rem aperiam, eaque ipsa quae ab illo.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="list-box d-flex">
                        <div className="list-icon">
                          <ImPriceTag />
                        </div>
                        <div className="content">
                          <h3>Quick Refund</h3>
                          <p>
                            sit voluptatem accusantium dolore mque laudantium,
                            totam rem aperiam, eaque ipsa quae ab illo.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-12 d-flex align-items-center justify-content-center img-sec">
                <div className="image-section">
                  {/* <img src="../assets/images/feature-bg.jpg" alt="" className='w-100 h-100 object-fit-cover' /> */}
                  {/* <div className="team-bg team-bg-1" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="shop-banner">
          <div className="container">
            <h3>
              December sale is on! <br /> with big{" "}
              <span className="orange-text">Discount...</span>
            </h3>
            <div className="sale-percent">
              <span>
                Sale! <br /> Upto
              </span>
              50% <span>off</span>
            </div>
            <Link to="#" className="cart-btn btn-lg">
              Shop Now
            </Link>
          </div>
        </section>
        <div className="mt-80">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <div className="section-title">
                  <h3>
                    Our <span className="orange-text">Team</span>
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aliquid, fuga quas itaque eveniet beatae optio.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="single-team-item">
                  <div className="team-bg team-bg-1" />
                  <h4>
                    Jimmy Doe <span>Farmer</span>
                  </h4>
                  <ul className="social-link-team">
                    <li>
                      <Link to="#">
                        <FaFacebookF />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <FaLinkedinIn />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <FaInstagram />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="single-team-item">
                  <div className="team-bg team-bg-2" />
                  <h4>
                    Marry Doe <span>Farmer</span>
                  </h4>
                  <ul className="social-link-team">
                    <li>
                      <Link to="#">
                        <FaFacebookF />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <FaLinkedinIn />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <FaInstagram />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 offset-md-3 offset-lg-0">
                <div className="single-team-item">
                  <div className="team-bg team-bg-3" />
                  <h4>
                    Simon Joe <span>Farmer</span>
                  </h4>
                  <ul className="social-link-team">
                    <li>
                      <Link to="#">
                        <FaFacebookF />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <FaLinkedinIn />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <FaInstagram />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
