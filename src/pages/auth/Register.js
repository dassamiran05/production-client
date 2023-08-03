import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';

const Register = () => {
    const initialvalues = {name : "", email : "", password : "", phone: "", address: "", answer:""};
    const [formValues, setFormValues] = useState(initialvalues);
    
    const navigate = useNavigate();

    const handleChangeInput = (e) =>{
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, formValues);
            if(res.data.success){
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            }else{
                toast.error(res.data.message);
            }

        }catch(error){
            console.log(error);
            toast.error('Something went wrong');
        }
    }


  return (
    <Layout title="Register - Ecommerce App">
        <div className="breadcrumb-section breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <p>lorem ipsum lorem</p>
                                <h1>Register</h1>
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
                            <input type="text" placeholder="Name" name="name" id="name" value={formValues.name} onChange={handleChangeInput}/>
                        </div>
                        <div className="col-12 mb-4">
                            <input type="email" placeholder="Email" name="email" id="email" value={formValues.email} onChange={handleChangeInput}/>
                        </div>
                        <div className="col-12 mb-4">
                            <input type="password" placeholder="Password" name="password" id="password" value={formValues.password} onChange={handleChangeInput}/>
                        </div>
                        <div className="col-12 mb-4">
                            <input type="tel" placeholder="Phone" name="phone" id="phone" value={formValues.phone} onChange={handleChangeInput}/>
                        </div>
                        <div className="col-12 mb-3">
                            <textarea name="address" id="address" cols="30" rows="10" placeholder="Enter address" value={formValues.address} onChange={handleChangeInput}></textarea>
                        </div>
                        <div className="col-12 mb-4">
                            <input type="text" placeholder="what is your favourite sports?" name="answer" id="answer" value={formValues.answer} onChange={handleChangeInput}/>
                        </div>
                        
                        <div className="col-12 d-flex justify-content-center align-items-center mb-1">
                            <button type="submit" className="submit text-white w-100" onClick={handleSubmit}>Register</button>
                        </div>
                        <div className="col-12">
                            <div className="d-flex align-items-center justify-content-start">
                                <span>Alreader have an account?  <Link to="/login">Login</Link></span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </Layout>
  )
}

export default Register
