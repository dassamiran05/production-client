import { Checkbox, Radio } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Prices } from "../../components/Prices";
import Layout from "../../components/layout/Layout";
import "./userproducts.css";
import { useCart } from "../../context/cart";
import Spinner from "../../components/spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import Img from "../../components/lazyloadimage/Img";
import useCategory from "../../hooks/useCategory";
import useTotal from "../../hooks/useTotal";

// let filteroptions = {};

const UserProducts = () => {
  const navigate = useNavigate();
  const categories = useCategory();
  const total = useTotal();
  const { handleAddToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [page, setPage] = useState(1);
  const [filterProducts, setFilterProducts] = useState([]);
  const [isfilter, setIsfilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterOption, setFilterOptions] = useState({ checked: [], radio: [] });

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      if (data?.products) {
        setLoading(false);
        setProducts(data.products);

        setPage((prev) => prev + 1);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const fetchNextPageData = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
        // `${process.env.REACT_APP_API}/api/v1/product/product-filters/${page}`
      );

      if (data?.products) {
        setProducts([...products, ...data?.products]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(page);
  }, [page]);

  // filter by cat
  // const handleFilter = (value, id) => {
  //   let all = [...checked];

  //   if (value) {
  //     all.push(id);
  //   } else {
  //     all = all.filter((c) => c !== id);
  //   }
  //   setChecked(all);
  // };

  //get filterd product
  const filterProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        // `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`,
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        filterOption
      );
      console.log(data?.products);
      if (data?.products) {
        setFilterProducts(data?.products);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const { checked, radio } = filterOption;
    if (!checked?.length && !radio?.length) {
      setIsfilter(false);
      getAllProducts();
    }
  }, [filterOption?.checked?.length, filterOption?.radio?.length, isfilter]);

  useEffect(() => {
    const { checked, radio } = filterOption;
    if (checked?.length || radio?.length) {
      setIsfilter(true);
      filterProduct();
    }
  }, [filterOption?.checked, filterOption?.radio, isfilter]);

  const resetFilterHandle = () => {
    // setRadio([]);
    // setChecked([]);
    setFilterOptions({ checked: [], radio: [] });
    setPage(1);
    setIsfilter(false);
  };

  const handleFilter = (e) => {
    let newFilteroption;
    if (e.target.type == "checkbox") {
      if (e.target.checked) {
        newFilteroption = {
          ...filterOption,
          checked: [...filterOption?.checked, e.target.value],
        };
      } else {
        newFilteroption = {
          ...filterOption,
          checked: filterOption?.checked?.filter(
            (item) => item !== e.target.value
          ),
        };
      }
    } else {
      newFilteroption = { ...filterOption, radio: e.target.value };
    }
    setFilterOptions(newFilteroption);
  };

  return (
    <Layout title={"ALl Products - Best offers "}>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-3 filters mb-3 mb-md-0">
            <h4 className="text-center pb-2">Filter By Category</h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  value={c._id}
                  // onChange={(e) => handleFilter(e.target.checked, c._id)}
                  onChange={handleFilter}
                >
                  {c?.name}
                </Checkbox>
              ))}
            </div>
            {/* price filter */}
            <h4 className="text-center mt-4 pb-2">Filter By Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group
                // onChange={handleRadio}
                onChange={handleFilter}
              >
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column">
              <button className="cart-btn" onClick={resetFilterHandle}>
                RESET FILTERS
              </button>
            </div>
          </div>
          <div className="col-md-9 ">
            {loading && <Spinner initial={true} />}
            {!loading && (
              <>
                {!isfilter && (
                  <>
                    {products?.length > 0 ? (
                      <>
                        <InfiniteScroll
                          className="overflow-hidden"
                          dataLength={products?.length || []}
                          next={fetchNextPageData}
                          // hasMore={page < Math.ceil(total / 6)}
                          hasMore={products?.length < total}
                          loader={<Spinner />}
                        >
                          <div className="row">
                            {products?.map((p) => (
                              <div
                                className="col-lg-4 col-md-6 col-12"
                                key={p?._id}
                              >
                                <div className="card mb-4">
                                  <Img
                                    className="userproduct-img"
                                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p?._id}`}
                                  />
                                  <div className="card-body">
                                    <div className="card-name-price">
                                      <h5 className="card-title">{p?.name}</h5>
                                      <h5 className="card-title card-price">
                                        {p?.price?.toLocaleString("en-US", {
                                          style: "currency",
                                          currency: "USD",
                                        })}
                                      </h5>
                                    </div>
                                    <p className="card-text ">
                                      {p?.description?.substring(0, 60)}...
                                    </p>
                                    <div className="card-name-price d-flex justify-content-center justify-content-md-start gap-1">
                                      <button
                                        className="bordered-btn"
                                        onClick={() =>
                                          navigate(`/product/${p?.slug}`)
                                        }
                                      >
                                        More Details
                                      </button>
                                      <button
                                        className="boxed-btn"
                                        onClick={() => {
                                          handleAddToCart(p);
                                        }}
                                      >
                                        ADD TO CART
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </InfiniteScroll>
                      </>
                    ) : (
                      <div
                        className="w-100 d-flex align-items-center justify-content-center"
                        style={{ height: "400px" }}
                      >
                        <p className="fs-4 fw-500">Sorry No data found</p>
                      </div>
                    )}
                  </>
                )}

                {isfilter && (
                  <>
                    {filterProducts?.length > 0 ? (
                      <>
                        <div className="row">
                          {filterProducts?.map((p) => (
                            <div
                              className="col-lg-4 col-md-6 col-12"
                              key={p?._id}
                            >
                              <div className="card mb-4">
                                <Img
                                  className="userproduct-img"
                                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p?._id}`}
                                />
                                <div className="card-body">
                                  <div className="card-name-price">
                                    <h5 className="card-title">{p?.name}</h5>
                                    <h5 className="card-title card-price">
                                      {p?.price?.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                      })}
                                    </h5>
                                  </div>
                                  <p className="card-text ">
                                    {p?.description?.substring(0, 60)}...
                                  </p>
                                  <div className="card-name-price d-flex justify-content-center justify-content-md-start gap-1">
                                    <button
                                      className="bordered-btn"
                                      onClick={() =>
                                        navigate(`/product/${p?.slug}`)
                                      }
                                    >
                                      More Details
                                    </button>
                                    <button
                                      className="boxed-btn"
                                      onClick={() => {
                                        handleAddToCart(p);
                                      }}
                                    >
                                      ADD TO CART
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div
                        className="w-100 d-flex align-items-center justify-content-center"
                        style={{ height: "400px" }}
                      >
                        <p className="fs-4 fw-500">Sorry No data found</p>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProducts;
