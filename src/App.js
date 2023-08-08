import logo from "./logo.svg";
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

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
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

               

                <Route path= "/payment/:id">
                  <CongratsScreen />
                </Route>
              </div>
            </div>
          </SliderImageState>
        </BookedRoomsState>
      </HotelState>
    </Router>
  );
}

export default App;
