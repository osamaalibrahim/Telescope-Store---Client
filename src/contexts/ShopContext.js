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
        "http://localhost:3001/product"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/auth/cart",
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
        "http://localhost:3001/auth/cart",
        { itemId },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      //setCartItems([...cartItems, item]);
      toast.success("Added to cart successfully!");
    } catch (error) {
      console.error("There was an error!", error);
      //throw error; // Rethrow the error to handle it in the calling function
      toast.error("There was an error adding to cart!");
    }
  };

  const removeFromCart = async (item) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/auth/cart/${item.id}`,
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
        "http://localhost:3001/auth/cart",
        { productId, quantity: newQuantity },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
      fetchCartItems();
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  // clear the cart
  const clearCart = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3001/auth/cart",
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
