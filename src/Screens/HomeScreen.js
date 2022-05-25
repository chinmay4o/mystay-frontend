import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Hero from "../Components/HomeComponets/Hero";
import Hero2 from "../Components/HomeComponets/Hero2";
import Hero3 from "../Components/HomeComponets/Hero3";
import Locations from "../Components/HomeComponets/Locations";
import Footer from "./Footer";

const HomeScreen = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  //Adding razorpay script to boilerplate
  function loadRazorpay() {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
    return;
  }

  useEffect(() => {
    loadRazorpay();
  }, []);

  return (
    <div className="homeScreen-container">
      <Navbar />
      {/* <Hero3 /> */}
      {/* <Hero2 /> */}
      <Hero
        checkIn={checkIn}
        setCheckIn={setCheckIn}
        checkOut={checkOut}
        setCheckOut={setCheckOut}
      />
      <Locations 
        checkIn={checkIn} setCheckIn={setCheckIn} checkOut={checkOut} setCheckOut={setCheckOut}
      />
      <Footer />
    </div>
  );
};

export default HomeScreen;
