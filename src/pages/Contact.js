import React from 'react'
import Layout from '../components/layout/Layout'
import { FaEnvelope } from 'react-icons/fa';
import Banner from '../components/common/Banner';

const Contact = () => {
  return (
    <Layout title="Contact us - Ecommerce app">
      <Banner subheading="Get 24/7 Support" heading="Contact us"/>
      <div className="contact-from-section mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-6 col-12 mb-5 mb-lg-0">
              <div className="form-title">
                <h2>Have you any question?</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, ratione! Laboriosam est, assumenda. Perferendis, quo alias quaerat aliquid. Corporis ipsum minus voluptate? Dolore, esse natus!</p>
              </div>
              <div id="form_status"></div>
              <div className="contact-form">
                <form id="fruitkha-contact">
                  <div className="row">
                    <div className="col-md-6 col-12 mb-4">
                      <input type="text" placeholder="Name" name="name" id="name" className='w-100'/>
                    </div>
                    <div className="col-md-6 col-12 mb-4">
                      <input type="email" placeholder="Email" name="email" id="email" />
                    </div>
                    <div className="col-md-6 col-12 mb-4">
                      <input type="tel" placeholder="Phone" name="phone" id="phone" />
                    </div>
                    <div className="col-md-6 col-12 mb-4">
                      <input type="text" placeholder="Subject" name="subject" id="subject" />
                    </div>
                    <div className="col-12 mb-3">
                      <textarea name="message" id="message" cols="30" rows="10" placeholder="Message"></textarea>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="submit">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="contact-form-wrap">
                <div className="contact-form-box">
                  <h4 className='d-flex gap-3 align-items-center'><FaEnvelope /> Shop Address</h4>
                  <p>34/8, East Hukupara <br /> Gifirtok, Sadan. <br /> Country Name</p>
                </div>
                <div className="contact-form-box">
                  <h4 className='d-flex gap-3 align-items-center'><FaEnvelope /> Shop Hours</h4>
                  <p>MON - FRIDAY: 8 to 9 PM <br /> SAT - SUN: 10 to 8 PM </p>
                </div>
                <div className="contact-form-box">
                  <h4 className='d-flex gap-3 align-items-center'><FaEnvelope /> Contact</h4>
                  <p>Phone: +00 111 222 3333 <br /> Email: support@fruitkha.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="find-location blue-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <p> <i className="fas fa-map-marker-alt"></i> Find Our Location</p>
            </div>
          </div>
        </div>
      </div>
      <div className="embed-responsive embed-responsive-21by9">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26432.42324808999!2d-118.34398767954286!3d34.09378509738966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bf07045279bf%3A0xf67a9a6797bdfae4!2sHollywood%2C%20Los%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbd!4v1576846473265!5m2!1sen!2sbd" width="100%" height="450" frameborder="0" style={{border:"0"}} allowfullscreen="" className="embed-responsive-item" title='map'></iframe>
      </div>
    </Layout>
  )
}

export default Contact
