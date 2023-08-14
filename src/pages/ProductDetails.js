import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetailsStyles.css";
import Layout from "../components/layout/Layout";
import Banner from "../components/common/Banner";
import { Typography } from "antd";
import { useCart } from "../context/cart";
import Img from "../components/lazyloadimage/Img";

const { Text } = Typography;

const ProductDetails = () => {
  const params = useParams();
  const { handleAddToCart } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/single-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <Banner subheading="Lorem ipsum" heading="Product details" />
      <div className="container product-details">
        <div className="row">
          <div className="col-md-6">
            <Img
              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
              className="card-img-top w-100 h-auto"
              alt={product.name}
            />
          </div>
          <div className="col-md-6 product-details-info">
            <h6>Name : {product.name}</h6>
            <h6>
              Catgeory: <Text mark>{product?.category?.name}</Text>
            </h6>
            <h6>Description : {product.description}</h6>
            <h6>
              Price :
              {product?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h6>
            <button
              className="btn btn-secondary ms-1 cart-btn"
              style={{ width: "30%" }}
              onClick={() => handleAddToCart(product)}
            >
              ADD TO CART
            </button>
          </div>
        </div>

        <hr />
        <div className="row similar-products mb-3">
          <h4>Similar Products ➡️</h4>
          {relatedProducts?.length < 1 && (
            <p className="text-center">No Similar Products found</p>
          )}
          {relatedProducts?.length > 0 && (
            <div className="d-flex flex-wrap">
              {relatedProducts?.map((p) => (
                <div className="card m-2" key={p._id}>
                  <Img
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
                    <div className="card-name-price d-flex align-items-center justify-content-center gap-1">
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
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
