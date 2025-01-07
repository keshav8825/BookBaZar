import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle menu toggle

  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About Us",
      link: "/about-us",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/Profile",
    },
  ];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn );
  if (isLoggedIn === false){
    links.splice(2,3);
  }

  return (
    <div className="flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
      <Link to="/" className="flex items-center">
        <img
          className="h-10 me-4"
          src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
          alt="logo"
        />
        <h1 className="text-2xl font-semibold">BookBazar</h1>
      </Link>

      {/* Desktop View: Nav links and Login/Signup buttons */}
      <div className="hidden md:flex items-center gap-4">
        <div className="flex gap-5">
          {links.map((item, i) => (
            <Link
              to={item.link}
              className="hover:text-blue-500 transition-all duration-300"
              key={i}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="flex gap-4">
          <Link
            to="/LogIn"
            className="px-2 py-1 border border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300"
          >
            LogIn
          </Link>
          <Link
            to="/SignUp"
            className="px-2 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          >
            SignUp
          </Link>
        </div>
      </div>

      {/* Mobile View: Hamburger Menu */}
      <div className="md:hidden flex items-center">
        <button
          className="text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-zinc-800 text-white px-6 py-4 md:hidden">
          <div className="flex flex-col items-center gap-4">
            {links.map((item, i) => (
              <Link
                to={item.link}
                className="hover:text-blue-500 transition-all duration-300"
                key={i}
                onClick={() => setIsMenuOpen(false)} // Close menu on link click
              >
                {item.title}
              </Link>
            ))}
            <div className="flex flex-col gap-4">
              <Link
                to="/LogIn"
                className="px-2 py-1 border border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                LogIn
              </Link>
              <Link
                to="/SignUp"
                className="px-2 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                SignUp
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
