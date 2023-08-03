import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'

const Users = () => {
  return (
    <Layout tilte="Users - Ecommerce app">
        <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <div className="card w-75 p-3">
                        <h1>All Users</h1>
                    </div>
                </div>
            </div>
        </div>
      
    </Layout>
  )
}

export default Users