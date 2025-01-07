import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authActions } from "../Store/auth";
import { useDispatch } from "react-redux";
import axios from "axios";

const Login = () => {
  const [Values, setValues] = useState({
    email: "",
    password: "", // Correct field added for password
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate form fields
    if (Values.email === "" || Values.password === "") {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/sign-in",
        Values
      );

      // Dispatch actions for successful login
      dispatch(authActions.login());
      dispatch(authActions.changeRole(response.data.role));
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message || "Signin failed. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 md:w-1/2 lg:w-1/3">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Login
        </h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={submit}>
          <div className="mb-4">
            <input
              type="email"
              name="email" // Added name attribute
              placeholder="Email"
              className="w-full p-3 border border-zinc-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              required
              value={Values.email}
              onChange={change}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password" // Added name attribute
              placeholder="Password"
              className="w-full p-3 border border-zinc-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              required
              value={Values.password}
              onChange={change}
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-zinc-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-500 hover:text-indigo-700">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
