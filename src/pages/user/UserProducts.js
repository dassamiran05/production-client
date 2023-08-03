import { Checkbox, Radio } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Prices } from "../../components/Prices";
import Layout from "../../components/layout/Layout";
import "./userproducts.css";
import { AiOutlineReload } from "react-icons/ai";
import { useCart } from "../../context/cart";
import { toast } from "react-toastify";
import Banner from "../../components/common/Banner";

const UserProducts = () => {
  const navigate = useNavigate();
  const { handleAddToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/allcategories`
      );
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const resetFilterHandle = () => {
    setRadio([]);
    setChecked([]);
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

  //load more
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
  return (
    <Layout title={"ALl Products - Best offers "}>
      <Banner subheading="Loren ipsum lorem" heading="All Products" />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-3 filters">
            <h4 className="text-center pb-2">Filter By Category</h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            {/* price filter */}
            <h4 className="text-center mt-4 pb-2">Filter By Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column">
              <button
                className="cart-btn"
                // onClick={() => window.location.reload()}
                onClick={resetFilterHandle}
              >
                RESET FILTERS
              </button>
            </div>
          </div>
          <div className="col-md-9 ">
            <div className="d-flex flex-wrap">
              {products && products.length > 0 ? (
                <>
                  {products?.map((p) => (
                    <div className="col-md-4 col-12" key={p._id}>
                      <div className="card m-2">
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                          className="userproduct-img"
                          alt={p.name}
                        />
                        <div className="card-body">
                          <div className="card-name-price">
                            <h5 className="card-title">{p.name}</h5>
                            <h5 className="card-title card-price">
                              {p.price.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                              })}
                            </h5>
                          </div>
                          <p className="card-text ">
                            {p.description.substring(0, 60)}...
                          </p>
                          <div className="card-name-price d-flex justify-content-center justify-content-md-start gap-1">
                            <button
                              className="bordered-btn"
                              onClick={() => navigate(`/product/${p.slug}`)}
                            >
                              More Details
                            </button>
                            <button
                              className="boxed-btn"
                              onClick={() => {
                                handleAddToCart(p);
                                // setCart([...cart, p]);
                                // localStorage.setItem(
                                //   "cart",
                                //   JSON.stringify([...cart, p])
                                // );
                                // toast.success("Item Added to cart");
                              }}
                            >
                              ADD TO CART
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div
                  className="w-100 d-flex align-items-center justify-content-center"
                  style={{ height: "400px" }}
                >
                  <p className="fs-4 fw-500">Sorry No data found</p>
                </div>
              )}
            </div>
            <div className="m-2 p-3 d-flex align-items-center justify-content-center">
              {products && products?.length > 0 && products.length < total && (
                <button
                  className="cart-btn loadmore"
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
    </Layout>
  );
};

export default UserProducts;
