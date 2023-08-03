import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import "../styles/CategoryProductStyles.css";
import axios from "axios";
import Layout from "../components/layout/Layout";
import Banner from "../components/common/Banner";
import { useCart } from "../context/cart";
const SingleCategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const { cart, setCart, handleAddToCart } = useCart();

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Category Product">
      <Banner
        subheading="Lorem ipsum loren"
        heading="Single category product"
      />
      <div className="container my-5 category">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">Found {products?.length} results</h6>
        {/* <div className="row">
          <div className="col-md-9 offset-1"> */}
        <div className="d-flex flex-wrap">
          {products?.map((p) => (
            <div className="col-md-4 col-12">
              <div className="card m-2" key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
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
                  <div className="card-name-price d-flex align-items-center gap-2">
                    <button
                      className="bordered-btn"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="boxed-btn"
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
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
        {/* </div>
        </div> */}
      </div>
    </Layout>
  );
};

export default SingleCategoryProduct;
