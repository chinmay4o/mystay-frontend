import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { HotelContext } from "../../context/hotelsContext.js";
import RoomCard from "../RoomCard/RoomCard";

const SingleHotel = () => {
  let { id } = useParams();

  const [singleHotel, setSingleHotel] = useState({ success: false });

  const [bookedRooms, setBookedRooms] = useState([]);

  const { allSearchedHotels, setAllSearchedHotels } = useContext(HotelContext);

  let imgClasses = ["a1", "b1", "c1", "d1"];

  let destination = localStorage.getItem("destination");
  let checkIn = localStorage.getItem("checkIn");
  let checkOut = localStorage.getItem("checkOut");

  async function getAllHotels() {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/anonymous/api/v1/hotels?city=${destination}&checkIn=${checkIn}&checkOut=${checkOut}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    setAllSearchedHotels(data);
    console.log(data, "setAllSearchedHotels");
  }

  useEffect(() => {
    console.log(allSearchedHotels.success);
    if (allSearchedHotels.success === false) {
      getAllHotels();

      if (allSearchedHotels.success === true) {
        setSingleHotel(allSearchedHotels.data.find((ele, index) => {
          return ele.hotelId === id;
        }));
      }
    } else {
      console.log("AllSearchedHotels Not Found");
    }
    window.scrollTo(0, 0);
  }, []);

  if (!singleHotel.hotelName) {
    return <h2> Loading ...</h2>;
  } else if (allSearchedHotels.success === false) {
    return <h2> Loading ...</h2>;
  } else {
    return (
      <>
        <div className="single-hotel-images">
          {singleHotel.images.map((ele, index) => {
            return (
              <div className={imgClasses[index]}>
                <img src={ele} alt="more" />
              </div>
            );
          })}
        </div>

        <div className="hotel-details">
          <div className="hotel-info">
            <p className="hotel-title">{singleHotel.hotelName}</p>

            <p className="hotel-description">{singleHotel.description}</p>
          </div>
          <div className="hotel-amenities">
            <p className="sub-title">Amenities</p>

            <div className="amenities-grid">
              {singleHotel.amenities.map((ele, index) => {
                return <div className="one-amenity">{ele}</div>;
              })}
            </div>
          </div>
        </div>

        <div className="hotel-room-details">
          {/* date grid */}
          <div className="box1">
            <div className="date-grid">
              <div className="static-details">
                <p className="sub-title">Book Your Stay</p>
                <p className="sub-title-info">
                  Select from a range of beautiful rooms
                </p>
              </div>

              <div className="date-select">
                <input type="date" />
                <p className="arrow">
                  <i className="fas fa-long-arrow-alt-right"></i>{" "}
                </p>
                <input type="date" />
              </div>
            </div>
            {/* end of date grid */}

            {/* hotel rooms mapping */}
            <div className="room-booking-details">
              {singleHotel.rooms.map((ele, index) => {
                return <RoomCard ele={ele} />;
              })}
            </div>
          </div>

          <div className="box2">
            <div className="order-box">
              <p className="order-title">Summary</p>

              <p className="dynamic-date-box">
                checkIn date
                {/* {checkIn} */}
              </p>

              <div className="dynamic-room-details">
                {bookedRooms.length === 0 ? (
                  <p>No Rooms Selected</p>
                ) : (
                  bookedRooms.map((ele, index) => {
                    return (
                      <div className="dynamic-room-pricing">
                        <p> {ele.roomType} </p>
                        <p> {ele.roomPrice} </p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default SingleHotel;
