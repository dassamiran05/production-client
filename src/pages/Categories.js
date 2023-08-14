import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/layout/Layout";
import Banner from "../components/common/Banner";
const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <Banner subheading="Loren ipsumn lore" heading="All Categories" />
      <div
        className="container"
        style={{ marginTop: "50px", marginBottom: "50px" }}
      >
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <div className="card category-card">
                <Link
                  to={`/category/${c.slug}`}
                  className="btn cat-btn w-100 h-100 d-flex align-items-center justify-content-center"
                >
                  {c.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
