import React, { useState } from "react";
import axios from "axios";

const SaleBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
    bookType: "",
    condition: "",
  });

  const [file, setFile] = useState(null); // State to manage file input
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Store the selected file
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formDataWithFile = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataWithFile.append(key, formData[key]);
    });
    if (file) {
      formDataWithFile.append("file", file);
    }

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const response = await axios.post(
        "http://localhost:3000/api/v1/add-book",
        formDataWithFile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: userId,
            "Content-Type": "multipart/form-data", // Set header for file uploads
          },
        }
      );

      setMessage(response.data.message);
      setFormData({
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
        bookType: "",
        condition: "",
      });
      setFile(null); // Clear the file input
    } catch (error) {
      console.error("Error adding book:", error);
      setMessage(error.response?.data?.message || "Failed to add the book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 py-12 px-6 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Add a Book for Sale
        </h2>
        {message && (
          <p
            className={`text-center mb-4 ${
              message.includes("successfully")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Book Title"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price (in ₹)"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            placeholder="Description"
            rows="4"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            placeholder="Language"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="bookType"
            value={formData.bookType}
            onChange={handleChange}
            placeholder="Book Type (e.g., Hardcover, Paperback)"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            placeholder="Condition (e.g., New, Like New, Used)"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SaleBook;
