import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../context/cart";
import { Badge } from "antd";
import { BsFillCartFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import {
  AiFillCalendar,
  AiOutlineArrowRight,
  AiOutlineReload,
} from "react-icons/ai";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper/modules";

import bg1 from "../assets/img/bg/bg-1.jpg";
import bg2 from "../assets/img/bg/bg-2.jpg";
import bg3 from "../assets/img/bg/bg-3.jpg";
import bg4 from "../assets/img/bg/bg-4.jpg";
import bg5 from "../assets/img/bg/bg-5.jpg";
import MainFeature from "../components/home/MainFeature";
import Testimonial from "../components/home/Testimonial";
import VideoSection from "../components/home/VideoSection";
import Sale from "../components/home/Sale";
import useCategory from "../hooks/useCategory";
import CardBanner from "../components/home/CardBanner";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Spinner from "../components/spinner/Spinner";
import Img from "../components/lazyloadimage/Img";
import useTotal from "../hooks/useTotal";
import VideoPopup from "../components/videopopup/VideoPopup";
import Latestnews from "../components/latestnews/Latestnews";
const animatedComponents = makeAnimated();

const HomePage = () => {
  const { handleAddToCart } = useCart();
  const categories = useCategory();
  const total = useTotal();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filtercategory, setFilterCategory] = useState([]);
  const dealProduct = products[0];
  const [show, setShow] = useState(false);
  const backimgs = [bg1, bg2, bg3, bg4, bg5];
  const [background, setBackground] = useState(backimgs);
  const [filterProducts, setFilterProducts] = useState([]);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    // if (page === 1) return;
    if (page > 1) {
      loadMore();
    }
  }, [page]);

  useEffect(() => {
    if (!filtercategory?.length) getAllProducts();
  }, [filtercategory?.length]);

  useEffect(() => {
    if (filtercategory?.length) handleFilter();
  }, [filtercategory?.length]);

  const loadMore = async (e) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handlecategoryName = (id) => {
    return categories.find((category) => category?._id === id)?.name;
  };

  const handleCategory = (selectedItems) => {
    const category_ids = selectedItems.map((item) => item?._id);
    setFilterCategory(category_ids);
  };

  const handleFilter = async () => {
    let filterOption = { checked: filtercategory };
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        filterOption
      );
      if (data?.products) {
        setFilterProducts(data?.products);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout title="Home - Ecommerce app">
      <div>
        <div className="container-fluid m-0 p-0">
          <div className="row m-0">
            <div className="col-12 p-0 m-0">
              <div className="hero-area  d-flex align-items-center justify-content-center position-relative">
                <Swiper
                  modules={[Navigation, Pagination, EffectFade, Autoplay]}
                  effect="fade"
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  spaceBetween={30}
                  centeredSlides={true}
                  className="mySwiper"
                  loop={true}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                >
                  {background.map((bckimg, idx) => (
                    <>
                      <SwiperSlide key={idx} className="me-0">
                        <div className="position-absolute start-0 top-0 bottom-0 w-100 h-100 homeopacitylayer">
                          <img
                            src={bckimg}
                            alt=""
                            className="w-100 h-100"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        {/* <div className="container"> */}
                        {/* <div className="row d-flex justify-content-center"> */}
                        {/* <div className="col-lg-9 text-center"> */}
                        <div className="hero-text position-relative z-5 w-75 m-auto">
                          <div className="hero-text-tablecell text-center">
                            <p className="subtitle">Fresh &amp; Organic</p>
                            <h1>Delicious Seasonal Fruits</h1>
                            <div className="hero-btns">
                              <Link to="/products" className="boxed-btn">
                                Collection
                              </Link>
                              <Link to="/contact" className="bordered-btn">
                                Contact Us
                              </Link>
                            </div>
                          </div>
                        </div>
                        {/* </div> */}
                        {/* </div> */}
                        {/* </div> */}
                      </SwiperSlide>
                    </>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>

        <MainFeature />
        <div className="product-section mt-80 mb-80">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <div className="section-title">
                  <h3>
                    <span className="orange-text">Our</span> Products
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aliquid, fuga quas itaque eveniet beatae optio.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 d-flex align-items-center justify-content-center justify-content-md-end">
                <Select
                  name="category"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option._id}
                  isMulti
                  options={categories}
                  placeholder="Select categories"
                  className="react-select-container mb-3"
                  classNamePrefix="react-select"
                  onChange={handleCategory}
                />
              </div>
              {loading && <Spinner initial={true} />}
              {!loading && (
                <>
                  {filtercategory?.length > 0 && (
                    <>
                      <div className="row pe-0">
                        {/* {products
                          ?.filter((p) => filtercategory.includes(p?.category))
                          .map((p, indx) => ( */}
                        {filterProducts.map((p, indx) => (
                          <div
                            className="col-lg-4 col-md-6 text-center"
                            key={indx + 1}
                          >
                            <div className="single-product-item">
                              <Badge.Ribbon
                                text={handlecategoryName(p?.category)}
                                color="#f28123"
                              >
                                <div className="product-image ">
                                  <Link to={`/product/${p.slug}`}>
                                    <Img
                                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                      className="w-100 rounded mb-3"
                                    />
                                  </Link>
                                </div>
                              </Badge.Ribbon>
                              <h3>{p?.name}</h3>
                              <p className="product-price">${p?.price} </p>
                              <button
                                className="cart-btn"
                                onClick={() => handleAddToCart(p)}
                              >
                                <BsFillCartFill /> Add to Cart
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {filtercategory?.length === 0 && (
                    <>
                      <div className="row pe-0">
                        {products?.map((p, indx) => (
                          <div
                            className="col-lg-4 col-md-6 text-center"
                            key={indx + 1}
                          >
                            <div className="single-product-item">
                              <Badge.Ribbon
                                text={handlecategoryName(p?.category)}
                                color="#f28123"
                              >
                                <div className="product-image ">
                                  <Link to={`/product/${p.slug}`}>
                                    <Img
                                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                      className="w-100 rounded mb-3"
                                    />
                                  </Link>
                                </div>
                              </Badge.Ribbon>
                              <h3>{p?.name}</h3>
                              <p className="product-price">${p?.price} </p>
                              <button
                                className="cart-btn"
                                onClick={() => handleAddToCart(p)}
                              >
                                <BsFillCartFill /> Add to Cart
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}

              <div className="d-flex align-items-center justify-content-center">
                {products && !filterProducts?.length && products?.length < total && (
                  <button
                    className="text-white cart-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((prev) => prev + 1);
                    }}
                  >
                    {loading ? (
                      "Loading ..."
                    ) : (
                      <>
                        {" "}
                        Loadmore <AiOutlineReload />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <CardBanner product={dealProduct} />
        <Testimonial />
        <VideoSection setShow={setShow} />
        <Sale />
        <Latestnews />
      </div>
      <VideoPopup show={show} setShow={setShow} />
    </Layout>
  );
};

export default HomePage;
