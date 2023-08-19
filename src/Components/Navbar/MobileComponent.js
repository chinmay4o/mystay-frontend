import React, { useState } from "react";
import citiesD from "../HomeComponets/citiesData.js";
import { nanoid } from "nanoid";

import { useHistory } from 'react-router-dom'

const MobileComponent = ({ userData }) => {
    const history = useHistory();
    const [show, setShow] = useState("none");
    const [isOpen, setIsOpen] = useState(false);
  
    console.log(userData);
  
    return (
      <div className="w-screen max-h-screen relative">
        <div className="w-full  p-4 flex justify-between items-center">
          <div className="" onClick={() => history.push("/")}>
            {/* <img
              // src="https://ik.imagekit.io/k3m4pqzpmlr/Logo/mystay-logo-removebg-preview_s7Qj1Ibh3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655707681416"
              src="https://ik.imagekit.io/k3m4pqzpmlr/Hotel_pictures/mystay-logo-removebg-preview_Gu-jhBpNX.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656660679160"
              alt="mystay"
              className="h-10 w-12 object-contain"
            /> */}
            My<span>Stay</span>{" "}
          </div>
          <div
            className="flex flex-col gap-1 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="w-6 bg-primary h-[4px]">&nbsp;</span>
            <span className="w-6 bg-primary h-[4px]">&nbsp;</span>
            <span className="w-6 bg-primary h-[4px]">&nbsp;</span>
          </div>
        </div>
        <div
          className={`transition-all left-0 absolute duration-300 w-full h-screen z-[99999] flex flex-col justify-start items-left text-2xl bg-[#1f202c] p-8 gap-12 text-white font-bold ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
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
                  className="absolute  max-w-[410px] grid mt-3 py-3 min-w-[210px] overflow-hidden overflow-y-auto shadow-lg gap-y-2 place-items-center grid-cols-1 grid-rows-2 rounded-lg bg-white "
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
                        <p className="hover:bg-[#c7c7c7] hover:text-black text-md text-[#c7c7c7]">
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
              <div className="hover:text-primary cursor-pointer" onClick={()=> history.push("/profile")}>
                Profile
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

export default MobileComponent