import React from "react";
import { useSearch } from "../context/search";
import Layout from "../components/layout/Layout";
import Banner from "../components/common/Banner";
const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <Banner subheading="Lorem ipsum lorem" heading="Search Page" />
      <div className="container my-5">
        <div className="text-className=">
          {/* <h1>Search Resuts</h1> */}
          <h4 className="text-center mb-3 fs-3 fw-bold">
            {values?.results.length > 0
              ? `${values?.results.length} Results Found `
              : "No Products Found"}
          </h4>
          {/* <div className="d-flex flex-wrap mt-4"> */}
          <div className="row">
            {values?.results.map((p) => (
              <div className="col-md-4 col-12">
                <div className="card m-2">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text"> $ {p.price}</p>
                    <div className="card-name-price d-flex justify-content-className= gap-2">
                      <button
                        className="btn btn-info btn-sm text-uppercase text-white"
                        // onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button className="btn btn-dark btn-sm">
                        ADD TO CART
                      </button>
                    </div>
                    {/* <button className="btn btn-primary ms-1">More Details</button> */}
                    {/* <button className="btn btn-secondary ms-1">ADD TO CART</button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default Search;