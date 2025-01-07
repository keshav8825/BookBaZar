import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="h-[85vh] flex flex-col lg:flex-row bg-gradient-to-r from-blue-50 via-white to-blue-50 px-8 lg:px-20 py-12">
      {/* Left Section - Text */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-6">
        <h1 className="text-5xl lg:text-6xl font-extrabold text-blue-900 leading-snug">
          Discover, Trade, and Share Books
        </h1>
        <p className="text-lg lg:text-xl text-gray-700 max-w-lg">
          Join a community of book enthusiasts! Find incredible deals on pre-loved books, or sell your collection with ease. Your next story awaits.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <Link
            to="/all-books"
            className="bg-blue-600 text-white text-lg font-semibold px-8 py-4 rounded-lg hover:bg-blue-700 transition-all shadow-lg"
          >
            Buy Books
          </Link>
          <Link
            to="/sale-books"
            className="bg-green-500 text-white text-lg font-semibold px-8 py-4 rounded-lg hover:bg-green-600 transition-all shadow-lg"
          >
            Sell Books
          </Link>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="w-full lg:w-1/2 flex items-center justify-center mt-10 lg:mt-0 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-300 to-transparent opacity-30 rounded-lg"></div>
        <img
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
          alt="Bookshelf"
          className="w-full lg:max-w-lg rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
};

export default Hero;
