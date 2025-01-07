import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

const SignUp = () => {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "", 
  });
  const [error, setError] = useState(""); // Define error state
  const navigate = useNavigate(); // For navigation after successful signup

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const validateEmail = (email) => {
    // Simple email regex for validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const submit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(""); // Clear previous errors

    // Validate form fields
    if (!Values.username || !Values.email || !Values.password || !Values.address) {
      setError("All fields are required.");
      return;
    }

    if (Values.password.length < 5) { // Check for password length
      setError("Password should be at least 5 characters long.");
      return;
    }

    if (!validateEmail(Values.email)) { // Validate email format
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/sign-up", Values);
      console.log(response.data);
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 md:w-1/2 lg:w-1/3">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Create an Account</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={submit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-zinc-800">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full p-3 border border-zinc-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              required
              value={Values.username}
              onChange={change}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-zinc-800">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border border-zinc-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              required
              value={Values.email}
              onChange={change}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-zinc-800">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 border border-zinc-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              required
              value={Values.password}
              onChange={change}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-zinc-800">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="w-full p-3 border border-zinc-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              required
              value={Values.address}
              onChange={change}
            />
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-zinc-600">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-500 hover:text-indigo-700">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;