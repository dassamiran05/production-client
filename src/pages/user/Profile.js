import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/auth";
import { BiEdit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [isEdit, setIsEdit] = useState(false);

  const initialvalues = {
    name: auth?.user?.name,
    email: auth?.user?.email,
    phone: auth?.user?.phone,
    address: auth?.user?.address,
    password: "",
  };
  const [formValues, setFormValues] = useState(initialvalues);

  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        formValues,
        { headers: { Authorization: auth?.token } }
      );
      if (data?.success) {
        
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = JSON.parse(localStorage.getItem("auth"));
        ls.user = data?.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success(data?.message);
        navigate("/dashboard/user/profile");
        setIsEdit(false);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout tilte="Profile - Ecommerce app">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            {/* <div className="card w-75 p-3">
                        <h1>User Profile</h1>
                    </div> */}
            {isEdit ? (
              <>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ backgroundColor: "#eee" }}
                >
                  <div className="regiter-form my-4 p-3 shadow">
                    <form id="fruitkha-contact">
                      <div className="row">
                        <div className="col-12 mb-4">
                          <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            id="name"
                            value={formValues.name}
                            onChange={handleChangeInput}
                          />
                        </div>
                        <div className="col-12 mb-4">
                          <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            id="email"
                            value={formValues.email}
                            onChange={handleChangeInput}
                            disabled
                          />
                        </div>
                        <div className="col-12 mb-4">
                          <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            id="password"
                            value={formValues?.password}
                            onChange={handleChangeInput}
                          />
                        </div>
                        <div className="col-12 mb-4">
                          <input
                            type="tel"
                            placeholder="Phone"
                            name="phone"
                            id="phone"
                            value={formValues.phone}
                            onChange={handleChangeInput}
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <textarea
                            name="address"
                            id="address"
                            cols="30"
                            rows="10"
                            placeholder="Enter address"
                            value={formValues.address}
                            onChange={handleChangeInput}
                          ></textarea>
                        </div>

                        <div className="col-12 d-flex justify-content-center align-items-center mb-1">
                          <button
                            type="submit"
                            className="submit text-white w-100"
                            onClick={handleSubmit}
                          >
                            Update profile
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            ) : (
              <>
                <section style={{ backgroundColor: "#eee" }}>
                  <div className="container py-5">
                    <div className="row">
                      <div className="col">
                        <nav
                          aria-label="breadcrumb"
                          className="bg-light rounded-3 p-3 mb-4"
                        >
                          <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item">
                              <a href="#">Home</a>
                            </li>
                            <li className="breadcrumb-item">
                              <a href="#">User</a>
                            </li>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              User Profile
                            </li>
                          </ol>
                        </nav>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="card mb-4">
                          <div className="card-body text-center">
                            {/* <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                          alt="avatar"
                          className="rounded-circle img-fluid"
                          style={{ width: 150 }}
                        /> */}
                            <h5 className="my-3">{auth?.user?.name}</h5>
                            <p className="text-muted mb-1">
                              {auth?.user?.email}
                            </p>
                            <p className="text-muted mb-4">
                              {auth?.user?.address}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-8">
                        <div className="card mb-4">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-sm-3">
                                <p className="mb-0">Full Name</p>
                              </div>
                              <div className="col-sm-7">
                                <p className="text-muted mb-0">
                                  {auth?.user?.name}
                                </p>
                              </div>
                              <div className="col-sm-2">
                                <div className="text-primary fs-4 pe-auto d-flex justify-content-end">
                                  <span
                                    className="p-0 m-0"
                                    onClick={() => setIsEdit(true)}
                                  >
                                    <BiEdit />
                                  </span>
                                </div>
                              </div>
                            </div>
                            <hr />
                            <div className="row">
                              <div className="col-sm-3">
                                <p className="mb-0">Email</p>
                              </div>
                              <div className="col-sm-9">
                                <p className="text-muted mb-0">
                                  {auth?.user?.email}
                                </p>
                              </div>
                            </div>
                            <hr />
                            <div className="row">
                              <div className="col-sm-3">
                                <p className="mb-0">Phone</p>
                              </div>
                              <div className="col-sm-9">
                                <p className="text-muted mb-0">
                                  {auth?.user?.phone}
                                </p>
                              </div>
                            </div>
                            <hr />
                            <div className="row">
                              <div className="col-sm-3">
                                <p className="mb-0">Address</p>
                              </div>
                              <div className="col-sm-9">
                                <p className="text-muted mb-0">
                                  {auth?.user?.address}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
