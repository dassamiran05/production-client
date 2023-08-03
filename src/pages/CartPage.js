import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DropIn from "braintree-web-drop-in-react";

import axios from "axios";
import Banner from "../components/common/Banner";
import { Select } from "antd";
const { Option } = Select;

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const { cart, setCart, handleAddToCart} = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //detele item
  const removeCartItem = (pid) => {
    try {
      const confirm = window.prompt(
        "Are you sure you want to delete the item ?"
      );
      if (!confirm) return;
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success("Item deleted from cart successfully");
    } catch (error) {
      console.log(error);
    }
  };

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price * item.qty;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        },
        { headers: { Authorization: auth?.token } }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout title="Cart - Ecommerce App">
      <Banner subheading="Lorem ipsum lorem" heading="Cart page" />
      <div className=" cart-page">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center  p-2 mb-1 mt-5">
                {!auth?.user ? "Hello Guest" : `Hello  ${auth?.user?.name}`}
                <p className="text-center">
                  {cart?.length
                    ? `You Have ${cart.length} items in your cart ${
                        auth?.token ? "" : "please login to checkout !"
                      }`
                    : " Your Cart Is Empty"}
                </p>
              </h1>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-md-7  p-0 m-0">
              {cart?.map((p) => (
                <div
                  className={`row card flex-row me-0 me-md-3 ${
                    cart?.length > 1 ? "mb-3" : "mb-0"
                  } ps-2 ps-md-0`}
                  key={p._id}
                >
                  <div className="col-md-4 p-2">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4 p-2">
                    <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center align-items-md-start">
                      <p className="mb-0">{p?.name}</p>
                      <p className="mb-0">{p?.description.substring(0, 30)}</p>
                      <p className="mb-0">Quantity : {p?.qty}</p>
                      <p className="mb-0">
                        Price : ${p?.price * p?.qty}{" "}
                        {`(${p?.price} * ${p?.qty})`}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4 cart-remove-btn d-flex align-items-center justify-content-center justify-content-md-start mb-3 mb-md-0">
                    <div className="d-flex align-items-center gap-2">
                      <Select
                        defaultValue={p?.qty}
                        style={{ borderRadius: "50px" }}
                        onChange={(value) => handleAddToCart(p, value)}
                        options={[
                          { value: "1", label: "1" },
                          { value: "2", label: "2" },
                          { value: "3", label: "3" },
                          { value: "4", label: "4" },
                          { value: "5", label: "5" },
                          { value: "6", label: "6" },
                          { value: "7", label: "7" },
                          { value: "8", label: "8" },
                          { value: "9", label: "9" },
                          { value: "10", label: "10" },
                        ]}
                      />
                      <button
                        className="btn btn-danger"
                        onClick={() => removeCartItem(p._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {cart?.length > 0 && (
              <>
                <div className="col-md-5 cart-summary ">
                  <h2>Cart Summary</h2>
                  <p>Total | Checkout | Payment</p>
                  <hr />
                  <h4>Total : {totalPrice()} </h4>
                  {auth?.token && auth?.user?.address && (
                    <>
                      <div className="mb-3">
                        <h4>Current Address</h4>
                        <h5>{auth?.user?.address}</h5>
                        <button
                          className="bordered-btn"
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          Update Address
                        </button>
                      </div>
                    </>
                  )}
                  {!auth?.token && (
                    <>
                      <button
                        className="cart-btn"
                        onClick={() =>
                          navigate("/login", {
                            state: "/cart",
                          })
                        }
                      >
                        Plase Login to checkout
                      </button>
                    </>
                  )}
                  {/* {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )} */}
                  <div className="mt-2">
                    {!clientToken || !auth?.token || !cart?.length ? (
                      ""
                    ) : (
                      <>
                        <DropIn
                          options={{
                            authorization: clientToken,
                            paypal: {
                              flow: "vault",
                            },
                          }}
                          onInstance={(instance) => setInstance(instance)}
                        />

                        <button
                          className="cart-btn"
                          onClick={handlePayment}
                          disabled={
                            loading || !instance || !auth?.user?.address
                          }
                        >
                          {loading ? "Processing..." : "Make Payment"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
