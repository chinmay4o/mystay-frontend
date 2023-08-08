import logo from "./logo.svg";
import "./App.css";
import "./scss/style.css";
import "./scss/mobile.css";
import HomeScreen from "./Screens/HomeScreen";
import Aboutus from "./Screens/Aboutus";
import HotelsCityScreen from "./Screens/HotelsCityScreen";
import SingleHotelScreen from "./Screens/SingleHotelScreen";
import BookingScreen from "./Screens/BookingScreen";
import CongratsScreen from "./Screens/CongratsScreen";
import LongStaysScreen from "./Screens/LongStaysScreen";
import HotelState from "./context/HotelSate.js";
import BookedRoomsState from "./context/BookedRoomsState.js";
import SliderImageState from "./context/SliderImageState.js";
import UserStateContext from "./context/UserContext.js";
import "./App.css"
import { BrowserRouter as Router, Route } from "react-router-dom";
import VerifyOtp from "./Screens/VerifyOtp";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import React from "react";
import UserBooking from "./Screens/UserBooking";


function App() {


  return (
    <Router>
      <UserStateContext>
      <HotelState>
        <BookedRoomsState>
          <SliderImageState>
            <div id="parent">
              <div className="layout-container">
                <Route exact path="/">
                  <HomeScreen />
                </Route>

                <Route path="/aboutus">
                  <Aboutus />
                </Route>

                <Route path="/hotels">
                  <HotelsCityScreen />
                </Route>

                <Route path="/hotel/:id">
                  <SingleHotelScreen />
                </Route>

                <Route path="/booking">
                  <BookingScreen />
                </Route>

                <Route path="/longstays">
                  <LongStaysScreen />
                </Route>

                <Route path="/verify">
                  <VerifyOtp />
                </Route>

                <Route path= "/payment/:id">
                  <CongratsScreen />
                </Route>
                <Route path= "/login">
                  <Login />
                </Route>

                <Route path = "/signup">
                  <Signup />
                </Route>

                <Route path= "/bookings">
                  <UserBooking />
                </Route>
              </div>
            </div>
          </SliderImageState>
        </BookedRoomsState>
      </HotelState>
      </UserStateContext>
    </Router>
  );
}

export default App;
