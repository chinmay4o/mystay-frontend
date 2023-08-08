import React, { useState, useEffect, useContext } from "react";
import SearchBar from "../SearchBar/SearchBar.js";
import cities from "./citiesData.js";
import { HotelContext } from "../../context/hotelsContext.js";
import { useHistory } from "react-router-dom";
import "../SearchBar/DatePicker.css";
import PrimaryButton from "../../Common/buttons/PrimaryButton.js";

const Hero = ({checkIn, checkOut, setCheckIn, setCheckOut,destination,setDestination }) => {
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
    <div className="hero-image w-full md:w-5/6 md:rounded-3xl md:mt-8 md:mx-auto h-screen md:h-max md:py-24 lg:py-32 md:bg-cover flex flex-col gap-4 items-center p-6 justify-center text-white">
      {/* {hotels.state.name} */}
      
      <h2 className="font-bold text-3xl text-center text-shadow p-6 md:text-4xl lg:text-5xl">Ready to explore with MyStay?</h2>
        <div className="w-full h-4/6 md:h-max xl:w-max bg-white rounded-xl flex  flex-col md:flex-wrap  md:gap-12 md:flex-row justify-between  p-12 text-black text-xl items-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <label htmlFor="destination" className="text-2xl  xl:text-3xl">Select Your Destination</label>
            <SearchBar data={cities} placeholder="Search Destination..." setDestination={setDestination}/>
            {/* <input type="text" placeholder="eg. Jaipur, Gurugram, Indore" id="destination"/> */}
          </div>
          <div className="flex flex-col gap-2 font-mono items-center text-[18px] border-b-2 border-gray-400 font-medium">
            <label htmlFor="checkin" className="font-montserrat xl:text-2xl">Check In</label>
            <input
              type="date"
              id="datepicker"
              autocomplete="off"
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value)
                console.log(e.target.value)
                }}
            />
          </div>
          <div className="flex flex-col gap-2 font-mono items-center text-[18px] border-b-2 border-gray-400 font-medium">
            <label htmlFor="checkout" className="font-montserrat xl:text-2xl">Check Out</label>
            <input
              type="date"
              value={checkOut}
              // id="datepicker"
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          <div className="book-container">
            <PrimaryButton
              text="Book Now"
              onClick={() => {
                if (!destination || !checkOut || !checkIn) {
                  setTooltip("grid");
                } else {
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
                }
              }}
            />
              {/* <div className="tooltip" style={{ display: tooltip }}>
                {" "}
                Please fill all the details
              </div> */}
          </div>
        </div>
        {/* empty div to adjust center positioning */}
    </div>
  );
};

export default Hero;
