import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
      {/* Company Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full mb-12">
        <h2 className="text-4xl font-semibold text-center text-indigo-700 mb-6">
          About BookBazar
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          BookBazar is a revolutionary platform designed to connect book lovers, readers, and sellers in an easy and accessible environment. We provide a seamless online marketplace where people can buy and sell pre-loved books, making it easier to find the perfect book at an affordable price. Whether you're looking for the latest best-sellers, niche genres, or rare editions, BookBazar has it all.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Our mission is to promote a circular economy by reusing and recycling books. At BookBazar, we believe that books should never be out of reach, regardless of your location or budget. Our platform enables readers to find a wide selection of books in a secure and easy-to-use environment.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          We strive to make the process of buying and selling books as easy as possible. With secure payment options, efficient delivery services, and user-friendly features, we aim to bring together a global community of book enthusiasts. Join us today and help us make reading accessible to all!
        </p>
        <p className="text-lg text-gray-700">
          BookBazar isn’t just a platform; it’s a community of book lovers, creators, and readers who share the joy of books. Whether you are a casual reader or a passionate bibliophile, there’s a place for you here at BookBazar.
        </p>
      </div>

      {/* Developer Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-4xl font-semibold text-center text-indigo-700 mb-6">
          Meet the Developers
        </h2>
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Keshav, Sheran, Yash, and Shiv Shankar
          </h3>
          <p className="text-lg text-gray-700 mb-4">
            The team behind BookBazar is a group of passionate developers and tech enthusiasts who share a common vision: to make books accessible to everyone. With expertise in full-stack development, they have come together to build a robust, scalable platform that connects readers and sellers in an innovative way.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Each of our developers brings a unique set of skills and experiences to the table:
          </p>
          <ul className="list-disc pl-6 text-lg text-gray-700 mb-4">
            <li><strong>Keshav:</strong> Full-stack developer with expertise in MERN stack. Specializes in back-end architecture and API integration.</li>
            <li><strong>Sheran:</strong> Front-end developer with a passion for designing intuitive and responsive UIs using React and Tailwind CSS.</li>
            <li><strong>Yash:</strong> Backend developer with experience in database management, server-side logic, and optimizing performance.</li>
            <li><strong>Shiv Shankar:</strong> UI/UX designer and front-end developer, focusing on creating smooth and delightful user experiences.</li>
          </ul>
          <p className="text-lg text-gray-700">
            Together, they have crafted BookBazar with a focus on functionality, user experience, and scalability. The platform is continuously evolving with new features, and our team is always looking for ways to improve the experience for users worldwide.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;




