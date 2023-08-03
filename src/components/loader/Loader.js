import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Loader = ({path = "login"}) => {

    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000);

        count === 0 && navigate(`/${path}`,{
            state:location.pathname,
        });
        return () => clearInterval(interval);
    }, [count, navigate, location, path]);
  return (
    <>
        <div className="d-flex flex-column justify-content-center align-items-center" style={{height:"100vh"}}>
            <h3 className="text-center">Redirecting you in {count} sec</h3>
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    </>
  )
}

export default Loader
