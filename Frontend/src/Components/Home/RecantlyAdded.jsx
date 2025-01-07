import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
  const [data, setData] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/get-recent-books"
        );
        setData(response.data.data || []); // Fallback to an empty array
      } catch (error) {
        console.error("Error fetching recently added books:", error);
      } finally {
        setLoading(false); // Ensure loader stops
      }
    };
    fetch();
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 px-6 py-12"
      style={{
        backgroundImage: `url('https://www.transparenttextures.com/patterns/white-diamond.png')`,
        backgroundSize: "cover",
      }}
    >
      <h4 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
        Recently Added Books
      </h4>

      {/* Loader */}
      {loading && (
        <div className="flex items-center justify-center my-12">
          <Loader />
        </div>
      )}

      {/* No Data Message */}
      {!loading && data.length === 0 && (
        <p className="text-center text-gray-500 my-12 text-lg">
          No books added recently. Please check back later!
        </p>
      )}

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4"
          >
            <BookCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;
