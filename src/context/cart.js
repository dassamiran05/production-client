import { useState, useContext, createContext, useEffect } from "react";
import { toast } from "react-toastify";
// import { useAuth } from "./auth";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  // const [auth, setAuth] = useAuth();

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart")
      ? localStorage.getItem("cart")
      : "";
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  //Add to cart functionality
  const handleAddToCart = (product, value = null) => {
    // console.log(product, value, parseInt(value));
    const exists = cart.find((x) => x._id === product._id);
    if (exists) {
      const newCartItems = cart.map((x) =>
        x._id === product._id
          ? { ...exists, qty: value ? parseInt(value) : exists.qty + 1 }
          : x
      );
      setCart(newCartItems);
      localStorage.setItem("cart", JSON.stringify(newCartItems));
    } else {
      const newCartItems = [...cart, { ...product, qty: 1 }];
      setCart(newCartItems);
      localStorage.setItem("cart", JSON.stringify(newCartItems));
    }

    toast.success(
      `${
        value
          ? "Cart Updated Successfully"
          : "Product Added to cart Successfully"
      }`
    );
  };

  return (
    <CartContext.Provider value={{ cart, setCart, handleAddToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
