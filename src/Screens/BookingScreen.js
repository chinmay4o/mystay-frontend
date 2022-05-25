import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import BookingHotel from "../Components/Booking-Componets/BookingHotel";
import Footer from "./Footer";


const BookingScreen = () => {
  return (
    <div className="booking-container">
      <Navbar />

      <BookingHotel />
      <Footer />
    </div>
  );
};
export default BookingScreen;
