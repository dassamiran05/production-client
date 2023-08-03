import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {Helmet} from "react-helmet";
import { ToastContainer } from 'react-toastify';

const Layout = ({children, title, description, keywords, author}) => {
  return (
    <div>
        <Helmet>
            <meta charSet="utf-8" />
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
        </Helmet>
        <Header />
        <main style={{minHeight:'80vh'}}>
            <ToastContainer />
            {children}
        </main>
        <Footer />
    </div>
  )
}

Layout.defaultProps = {
    title: "Ecommerce App - Shop Now",
    description: "Ecommerce application",
    keywords: "React js, Node js, Mongodb, Express, JWT",
    author: "Samiran Das"
}

export default Layout
