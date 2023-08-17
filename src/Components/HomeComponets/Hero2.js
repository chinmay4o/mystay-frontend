import React, { useState, useEffect, useContext } from "react";
import SearchBar from "../SearchBar/SearchBar.js";
import cities from "./citiesData.js";
import { HotelContext } from "../../context/hotelsContext.js";
import { useHistory } from "react-router-dom";
import "../SearchBar/DatePicker.css";
import DatePicker from "react-date-picker";

const Hero = ({
  checkIn,
  checkOut,
  setCheckIn,
  setCheckOut,
  destination,
  setDestination,
}) => {
  const history = useHistory();
  let yesterday = new Date();
  let today = new Date(yesterday.getTime() + 24 * 60 * 60 * 1000);
  var tomorrow = new Date(today.getTime() + 48 * 60 * 60 * 1000);

  let currentDateValue = today.toISOString().substring(0, 10);
  let nextDateValue = tomorrow.toISOString().substring(0, 10);

  const hotels = useContext(HotelContext);

  const [tooltip, setTooltip] = useState("none");
  // const [destination, setDestination] = useState("bangalore");
  // const [destination, setDestination] = useState("");
  // const [checkIn, setCheckIn] = useState(JSON.stringify(new Date()));
  // const [checkIn, setCheckIn] = useState(currentDateValue);
  // const [checkOut, setCheckOut] = useState(nextDateValue);

  useEffect(() => {
    setCheckIn(currentDateValue);
    setCheckOut(nextDateValue);
  });

  return (
    <div className="hero-container">
      {/* {hotels.state.name} */}
      <div className="hero-box1">
        {/* empty div to adjust center positioning */}
        <div></div>
        <h2 className="explore-title">Ready to explore with MyStay?</h2>
        <div className="search-box">
          <div className="input-container">
            <label htmlFor="destination">Select Your Destination</label>
            <SearchBar
              data={cities}
              placeholder="Search Destination..."
              setDestination={setDestination}
            />
            {/* <input type="text" placeholder="eg. Jaipur, Gurugram, Indore" id="destination"/> */}
          </div>
          <div className="checkin-container">
            <label htmlFor="checkin">Check In</label>
            {/* <input
              type="date"
              id="datepicker"
              autocomplete="off"
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                console.log(e.target.value);
              }}
            /> */}
            <DatePicker
              onChange={(value) => {
                console.log(value);
                setCheckIn(value);
              }}
              value={checkIn}
              format="y-MM-dd"
            />
          </div>
          <div className="checkout-container">
            <label htmlFor="checkout">Check Out</label>
            <DatePicker
              onChange={(value) => {
                console.log(value);
                setCheckOut(value);
              }}
              value={checkOut}
            />
          </div>

          <div className="book-container">
            <div
              className="btn-book"
              onClick={() => {
                if (!destination || !checkOut || !checkIn) {
                  setTooltip("grid");
                } else {
                  localStorage.setItem("destination", destination);
                  localStorage.setItem("checkIn", JSON.stringify(checkIn));
                  localStorage.setItem("checkOut", JSON.stringify(checkOut));
                  history.push(
                    `/hotels?city=${destination}&checkIn=${JSON.stringify(
                      checkIn
                    )}&checkOut=${JSON.stringify(checkOut)}`
                  );
                }
              }}
            >
              Book Now
              <div className="tooltip" style={{ display: tooltip }}>
                {" "}
                Please fill all the details
              </div>
            </div>
          </div>
        </div>
        {/* empty div to adjust center positioning */}
        <div></div>
      </div>
    </div>
  );
};

export default Hero;
