import React from "react";
import { useParams, useHistory } from "react-router-dom";

const SingleBookingCompo = () => {
  const history = useHistory();
  const { id } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const [booking, setBooking] = React.useState();
  React.useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/customer/bookings/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accessToken,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message.booking);
        setBooking(data.message.booking);
      });
  }, []);

  return (
    <div>
      {booking && (
        <div>
          <p> Room Number : {booking?.roomNumber}</p>
          <p> Room Id : {booking?.roomId}</p>
          <p> Hotel Name : {booking?.hotelId?.hotelName}</p>
          <p>Check In : {new Date(booking?.checkIn).toDateString()}</p>
          <p>Check Out : {new Date(booking?.checkOut).toDateString()}</p>
          <p>Amount: {booking?.totalRoomAmount?.amount}</p>
          <p>Payment Status: {booking?.status}</p>
        </div>
      )}
    </div>
  );
};

export default SingleBookingCompo;
