import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../loader/Loader";


export default function AdminRoute(){
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`, {
                headers:{
                    "Authorization": auth?.token
                }
            })
            .then((res) => {
                if(res.data.ok){
                    setOk(true);
                }
                else{
                    setOk(false);
                }
            }).catch((error) => {
                console.log(error);
            })
            
        }


        if(auth?.token) authCheck()
    }, [auth?.token]);

    return ok ? <Outlet /> : <Loader path=""/>

}