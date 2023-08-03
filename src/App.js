
import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';
import Policy from './pages/Policy';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/user/Dashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import PrivateRoute from './components/routes/Private';
import ForgetPassword from './pages/auth/ForgetPassword';
import AdminRoute from './components/routes/AdminRoute';
import Order from './pages/user/Order';
import Profile from './pages/user/Profile';
import AdminOrders from './pages/Admin/AdminOrders';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import UserProducts from './pages/user/UserProducts';
import ProductDetails from './pages/ProductDetails';
import Search from './pages/Search';
import Categories from './pages/Categories';
import SingleCategoryProduct from './pages/SingleCategoryProduct';
import CartPage from './pages/CartPage';


function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/category/:slug" element={<SingleCategoryProduct />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/search" element={<Search />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/orders" element={<Order />} />
            <Route path="user/profile" element={<Profile />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/orders" element={<AdminOrders />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/create-product" element={<CreateProduct />} />
            <Route path="admin/product/:slug" element={<UpdateProduct />} />
            <Route path="admin/allusers" element={<Users />} />
            <Route path="admin/products" element={<Products />} />
          </Route>
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<UserProducts />} />
          <Route path="*" element={<PageNotFound />} />

      </Routes>
    </>
  );
}

export default App;
