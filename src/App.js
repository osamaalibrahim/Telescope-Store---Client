import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Store from "./pages/Store";
import RootLayout from "./layouts/RootLayout";
import Gathering from "./pages/Gatherings";
import About from "./pages/About";
import Support from "./pages/Support";
import Cart from "./pages/Cart";
import Calender from "./pages/Calenders";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="store" element={<Store />} />
      <Route path="gathering" element={<Gathering />} />
      <Route path="calender" element={<Calender />} />
      <Route path="about" element={<About />} />
      <Route path="support" element={<Support />} />
      <Route path="cart" element={<Cart />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
