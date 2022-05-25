import React, { useState, UseEffect, useContext } from "react";
import SearchBar from "../SearchBar/SearchBar.js";
import cities from "./citiesData.js";
import { HotelContext } from "../../context/hotelsContext.js";
import { useHistory } from "react-router-dom";
import "../SearchBar/DatePicker.css";

// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css"; 
import { DateRange } from "react-date-range";

const Hero2 = () => {
  const history = useHistory();
  let today = new Date();
  var tomorrow = new Date(today.getTime() + 48 * 60 * 60 * 1000);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  let currentDateValue = today.toISOString().substring(0, 10);
  let nextDateValue = tomorrow.toISOString().substring(0, 10);

  const hotels = useContext(HotelContext);

  const [destination, setDestination] = useState("bangalore");
  // const [checkIn, setCheckIn] = useState(JSON.stringify(new Date()));
  const [checkIn, setCheckIn] = useState(currentDateValue);
  const [checkOut, setCheckOut] = useState(nextDateValue);

  return (
    <div className="hero-container">
      {/* {hotels.state.name} */}
      <div className="hero-box1">
        <div className="search-box1">
          <div className="input-container">
            <label htmlFor="destination">Select Your Destination</label>
            <SearchBar data={cities} placeholder="Jaipur, Gurugram, Indore" />
            {/* <input type="text" placeholder="eg. Jaipur, Gurugram, Indore" id="destination"/> */}
          </div>
          <div className="checkin-container">
            <label htmlFor="checkin">Check In</label>
            <DateRange
              editableDateInputs={false}
              onChange={(item) => setState([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={state}
            />
          </div>
          {/* <div className="checkin-container">
            <label htmlFor="checkin">Check In</label>
            <input
              type="date"
              id="datepicker"
              autocomplete="off"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="checkout-container">
            <label htmlFor="checkout">Check Out</label>
            <input
              type="date"
              value={checkOut}
              // id="datepicker"
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div> */}

          <div className="book-container">
            <div
              className="btn-book"
              onClick={() => {
                localStorage.setItem("destination", destination);
                localStorage.setItem("checkIn", JSON.stringify(checkIn));
                //  localStorage.setItem("checkIn", checkIn);
                localStorage.setItem("checkOut", JSON.stringify(checkOut));
                //  localStorage.setItem("checkOut", checkOut);
                console.log(checkIn, "checkIn");
                history.push(
                  `/hotels?city=${destination}&checkIn=${JSON.stringify(
                    checkIn
                  )}&checkOut=${JSON.stringify(checkOut)}`
                );
              }}
            >
              Book Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;
