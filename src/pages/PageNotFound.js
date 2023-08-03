import React from 'react'
import Layout from '../components/layout/Layout'
import { Link } from 'react-router-dom'
import { FaRegSadCry } from 'react-icons/fa';

const PageNotFound = () => {
  return (
    <Layout title="404 - Ecommerce app">  
		<div className="breadcrumb-section breadcrumb-bg">
			<div className="container">
				<div className="row">
					<div className="col-lg-8 offset-lg-2 text-center">
						<div className="breadcrumb-text">
							<p>Fresh adn Organic</p>
							<h1>404 - Not Found</h1>
						</div>
					</div>
				</div>
			</div>
		</div>
      <div className="pnf">
        {/* <h1 className="pnf-title">404</h1> */}
        <h1 className="pnf-title"><FaRegSadCry /></h1>
        <h2 className="pnf-heading">Oops ! Page Not Found</h2>
        <Link to="/" className="pnf-btn submit text-white">
          Go Back
        </Link>
      </div>
    </Layout>
  )
}

export default PageNotFound
