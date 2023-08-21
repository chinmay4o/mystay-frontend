import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import citiesD from "../HomeComponets/citiesData.js";
import { nanoid } from "nanoid";

const DesktopComponent = ({ userData }) => {
    const history = useHistory();
    const [show, setShow] = useState("none");
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="w-screen h-16 flex px-8 py-4 items-center lg:justify-between">
        <div className="w-full p-2 flex justify-between items-center">
          <div className="" onClick={() => history.push("/")}>
            {/* <img
              // src="https://ik.imagekit.io/k3m4pqzpmlr/Logo/mystay-logo-removebg-preview_s7Qj1Ibh3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655707681416"
              src="https://ik.imagekit.io/k3m4pqzpmlr/Hotel_pictures/mystay-logo-removebg-preview_Gu-jhBpNX.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656660679160"
              alt="mystay"
              className="h-12 w-14 lg:h-14 lg:w-16 object-contain"
            /> */}
            My<span>Stay</span>{" "}
          </div>
        </div>
        <div
          className={`transition-all  duration-300   flex justify-evenly items-center gap-4 lg:gap-10  flex-shrink-0 text-base lg:text-md   text-black font-semibold `}
        >
          <div
            className="hover:text-primary cursor-pointer relative"
            onClick={() => setShow(show === "none" ? "grid" : "none")}
          >
            {/* <a href="#location"> */}
            <a>
              {" "}
              {/* <i className="fas fa-home"></i> */}
              Search Destination <i className="fas fa-angle-down"></i>
              {citiesD.length !== 0 && (
                <div
                  className="absolute z-[100] max-w-[410px] grid mt-3 py-3 min-w-[210px] overflow-hidden overflow-y-auto shadow-lg gap-y-2 place-items-center grid-cols-1 grid-rows-2 rounded-lg bg-white "
                  style={{ display: show }}
                >
                  {citiesD.slice(0, 15).map((ele, index) => {
                    return (
                      <p
                        className="cursor-pointer"
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
                        <p className=" hover:text-black text-md text-[#c7c7c7]">
                          {ele.city}{" "}
                        </p>
                      </p>
                    );
                  })}
                </div>
              )}
            </a>
          </div>
          <div className="hover:text-primary cursor-pointer">
            <a onClick={() => history.push(`/longstays`)}>
              {" "}
              {/* <i className="fas fa-people-carry"></i> */}
              Longstays <i className="fas fa-angle-down"></i>
            </a>
          </div>
          <div className="hover:text-primary cursor-pointer">
            <a
              href="https://master.d3mfetjd9ywif7.amplifyapp.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              {" "}
              {/* <i className="fas fa-globe-americas"></i>  */}
              Coworking
            </a>
          </div>
          <div
            className="hover:text-primary cursor-pointer"
            style={{ cursor: "pointer" }}
            onClick={() => history.push(`/aboutus`)}
          >
            {" "}
            <a>About Us</a>
          </div>
          {!userData && (
            <div
              className="hover:text-primary cursor-pointer"
              onClick={() => history.push("/login")}
            >
              Login
            </div>
          )}
          {userData && (
            <>
              <div
                className="hover:text-primary cursor-pointer"
                onClick={() => history.push("/bookings")}
              >
                User Bookings
              </div>
              <div className="hover:stroke-primary stroke-black cursor-pointer" onClick={()=> history.push("/profile")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 stroke-inherit"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

export default DesktopComponent