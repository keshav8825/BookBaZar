import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Components/Loader/Loader";
import BookCard from "../Components/BookCard/BookCard";

const AllBooks = () => {
  const [data, setData] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/get-all-books");
        setData(response.data.data || []); // Fallback to an empty array
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false); // Ensure loader stops
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen px-6 py-8 bg-gradient-to-b from-blue-100 via-white to-blue-100">
      <h4 className="text-4xl font-extrabold text-blue-800 text-center mb-12">
        All Books
      </h4>

      {loading ? (
        <div className="flex items-center justify-center my-12">
          <Loader />
        </div>
      ) : data.length === 0 ? (
        <p className="text-center text-gray-600 my-12 text-lg">
          No books found. Please check back later!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data.map((item, i) => (
            <div
              key={i}
              className="transform transition-transform duration-300 hover:scale-105"
            >
              <BookCard data={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
