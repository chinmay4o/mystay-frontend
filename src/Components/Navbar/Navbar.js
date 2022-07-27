import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import citiesD from "../HomeComponets/citiesData.js";
import { nanoid } from "nanoid";

const Navbar = ({ setDestination }) => {
  const history = useHistory();
  const [show, setShow] = useState("none");

  return (
    <div id="nav-parent">
      <nav class="navbar">
        <div class="logo" onClick={() => history.push("/")}>
          <img
            // src="https://ik.imagekit.io/k3m4pqzpmlr/Logo/mystay-logo-removebg-preview_s7Qj1Ibh3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655707681416"
            src="https://ik.imagekit.io/k3m4pqzpmlr/Hotel_pictures/mystay-logo-removebg-preview_Gu-jhBpNX.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656660679160"
            alt="mystay"
            className="logo-img"
          />
          {/* My<span>Stay</span>{" "} */}
        </div>

        <div className="spacer"></div>
        <input type="checkbox" id="click" />
        <label for="click" class="menu-btn">
          <i class="fas fa-bars"></i>
          {/* <i class="fas fa-basketball-ball" onclick="ulClose()"></i> */}
        </label>

        <ul class="menu_ul">
          <li
            class="Destination-box"
            onClick={() => setShow(show === "none" ? "grid" : "none")}
          >
            {/* <a href="#location"> */}
            <a>
              {" "}
              {/* <i class="fas fa-home"></i> */}
              Search Destination <i class="fas fa-angle-down"></i>
              {citiesD.length !== 0 && (
                <div
                  className="Destination-dataResult"
                  style={{ display: show }}
                >
                  {citiesD.slice(0, 15).map((ele, index) => {
                    return (
                      <p
                        className="dataItem"
                        onClick={() => {
                          // setDestination(ele.city.toLowerCase());
                          history.push(
                            `/hotels?city=${ele.city.toLowerCase()}&checkIn=${localStorage.getItem(
                              "checkIn"
                            )}&checkOut=${localStorage.getItem("checkOut")}`
                          );
                        }}
                        key={nanoid()}
                      >
                        {/* <p className="dataItem"> */}
                        {/* <img src={ele.img} alt="" className="img-search" /> */}
                        <p>{ele.city} </p>
                      </p>
                    );
                  })}
                </div>
              )}
            </a>
          </li>
          <li class="nav_about">
            <a onClick={() => history.push(`/longstays`)}>
              {" "}
              {/* <i class="fas fa-people-carry"></i> */}
              Longstays <i class="fas fa-angle-down"></i>
            </a>
          </li>
          <li class="nav_work">
            <a
              href="https://master.d3mfetjd9ywif7.amplifyapp.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              {" "}
              {/* <i class="fas fa-globe-americas"></i>  */}
              Coworking
            </a>
          </li>
          <li
            class="nav_work"
            style={{ cursor: "pointer" }}
            onClick={() => history.push(`/aboutus`)}
          >
            {" "}
            <a>About Us</a>
          </li>
          <li class="nav_contact">
            <a href="#contact" className="contact">
              {" "}
              <p className="text-muted">
                <i className="fas fa-mobile-alt"></i>
                Customer Support
              </p>
              +91 8952093209
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
