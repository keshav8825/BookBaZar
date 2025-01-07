import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader/Loader";

const Profile = () => {
  const [profile, setProfile] = useState(null); // Initialize state
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const headers = {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        const response = await axios.get(
          "http://localhost:3000/api/v1/user-information",
          { headers }
        );
        setProfile(response.data); // Update profile data
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false); // Stop loading even on error
      }
    };

    fetchProfile(); // Call the fetch function
  }, []); // Dependency array ensures this runs only once

  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-screen py-8 text-white">
      {loading && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!loading && profile && (
        <>
          <div className="w-1/6">
            <Sidebar data={profile} />
          </div>
          <div className="w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;

