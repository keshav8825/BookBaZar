import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./Store/auth";
import axios from "axios";

// Pages and Components
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import SaleBook from "./Components/SaleBook/SaleBook";
import AllBooks from "./Pages/AllBooks";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";
import AboutUs from "./Pages/AboutUs";
import ViewBookDetails from "./Components/ViewBookDetails/ViewBookDetails";
import Favourites from "./Components/Profile/Favourites";
import UserOrderHistory from "./Components/Profile/UserOrderHistory"; 
import Settings from "./Components/Profile/Settings"; 

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  // Persist login state from localStorage
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [dispatch]);

  return (
    <div id="root" className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/all-books" element={<AllBooks />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />}>
            <Route index element={<Favourites />} /> 
            <Route path="orderHistory" element={<UserOrderHistory />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
          <Route path="/sale-books" element={<SaleBook />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
