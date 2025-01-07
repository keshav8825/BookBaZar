import React from "react";
import { Link } from "react-router-dom"; 

const BookCard = ({ data }) => {
    // Dummy image if no image URL is provided
    const defaultImage = "https://via.placeholder.com/150x200?text=No+Image";

    return (
        <>
        <Link to={`/view-book-details/${data._id}`}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
                {/* Book Image */}
                <div className="h-64 bg-gray-100">
                    <img
                        src={data.url || defaultImage}
                        alt={data.title || "Book Cover"}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Book Details */}
                <div className="p-4 space-y-2">
                    <h2 className="text-lg font-bold text-gray-800 truncate">
                        {data.title || "Untitled"}
                    </h2>
                    <p className="text-sm text-gray-600">by {data.author || "Unknown Author"}</p>
                    <p className="text-xl font-semibold text-blue-500">
                        ₹{data.price ? data.price.toFixed(2) : "N/A"}
                    </p>
                </div>
            </div>
        </Link>
        </>
    );
};

export default BookCard;
