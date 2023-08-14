import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  // const initialvalues = {email : "", newpassword : "", answer: ""};
  // const [formValues, setFormValues] = useState(initialvalues);

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  // const [verifyotp, setVerifyotp] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [newpassword, setNewpassword] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/sendotp`,
        { phone }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setStep((prev) => prev + 1);
        // setPhone("");
        setLoading(false);
      } else {
        toast.error(res?.data?.message);
        // setPhone("");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  // const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setPhone(e.target.value);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/verifyotp`,
        { otp, phone }
      );

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setUser(res?.data?.user);
        setStep((prev) => prev + 1);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const userobject = user[0];
    const newuserpass = { ...userobject, newpassword: newpassword };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forget-password`,
        { newuserpass }
      );
      if (res?.data?.success) {
        toast.success("Password updated successfully");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="Forget Password - Ecommerce App">
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <p>lorem ipsum lorem</p>
                <h1>Forget Password</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="register">
        <div className="regiter-form my-4">
          <form id="fruitkha-contact">
            <div className="row">
              {step === 1 && (
                <>
                  <div className="col-12 mb-4">
                    <input
                      type="tel"
                      placeholder="Enter registered number"
                      name="phone"
                      id="phone"
                      value={phone}
                      onChange={handleChangeInput}
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="col-12 d-flex justify-content-center align-items-center mb-4">
                    <button
                      type="submit"
                      className="submit text-white w-100"
                      onClick={handleSubmit}
                    >
                      {loading ? "Sending..." : "Send OTP"}
                    </button>
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="col-12 mb-4">
                    <input
                      type="tel"
                      placeholder="Enter your otp"
                      name="otp"
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      autoComplete="Enter your otp"
                    />
                  </div>
                  <div className="col-12 d-flex justify-content-center align-items-center mb-4">
                    <button
                      type="submit"
                      className="submit text-white w-100"
                      onClick={handleOtpSubmit}
                    >
                      Vetify
                    </button>
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <div className="col-12 mb-4">
                    <input
                      type="password"
                      placeholder="Enter new password"
                      name="password"
                      id="password"
                      value={newpassword}
                      onChange={(e) => setNewpassword(e.target.value)}
                      autoComplete="Enter new password"
                    />
                  </div>
                  <div className="col-12 d-flex justify-content-center align-items-center mb-4">
                    <button
                      type="submit"
                      className="submit text-white w-100"
                      onClick={handlePasswordSubmit}
                    >
                      Update password
                    </button>
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgetPassword;
