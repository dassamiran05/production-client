import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, useToast } from "react-toastify";
import useTotal from "../../hooks/useTotal";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../../components/spinner/Spinner";
import Img from "../../components/lazyloadimage/Img";

const Products = () => {
  const [products, setProducts] = useState([]);
  const total = useTotal();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  console.log(products);

  //getall products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${page}`
      );
      if (data?.products) {
        setProducts(data.products);
        setPage((prev) => prev + 1);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
      setLoading(false);
    }
  };

  const fetchNextPageData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${page}`
      );

      if (data?.products) {
        setProducts([...products, ...data?.products]);
        setPage((prev) => prev + 1);
      } else {
        const oldProduct = [...products];
        setProducts(oldProduct);
        setPage((prev) => prev - 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
    setPage(1);
  }, []);
  return (
    <Layout tilte="Products - Ecommerce app">
      <div className="container m-auto p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            {loading && <Spinner initial={true} />}
            {!loading && (
              <>
                <h1 className="text-center">All Products List</h1>
                <div className="d-flex flex-wrap">
                  <InfiniteScroll
                    className="overflow-hidden"
                    dataLength={products?.length || []}
                    next={fetchNextPageData}
                    hasMore={page <= Math.ceil(total / 6)}
                    // hasMore={products?.length <= total}
                    loader={<Spinner />}
                  >
                    <div className="row">
                      {products?.map((p) => (
                        <div className="col-lg-4 col-md-6 col-12" key={p._id}>
                          <Link
                            to={`/dashboard/admin/product/${p.slug}`}
                            className="product-link"
                          >
                            <div className="card mb-4 w-100">
                              <Img
                                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                className="card-img-top"
                                alt={p.name}
                              />
                              <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description}</p>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </InfiniteScroll>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
