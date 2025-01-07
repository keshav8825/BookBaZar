import React from "react";
import Hero from "../Components/Home/Hero";
import RecentlyAdded from "../Components/Home/RecantlyAdded";
// import Footer from "../Components/Footer/Footer";

const Home = () => {
    return (
      <div className="flex flex-col min-h-screen bg-blue-200">
        <main className="flex-grow">
          <Hero />
          <RecentlyAdded />
        </main>
        {/* <Footer /> */}
      </div>
    );
  };
  
  export default Home;
