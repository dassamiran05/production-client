import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';
import {useNavigate, useLocation, Link} from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Login = () => {
    const initialvalues = {email : "", password : ""};
    const [formValues, setFormValues] = useState(initialvalues);
    const [auth, setAuth] = useAuth();
    
    const navigate = useNavigate();
    const location = useLocation();

    const handleChangeInput = (e) =>{
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, formValues);
            if(res.data.success){
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || '/');
            }else{
                toast.error(res.data.message);
                setFormValues(initialvalues);
            }

        }catch(error){
            console.log(error);
            toast.error('Something went wrong');
        }
    }
  return (
    <Layout title="Login - Ecommerce App">
        <div className="breadcrumb-section breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <p>lorem ipsum lorem</p>
                                <h1>Login</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <div className="register">
            {/* <h1 className='mt-4'>Register Page</h1> */}
            <div className="regiter-form my-4">
                <form id="fruitkha-contact">
                    <div className="row">
                        <div className="col-12 mb-4">
                            <input type="email" placeholder="Email" name="email" id="email" value={formValues.email} onChange={handleChangeInput}/>
                        </div>
                        <div className="col-12 mb-4">
                            <input type="password" placeholder="Password" name="password" id="password" value={formValues.password} onChange={handleChangeInput}/>
                        </div>
                        <div className="col-12 d-flex justify-content-center align-items-center mb-1">
                            <button type="submit" className="submit text-white w-100" onClick={handleSubmit}>Login</button>
                        </div>
                        <div className="col-12">
                            <div className="d-flex align-items-center justify-content-between">
                                <span>New User?  <Link to="/register">Sign up</Link></span>
                                <Link to="/forget-password">Forget Password</Link>
                            </div>
                            {/* <Link to="/forget-password" className="w-100"><button className="submit text-white w-100">Forget Password</button></Link> */}
                        </div>
                    </div>
                </form>

            </div>
        </div>
    </Layout>
  )
}

export default Login
