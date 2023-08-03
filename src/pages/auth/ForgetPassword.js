import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const ForgetPassword = () => {
    const initialvalues = {email : "", newpassword : "", answer: ""};
    const [formValues, setFormValues] = useState(initialvalues);

    const navigate = useNavigate();

    const handleChangeInput = (e) =>{
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forget-password`, formValues);
            console.log(res.data, formValues);
            if(res.data.success){
                toast.success(res.data.message);
                navigate('/login');
            }else{
                toast.error(res.data.message);
            }

        }catch(error){
            console.log(error);
            toast.error('Something went wrong');
        }
    }
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
            {/* <h1 className='mt-4'>Register Page</h1> */}
            <div className="regiter-form my-4">
                <form id="fruitkha-contact">
                    <div className="row">
                        <div className="col-12 mb-4">
                            <input type="email" placeholder="Email" name="email" id="email" value={formValues.email} onChange={handleChangeInput}/>
                        </div>
                        <div className="col-12 mb-4">
                            <input type="text" placeholder="What is ypur favourite sport?" name="answer" id="answer" value={formValues.answer} onChange={handleChangeInput}/>
                        </div>
                        <div className="col-12 mb-4">
                            <input type="password" placeholder="New Password" name="newpassword" id="newpassword" value={formValues.newpassword} onChange={handleChangeInput}/>
                        </div>
                        <div className="col-12 d-flex justify-content-center align-items-center mb-4">
                            <button type="submit" className="submit text-white w-100" onClick={handleSubmit}>Reset</button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    </Layout>
  )
}

export default ForgetPassword
