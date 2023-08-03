import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
import { Badge, Card } from "antd";
import { BsFillCartFill } from "react-icons/bs";
// import { BiSupport } from "react-icons/bi";
// import { RiRefundFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import {
  AiFillCalendar,
  AiOutlineArrowRight,
  // AiOutlinePlayCircle,
  AiOutlineReload,
} from "react-icons/ai";
import MainFeature from "../components/home/MainFeature";
import { Select } from "antd";
import Testimonial from "../components/home/Testimonial";
import VideoSection from "../components/home/VideoSection";
import Sale from "../components/home/Sale";
import useCategory from "../hooks/useCategory";
import CardBanner from "../components/home/CardBanner";
const { Option } = Select;

const HomePage = () => {
  // const [auth, setAuth] = useAuth();
  const {cart, setCart, handleAddToCart} = useCart();
  const categories = useCategory();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");

  //get products
  // const getAllProducts = async () => {
  //   try {
  //     setLoading(true);
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API}/api/v1/product/get-product`
  //     );
  //     setLoading(false);
  //     setProducts(data?.products);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  useEffect(() => {
    getAllProducts();
    // getAllCategory();
    getTotal();
  }, []);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
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
    return categories.find((category) => category._id === id)?.name;
  };

  return (
    <Layout title="Home - Ecommerce app">
      <div>
        <div className="hero-area hero-bg d-flex align-items-center justify-content-center position-relative">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-9 text-center">
                <div className="hero-text">
                  <div className="hero-text-tablecell">
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
              <div className="d-flex align-items-center justify-content-center justify-content-md-end">
                <Select
                  bordered={false}
                  placeholder="Select a Category"
                  size="small"
                  showSearch
                  allowClear
                  className="form-select w-25 mb-3"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                  value={category}
                >
                  {categories?.map((c) => (
                    <Option key={c?._id} value={c?._id}>
                      {c?.name}
                    </Option>
                  ))}
                </Select>
              </div>
              {category && (
                <>
                  {products
                    ?.filter((p) => p.category == category)
                    .map((p, indx) => (
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
                                <img
                                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                  className="w-100 rounded mb-3"
                                  alt
                                />
                              </Link>
                            </div>
                          </Badge.Ribbon>
                          <h3>{p?.name}</h3>
                          <p className="product-price">${p?.price} </p>
                          <button
                            className="cart-btn"
                            onClick={() =>
                              //   {
                              //   setCart([...cart, p]);
                              //   localStorage.setItem(
                              //     "cart",
                              //     JSON.stringify([...cart, p])
                              //   );
                              //   toast.success("Item Added to cart");
                              // }
                              handleAddToCart(p)
                            }
                          >
                            <BsFillCartFill /> Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                </>
              )}
              {!category && (
                <>
                  {products?.map((p, indx) => (
                    <div
                      className="col-lg-4 col-md-6 text-center"
                      key={indx + 1}
                    >
                      <div className="single-product-item">
                        {/* <div className="product-image ">
                          <Link to={`/product/${p.slug}`}>
                            <img
                              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                              className="w-100 rounded mb-3"
                              alt
                            />
                          </Link>
                        </div> */}
                        <Badge.Ribbon
                          text={handlecategoryName(p?.category)}
                          color="#f28123"
                        >
                          <div className="product-image ">
                            <Link to={`/product/${p.slug}`}>
                              <img
                                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                className="w-100 rounded mb-3"
                                alt
                              />
                            </Link>
                          </div>
                        </Badge.Ribbon>
                        <h3>{p?.name}</h3>
                        <p className="product-price">${p?.price} </p>
                        <button
                          className="cart-btn"
                          onClick={() => 
                          //   {
                          //   setCart([...cart, p]);
                          //   localStorage.setItem(
                          //     "cart",
                          //     JSON.stringify([...cart, p])
                          //   );
                          //   toast.success("Item Added to cart");
                          // }
                          handleAddToCart(p)
                        }
                        >
                          <BsFillCartFill /> Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}
              <div className="m-2 p-3 d-flex align-items-center justify-content-center">
                {products && products.length < total && (
                  <button
                    className="text-white cart-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
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
        <CardBanner />
        <Testimonial />
        <VideoSection />
        <Sale />
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
              <div className="col-lg-4 col-md-6">
                <div className="single-latest-news">
                  <a href="single-news.html">
                    <div className="latest-news-bg news-bg-1" />
                  </a>
                  <div className="news-text-box">
                    <h3>
                      <Link to={"#"}>
                        You will vainly look for fruit on it in autumn.
                      </Link>
                    </h3>
                    <p className="blog-meta d-flex align-items-center gap-2">
                      <span className="author d-flex align-items-center gap-2">
                        <FaUserAlt /> Admin
                      </span>
                      <span className="date d-flex align-items-center gap-2">
                        <AiFillCalendar /> 27 December, 2019
                      </span>
                    </p>
                    <p className="excerpt">
                      Vivamus lacus enim, pulvinar vel nulla sed, scelerisque
                      rhoncus nisi. Praesent vitae mattis nunc, egestas viverra
                      eros.
                    </p>
                    <button className="cart-btn">
                      read more <AiOutlineArrowRight />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="single-latest-news">
                  <a href="single-news.html">
                    <div className="latest-news-bg news-bg-2" />
                  </a>
                  <div className="news-text-box">
                    <h3>
                      <Link to={"#"}>
                        A man's worth has its season, like tomato.
                      </Link>
                    </h3>
                    <p className="blog-meta d-flex align-items-center gap-2">
                      <span className="author d-flex align-items-center gap-2">
                        <FaUserAlt /> Admin
                      </span>
                      <span className="date d-flex align-items-center gap-2">
                        <AiFillCalendar /> 27 December, 2019
                      </span>
                    </p>
                    <p className="excerpt">
                      Vivamus lacus enim, pulvinar vel nulla sed, scelerisque
                      rhoncus nisi. Praesent vitae mattis nunc, egestas viverra
                      eros.
                    </p>
                    <button className="cart-btn">
                      read more <AiOutlineArrowRight />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 offset-md-3 offset-lg-0">
                <div className="single-latest-news">
                  <a href="single-news.html">
                    <div className="latest-news-bg news-bg-3" />
                  </a>
                  <div className="news-text-box">
                    <h3>
                      <Link to={"#"}>
                        Good thoughts bear good fresh juicy fruit.
                      </Link>
                    </h3>
                    <p className="blog-meta d-flex align-items-center gap-2">
                      <span className="author d-flex align-items-center gap-2">
                        <FaUserAlt /> Admin
                      </span>
                      <span className="date d-flex align-items-center gap-2">
                        <AiFillCalendar /> 27 December, 2019
                      </span>
                    </p>
                    <p className="excerpt">
                      Vivamus lacus enim, pulvinar vel nulla sed, scelerisque
                      rhoncus nisi. Praesent vitae mattis nunc, egestas viverra
                      eros.
                    </p>
                    <button className="cart-btn">
                      read more <AiOutlineArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
