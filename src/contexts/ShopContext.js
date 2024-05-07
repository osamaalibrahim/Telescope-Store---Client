import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://telescope-server.onrender.com/product"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        "https://telescope-server.onrender.com/auth/cart",
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      setCartItems(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const addToCart = async (item) => {
    const itemId = item.id;
    if (cartItems.some((cartItem) => cartItem.productId === itemId)) {
      updateQuantity(
        itemId,
        cartItems.find((cartItem) => cartItem.productId === itemId).quantity + 1
      );
      return;
    }

    try {
      const response = await axios.post(
        "https://telescope-server.onrender.com/auth/cart",
        { itemId },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      setCartItems(prevItems => [...prevItems, { ...item, quantity: 1 }]); // Ensure you structure the new item correctly
      toast.success("Added to cart successfully!");
    } catch (error) {
      console.error("There was an error!", error);
      toast.error("There was an error adding to cart!");
    }
  };


  const removeFromCart = async (item) => {
    try {
      const response = await axios.delete(
        `https://telescope-server.onrender.com/auth/cart/${item.id}`,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
      toast.success("Removed from cart successfully!");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const response = await axios.put(
        "https://telescope-server.onrender.com/auth/cart",
        { productId, quantity: newQuantity },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.productId === productId ? { ...item, quantity: newQuantity } : item
        )
      );
      // Optionally, fetchCartItems here if it's crucial to confirm the server's state is matched.
    } catch (error) {
      console.error("There was an error!", error);
      // Optionally revert the optimistic update here if needed.
    }
  };


  // clear the cart
  const clearCart = async () => {
    try {
      const response = await axios.delete(
        "https://telescope-server.onrender.com/auth/cart",
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      setCartItems([]);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        setProducts,
        fetchProducts,
        fetchCartItems,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

// Export the ShopContext and ShopProvider
export const useShop = () => useContext(ShopContext);
