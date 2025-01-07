import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/get-book-by-id/${id}`
        );
        setData(response.data.data);
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center">
        <p className="text-red-600 text-xl">
          Failed to load book details. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 px-6 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Book Image Section */}
        <div className="md:w-1/2 flex items-center justify-center bg-gray-50 relative">
          <img
            src={data.url || "https://via.placeholder.com/400"}
            alt={data.title}
            className="h-[70vh] w-auto object-cover rounded-md"
          />
          {isLoggedIn === true && role === "user" && (
            <div className="absolute bottom-4 left-4 flex flex-col md:flex-row gap-4">
              <button className="flex items-center justify-center bg-white rounded-full text-3xl p-3 text-red-500 border border-red-500 hover:bg-red-500 hover:text-white transition duration-300">
                <FaHeart />
              </button>
              <button className="flex items-center justify-center bg-white rounded-full text-3xl p-3 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300">
                <FaShoppingCart />
              </button>
            </div>
          )}
        </div>

        {/* Book Details Section */}
        <div className="p-6 md:p-12 flex-1">
          <h1 className="text-4xl font-bold text-gray-800">{data.title}</h1>
          <p className="text-xl text-gray-600 mt-2">by {data.author}</p>
          <p className="text-gray-700 mt-6 leading-relaxed">{data.desc}</p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center text-gray-600 text-lg">
              <GrLanguage className="text-gray-500 mr-3" />
              <span>{data.language || "Unknown"}</span>
            </div>
            <p className="text-gray-600 text-lg">
              <strong>Book Type:</strong> {data.bookType || "N/A"}
            </p>
            <p className="text-gray-600 text-lg">
              <strong>Condition:</strong> {data.condition || "N/A"}
            </p>
          </div>

          <div className="mt-8">
            <p className="text-3xl font-semibold text-blue-700">
              Price: ₹{data.price ? data.price.toFixed(2) : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBookDetails;