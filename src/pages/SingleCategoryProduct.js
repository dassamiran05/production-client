import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import "../styles/CategoryProductStyles.css";
import axios from "axios";
import Layout from "../components/layout/Layout";
import Banner from "../components/common/Banner";
import { useCart } from "../context/cart";
import Spinner from "../components/spinner/Spinner";
import Img from "../components/lazyloadimage/Img";
const SingleCategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const { handleAddToCart } = useCart();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout title="Category Product">
      <Banner
        subheading="Lorem ipsum loren"
        heading="Single category product"
      />
      {loading && <Spinner initial={true} />}
      {!loading && (
        <div className="container my-5 category">
          <h4 className="text-center">Category - {category?.name}</h4>
          <h6 className="text-center">Found {products?.length} results</h6>
          {/* <div className="row">
          <div className="col-md-9 offset-1"> */}
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="col-md-4 col-12" key={p._id}>
                <div className="card m-2">
                  <Img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
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
                    <div className="card-name-price d-flex align-items-center gap-2">
                      <button
                        className="bordered-btn"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                        className="boxed-btn"
                        onClick={() => handleAddToCart(p)}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default SingleCategoryProduct;
