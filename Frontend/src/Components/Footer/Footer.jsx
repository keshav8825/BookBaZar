import React from "react";

const Footer = () => {
  const quickLinks = [
    { title: "Home", link: "/" },
    { title: "About Us", link: "/about-us" },
    { title: "All Books", link: "/all-books" },
    { title: "Contact Us", link: "/contact-us" },
    { title: "FAQ", link: "/faq" },
  ];

  const policyLinks = [
    { title: "Privacy Policy", link: "/privacy-policy" },
    { title: "Terms of Service", link: "/terms-of-service" },
    { title: "Refund Policy", link: "/refund-policy" },
    { title: "Shipping Info", link: "/shipping-info" },
  ];

  return (
    <div className="bg-blue-200 h-screen flex flex-col">
    <footer className="bg-gradient-to-b from-blue-900 to-blue-950 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
                alt="BookBazar Logo"
                className="h-10 w-10"
              />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                BookBazar
              </h2>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Discover a world of second-hand books, save money, and connect with fellow book lovers. 
              Buy, sell, and share your favorite reads!
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2"
                  >
                    <span className="h-1 w-1 bg-blue-400 rounded-full"></span>
                    <span>{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Our Policies</h3>
            <ul className="space-y-2">
              {policyLinks.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2"
                  >
                    <span className="h-1 w-1 bg-blue-400 rounded-full"></span>
                    <span>{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
            <p className="text-sm text-gray-300">
              Subscribe to our newsletter for the latest updates and deals.
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-blue-800/50 rounded-lg focus:outline-none focus:ring-2 
                         focus:ring-blue-400 text-white placeholder-gray-400"
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                             transition-colors duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>

            {/* Contact Info */}
            <div className="pt-4 space-y-2">
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-white">Email:</span> support@bookbazar.com
              </p>
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-white">Phone:</span> +91 7644808208
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-blue-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} BookBazar. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-6">
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300 
                           transform hover:scale-110"
                >
                  <span className="sr-only">{social}</span>
                  <i className={`fab fa-${social.toLowerCase()}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;