import React, { createContext, useState, useContext } from "react";
import axios from "axios";

// Create the ShopContext
const ShopContext = createContext();

// Create the ShopProvider component
export const ShopProvider = ({ children }) => {
  // State for the cart items
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    axios
      .get("http://localhost:3001/product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  // fetch the cart items from the server
  const fetchCartItems = () => {
    axios
      .get("http://localhost:3001/auth/cart", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  // Function to add an item to the cart
  const addToCart = (item) => {
    const itemId = item.id;
    if (cartItems.some((cartItem) => cartItem.productId === itemId)) {
      updateQuantity(
        itemId,
        cartItems.find((cartItem) => cartItem.productId === itemId).quantity + 1
      );
      return;
    }
    axios
      .post(
        "http://localhost:3001/auth/cart",
        { itemId },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        setCartItems([...cartItems, item]);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  // Function to remove an item from the cart
  const removeFromCart = (item) => {
    // setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    axios
      .delete(`http://localhost:3001/auth/cart/${item.id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  // function to update the quantity of an item in the cart
  const updateQuantity = (productId, newQuantity) => {
    axios
      .put(
        "http://localhost:3001/auth/cart",
        { productId, quantity: newQuantity },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        // Update the quantity of the item in the cartItems state
        setCartItems((prevCartItems) =>
          prevCartItems.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
          )
        );
        fetchCartItems();
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

    // clear the cart
    const clearCart = () => {
        axios
            .delete("http://localhost:3001/auth/cart", {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
            })
            .then((response) => {
            setCartItems([]);
            })
            .catch((error) => {
            console.error("There was an error!", error);
            });
        };


  // Value object to be passed to consumers of the ShopContext
  //   const value = {
  //     cartItems,
  //     addToCart,
  //     removeFromCart,
  //   };

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
