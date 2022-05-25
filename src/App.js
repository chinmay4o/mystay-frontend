import logo from "./logo.svg";
import "./scss/style.css";
import "./scss/mobile.css";
import HomeScreen from "./Screens/HomeScreen";
import HotelsCityScreen from "./Screens/HotelsCityScreen";
import SingleHotelScreen from "./Screens/SingleHotelScreen";
import BookingScreen from "./Screens/BookingScreen";
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

                <Route path="/hotels">
                  <HotelsCityScreen />
                </Route>

                <Route path="/hotel/:id">
                  <SingleHotelScreen />
                </Route>

                <Route path="/booking">
                  <BookingScreen />
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
