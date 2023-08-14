import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";
import Spinner from "../../components/spinner/Spinner";
import Img from "../../components/lazyloadimage/Img";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  const getOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`,
        { headers: { Authorization: auth?.token } }
      );
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout tilte="Order - Ecommerce app">
      <div className="container m-auto p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            {loading && <Spinner initial={true} />}
            {!loading && (
              <>
                <div className="card w-100 p-3">
                  {orders?.length > 0 ? (
                    <>
                      <h1 className="text-center">All Orders</h1>
                      {orders?.map((o, index) => {
                        return (
                          <div className="border shadow" key={index + 1}>
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Status</th>
                                  <th scope="col">Buyer</th>
                                  <th scope="col"> date</th>
                                  <th scope="col">Payment</th>
                                  <th scope="col">Quantity</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{o?.status}</td>
                                  <td>{o?.buyer?.name}</td>
                                  <td>{moment(o?.createAt).fromNow()}</td>
                                  <td>
                                    {o?.payment.success ? "Success" : "Failed"}
                                  </td>
                                  <td>{o?.products?.length}</td>
                                </tr>
                              </tbody>
                            </table>
                            <div className="container">
                              {o?.products?.map((p, index) => (
                                <div
                                  className="row mb-2 p-3 card flex-row"
                                  key={index + 1}
                                >
                                  <div className="col-md-4">
                                    <Img
                                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                      className="w-100 h-100 card-img-top object-fit-cover"
                                      alt={p.name}
                                    />
                                    {/* <img
                                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                      className="w-100 h-100 card-img-top"
                                      alt={p.name}
                                      width="100px"
                                      height={"100px"}
                                    /> */}
                                  </div>
                                  <div className="col-md-8">
                                    <p className="mb-0">{p.name}</p>
                                    <p className="mb-0">
                                      {p.description.substring(0, 30)}
                                    </p>
                                    <p>Price : ${p.price}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                      <p style={{ padding: "80px 0" }} className="fs-2 fw-500">
                        Currently there is no data
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
