import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Hero from "../Components/HomeComponets/Hero";
// import Hero2 from "../Components/HomeComponets/Hero2";
import Hero3 from "../Components/HomeComponets/Hero3";
import Locations from "../Components/HomeComponets/Locations";
import Trust from "../Components/HomeComponets/Trust";
import Reviews from "../Components/HomeComponets/Reviews";
import Features from "../Components/HomeComponets/Features";
import Footer from "./Footer";

const HomeScreen = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [destination, setDestination] = useState("bangalore");

  return (
    <div className="homeScreen-container">
      <Navbar destination={destination} setDestination={setDestination} />
      <Hero3 
         checkIn={checkIn}
        setCheckIn={setCheckIn}
        checkOut={checkOut}
        setCheckOut={setCheckOut}
        destination={destination}
        setDestination={setDestination}
      />
      {/* <Hero2 /> */}
      {/* <Hero
        checkIn={checkIn}
        setCheckIn={setCheckIn}
        checkOut={checkOut}
        setCheckOut={setCheckOut}
        destination={destination}
        setDestination={setDestination}
      /> */}
      <Features />
      <Locations
        checkIn={checkIn}
        setCheckIn={setCheckIn}
        checkOut={checkOut}
        setCheckOut={setCheckOut}
      />
      <Trust
        checkIn={checkIn}
        setCheckIn={setCheckIn}
        checkOut={checkOut}
        setCheckOut={setCheckOut}
      />
      <Reviews />
      <Footer />
    </div>
  );
};

export default HomeScreen;
