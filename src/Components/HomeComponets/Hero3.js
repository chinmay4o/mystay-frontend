// import React, { useState, useEffect, useContext } from "react";
// import SearchBar from "../SearchBar/SearchBar.js";
// import cities from "./citiesData.js";
// import { HotelContext } from "../../context/hotelsContext.js";
// import { useHistory } from "react-router-dom";
// import "../SearchBar/DatePicker.css";
// import TextField from "@mui/material/TextField";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// const Hero3 = ({
//   checkIn,
//   checkOut,
//   setCheckIn,
//   setCheckOut,
//   destination,
//   setDestination
// }) => {
//   const [value, setValue] = useState();
//   const history = useHistory();
//   let yesterday = new Date();
//   let today = new Date(yesterday.getTime() + 24 * 60 * 60 * 1000);
//   var tomorrow = new Date(today.getTime() + 48 * 60 * 60 * 1000);

//   let currentDateValue = today.toISOString().substring(0, 10);
//   let nextDateValue = tomorrow.toISOString().substring(0, 10);

//   const hotels = useContext(HotelContext);

//   const [tooltip, setTooltip] = useState("none");
//   // const [destination, setDestination] = useState("bangalore");
//   // const [destination, setDestination] = useState("");
//   // const [checkIn, setCheckIn] = useState(JSON.stringify(new Date()));
//   // const [checkIn, setCheckIn] = useState(currentDateValue);
//   // const [checkOut, setCheckOut] = useState(nextDateValue);

//   useEffect(() => {
//     setCheckIn(currentDateValue);
//     setCheckOut(nextDateValue);
//   });

//   return (
//     <div className="hero-container">
//       {/* {hotels.state.name} */}
//       <div className="hero-box1">
//         {/* empty div to adjust center positioning */}
//         <div></div>
//         <h2 className="explore-title">Ready to explore with MyStay?</h2>
//         <div className="search-box">
//           <div className="input-container">
//             <label htmlFor="destination">Select Your Destination</label>
//             <SearchBar
//               data={cities}
//               placeholder="Jaipur, Gurugram, Indore"
//               setDestination={setDestination}
//             />
//             {/* <input type="text" placeholder="eg. Jaipur, Gurugram, Indore" id="destination"/> */}
//           </div>
//           <div className="checkin-container">
//             <label htmlFor="checkin">Check In</label>
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <DatePicker
//                 label="Basic example"
//                 value={value}
//                 onChange={(newValue) => {
//                   setValue(newValue);
//                 }}
//                 renderInput={(params) => <TextField {...params} />}
//               />
//             </LocalizationProvider>
//           </div>
//           <div className="checkout-container">
//             <label htmlFor="checkout">Check Out</label>
//             <input
//               type="date"
//               value={checkOut}
//               // id="datepicker"
//               onChange={(e) => setCheckOut(e.target.value)}
//             />
//           </div>

//           <div className="book-container">
//             <div
//               className="btn-book"
//               onClick={() => {
//                 if (!destination || !checkOut || !checkIn) {
//                   setTooltip("grid");
//                 } else {
//                   localStorage.setItem("destination", destination);
//                   localStorage.setItem("checkIn", JSON.stringify(checkIn));
//                   //  localStorage.setItem("checkIn", checkIn);
//                   localStorage.setItem("checkOut", JSON.stringify(checkOut));
//                   //  localStorage.setItem("checkOut", checkOut);
//                   console.log(checkIn, "checkIn");
//                   history.push(
//                     `/hotels?city=${destination}&checkIn=${JSON.stringify(
//                       checkIn
//                     )}&checkOut=${JSON.stringify(checkOut)}`
//                   );
//                 }
//               }}
//             >
//               Book Now
//               <div className="tooltip" style={{ display: tooltip }}>
//                 {" "}
//                 Please fill all the details
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* empty div to adjust center positioning */}
//         <div></div>
//       </div>
//     </div>
//   );
// };

// export default Hero3;
