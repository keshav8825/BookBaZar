import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      price: 999, // Price in Rupees
      quantity: 1,
      url: "https://images-na.ssl-images-amazon.com/images/I/81OthjkJBuL.jpg"
    },
    {
      id: 2,
      title: "Do Epic Shit",
      author: "Ankur Warikoo",
      price: 1199, // Price in Rupees
      quantity: 1,
      url: "https://images-na.ssl-images-amazon.com/images/I/81g1g1g1gPL.jpg"
    }
  ]);

  const navigate = useNavigate();

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    // Logic for checkout (e.g., navigate to checkout page)
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 py-12 px-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-4">
              <img src={item.url} alt={item.title} className="w-20 h-30 rounded" />
              <div className="flex-1 mx-4">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-600">Author: {item.author}</p>
                <p className="text-gray-600">Price: ₹{item.price.toFixed(2)}</p> {/* Price in Rupees */}
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="bg-gray-300 text-gray-800 px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="bg-gray-300 text-gray-800 px-2 py-1 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="ml-4 text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between mt-4 border-t pt-4">
            <h2 className="text-xl font-bold">Total: ₹{calculateTotal()}</h2> {/* Total in Rupees */}
            <button
              onClick={handleCheckout}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;