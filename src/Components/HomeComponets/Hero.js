import React, { useState, useEffect, useContext } from "react";
import SearchBar from "../SearchBar/SearchBar.js";
import cities from "./citiesData.js";
import { HotelContext } from "../../context/hotelsContext.js";
import { useHistory } from "react-router-dom";
import "../SearchBar/DatePicker.css";
import PrimaryButton from "../../Common/buttons/PrimaryButton.js";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

const Hero = ({ dates, setDates, destination, setDestination }) => {
  const history = useHistory();
  let yesterday = new Date();
  let today = new Date(yesterday.getTime() + 24 * 60 * 60 * 1000);
  var tomorrow = new Date(today.getTime() + 48 * 60 * 60 * 1000);

  const hotels = useContext(HotelContext);

  const [tooltip, setTooltip] = useState("none");
  // const [destination, setDestination] = useState("bangalore");
  // const [destination, setDestination] = useState("");
  // const [checkIn, setCheckIn] = useState(JSON.stringify(new Date()));
  // const [checkIn, setCheckIn] = useState(currentDateValue);
  // const [checkOut, setCheckOut] = useState(nextDateValue);

  useEffect(() => {
    if (!dates) {
      setDates([today, tomorrow]);
    }
  }, []);

  return (
    <div className="hero-image w-full md:w-5/6 md:rounded-3xl md:mt-8 md:mx-auto h-screen md:h-max md:py-24 lg:py-32 md:bg-cover flex flex-col gap-4 items-center p-6 justify-center text-white">
      {/* {hotels.state.name} */}

      <h2 className="font-bold text-3xl text-center text-shadow p-6 md:text-4xl lg:text-5xl">
        Ready to explore with MyStay?
      </h2>
      <div className="w-full h-4/6 md:h-max xl:w-max bg-white rounded-xl flex  flex-col md:flex-wrap gap-6 md:gap-12 md:flex-row justify-center  p-12 text-black text-xl items-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <label htmlFor="destination" className="text-2xl  xl:text-3xl">
            Select Your Destination
          </label>
          <SearchBar
            data={cities}
            placeholder="Search Destination..."
            setDestination={setDestination}
          />
          {/* <input type="text" placeholder="eg. Jaipur, Gurugram, Indore" id="destination"/> */}
        </div>

        <div className="flex flex-col gap ">
          <div className="flex  gap-9 justify-evenly font-mono items-center text-[18px]  font-medium outline-none">
            <div className="font-montserrat xl:text-2xl">Check in</div>
            <div className="font-montserrat xl:text-2xl">Check Out</div>
          </div>
          <div className="flex items-center justify-center">
            <DateRangePicker
              format="dMMMy"
              onChange={setDates}
              value={dates}
              rangeDivider="to"
              className="text-[#808080]"
            />
          </div>
        </div>

        <div className="book-container">
          <PrimaryButton
            text="Book Now"
            onClick={() => {
              if (!destination || !dates) {
                setTooltip("grid");
              } else {
                const checkInDate = new Date(new Date(dates[0]).getTime() + 24 * 60 * 60 * 1000).toISOString().substring(0, 10);
                const checkOutDate = new Date(new Date(dates[1]).getTime()).toISOString().substring(0, 10);;
                localStorage.setItem("destination", destination);
                localStorage.setItem("checkIn", JSON.stringify(checkInDate));
                localStorage.setItem("checkOut", JSON.stringify(checkOutDate));
                
                history.push(
                  `/hotels?city=${destination}&checkIn=${JSON.stringify(
                    checkInDate
                  )}&checkOut=${JSON.stringify(checkOutDate)}`
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
