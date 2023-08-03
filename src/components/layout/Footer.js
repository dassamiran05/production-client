import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-dark text-light p-3'>
      <h4 className="text-center text-white">&copy; All Right Reserved </h4>
      <p className="mt-3 d-flex gap-3 justify-content-center align-items-center footer-link">
        <Link to="/about">About us</Link>|
        <Link to="/contact">Contact us</Link>|
        <Link to="/policy">Priavcy Policy</Link>
      </p>
    </div>
  )
}

export default Footer
