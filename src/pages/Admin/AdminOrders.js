import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";
import { Select } from "antd";
import Spinner from "../../components/spinner/Spinner";
import Img from "../../components/lazyloadimage/Img";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`,
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

  const handleChange = async (orderId, value) => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        {
          status: value,
        },
        { headers: { Authorization: auth?.token } }
      );
      setLoading(false);
      getOrders();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout tilte="Admin orders - Ecommerce app">
      <div className="container m-auto p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            {loading && <Spinner initial={true} />}
            {!loading && (
              <>
                {orders?.length > 0 ? (
                  <>
                    <h1 className="text-center">All Orders</h1>
                    {orders?.map((o, i) => {
                      return (
                        <div className="border shadow mb-3" key={o?._id}>
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
                                <td>{i + 1}</td>
                                <td>
                                  <Select
                                    bordered={false}
                                    onChange={(value) =>
                                      handleChange(o._id, value)
                                    }
                                    defaultValue={o?.status}
                                  >
                                    {status.map((s, i) => (
                                      <Option key={i} value={s}>
                                        {s}
                                      </Option>
                                    ))}
                                  </Select>
                                </td>
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
                                    className="card-img-top w-100 h-100 object-fit-cover"
                                    alt={p.name}
                                  />
                                </div>
                                <div className="col-md-8 d-flex align-items-start flex-column justify-content-center">
                                  <h2 className="mb-2 fs-3">{p.name}</h2>
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
                  <>
                    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                      <p style={{ padding: "80px 0" }} className="fs-2 fw-500">
                        Currently there is no data
                      </p>
                    </div>
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

export default AdminOrders;
