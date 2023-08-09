import React from "react";
import { UserContext } from "../../context/hotelsContext";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const UserBookings = () => {
  const history = useHistory();
  const [bookings, setBookings] = useState(null);
  const [hotels, setHotels] = useState(null);

  const dateParser = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  React.useEffect(() => {
    if (!bookings) {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        history.push("/login");
      } else {
        fetch("http://localhost:5001/api/v1/customer/bookings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            setBookings(data.message.user.roomBookings);
            setHotels(data.message.hotels);
          });
      }
    }
    // console.log(bookings, hotels);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-8 p-6 w-full">
      <div className="text-2xl md:text-4xl text-primary font-bold">
        Your Bookings
      </div>
      {bookings &&
      hotels &&
        bookings.length > 0 &&
        bookings.map((booking, index) => {
          const hotel = hotels.find((hotel) => hotel.hotelId === booking.hotelId);
        //   console.log(hotel);
          return (
            <div key={index} className="w-full flex  items-center justify-center">
              {booking.status === "Booked" ? (
                <div className="w-full md:w-1/2 flex  items-center justify-center gap-4 md:gap-8 p-4 rounded-lg border-2 border-green-400">
                  <div className="flex flex-col gap-2">
                    <div className="">
                      <span className="font-bold">Hotel: </span>
                      {hotel.hotelName}
                    </div>
                    <div>
                      <span className="font-bold">Address: </span>
                      {hotel.address}
                    </div>
                    <div>
                      <span className="font-bold">City: </span>
                      {hotel.city.charAt(0).toUpperCase() + hotel.city.slice(1)}
                    </div>
                  </div>
                  <div>
                    <div>
                      <span className="font-bold">From </span>
                      {dateParser(booking.checkIn)}
                    </div>
                    <div>
                      <span className="font-bold">To </span>
                      {dateParser(booking.checkOut)}
                    </div>
                  </div>
                  <div>
                    <div>
                      <span className="font-bold">Booking Amount: </span>
                      {booking.totalRoomAmount.amount}
                    </div>
                    <div>
                      <span className="font-bold">Amount Paid: </span>
                      {booking.totalRoomAmount.paidAmount}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full md:w-1/2 flex justify-center items-center gap-4 md:gap-8 p-4 rounded-lg border-2 border-red-400">
                  <div className="flex flex-col gap-2">
                    <div className="">
                      <span className="font-bold">Hotel: </span>
                      {hotel.hotelName}
                    </div>
                    <div>
                      <span className="font-bold">Address: </span>
                      {hotel.address}
                    </div>
                    <div>
                      <span className="font-bold">City: </span>
                      {hotel.city.charAt(0).toUpperCase() + hotel.city.slice(1)}
                    </div>
                  </div>
                  <div>
                    <div>
                      <span className="font-bold">From </span>
                      {dateParser(booking.checkIn)}
                    </div>
                    <div>
                      <span className="font-bold">To </span>
                      {dateParser(booking.checkOut)}
                    </div>
                  </div>
                  <div>
                    <div>
                      <span className="font-bold">Booking Amount: </span>
                      {booking.totalRoomAmount.amount}
                    </div>
                    <div>
                      <span className="font-bold">Amount Paid: </span>
                      {booking.totalRoomAmount.paidAmount}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default UserBookings;
