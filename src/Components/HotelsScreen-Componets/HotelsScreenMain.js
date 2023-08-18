import React, { useState, useEffect, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {HotelContext} from "../../context/hotelsContext.js";
import { configData } from "../../Config/config.js";
import PrimaryButton from "../../Common/buttons/PrimaryButton.js";

const HotelsScreenMain = () => {
  const history = useHistory();
  const {allSearchedHotels, setAllSearchedHotels} = useContext(HotelContext);
  // const [allHotels, setAllHotels] = useState({success: false});

  const search = useLocation().search;
  const city = new URLSearchParams(search).get("city");
  const checkIn = new URLSearchParams(search).get("checkIn");
  const checkOut = new URLSearchParams(search).get("checkOut");

  async function getAllHotels() {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/anonymous/hotels?city=${city}&checkIn=${checkIn}&checkOut=${checkOut}`,
      // `${process.env.REACT_APP_SERVER_URL}/api/v1/anonymous/hotels?city=${city}&checkIn=${checkIn}&checkOut=${checkOut}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setAllSearchedHotels(data);
    console.log(data);
  }

  useEffect(() => {
    getAllHotels();
    window.scrollTo(0, 0);
  }, []);

  if (allSearchedHotels.success === false) {
    return <h2> Loading ...</h2>;
  } else if (allSearchedHotels.data.length <= 0) {
    return <div className="coming_soon-box"> <h1>Coming Soon ...</h1> </div>;
  } else {
    return (
      <>
        <div className="h-screen w-screen relative ">
          <img src="https://img.cdn.zostel.com/zostel/gallery/images/VFvd-Qq7Q92zkhbjE2ufYA/karnatakas-metropolitan-city-with-its-grand_3lJVBIb.jpg" alt="" className=" brightness-75 h-full w-full object-cover"/>
        </div>
          <h1 className="absolute text-6xl -translate-x-1/2 -translate-y-1/2 font-bold top-1/2 left-1/2 text-white">{allSearchedHotels.data[0].city.toUpperCase()}</h1>

        
        <div className="w-full min-h-[354px] p-5 bg-[#f9f7f1]">
          <h1 className="text-center text-3xl text-primary capitalize mt-6">Stays At {allSearchedHotels.data[0].city}</h1>

          {/* array.map Hotels in City */}
           <div className="flex flex-col w-full p-8 items-center justify-center gap-12 ">
                {allSearchedHotels.data.map((ele, index) => {
                    return (
                      <div className="cursor-pointer flex flex-col md:flex-row gap-6 w-full md:w-4/6 lg:w-1/2" onClick={() => history.push(`/hotel/${ele.hotelId}?checkIn=${checkIn}&checkOut=${checkOut}`)}> 
                      <div className="bg-cover rounded-xl h-[270px] xl:h-96 lg:h-[420px] w-full md:w-1/2" >
                        <img src={ele.images[0]} alt="" className="rounded-xl h-full w-full object-cover"/>
                      </div>

                      <div className="md:w-1/2">
                         <p className="text-lg mb-4 font-bold text-[#6d6d6d]">Mystay Townhouse</p>
                         <h2 className="mb-4 text-2xl font-bold">{ele.hotelName}</h2>

                         <p className="text-lg mb-4 font-semibold text-[#6d6d6d]">
                           {ele.description.slice(0, 200)}...
                         </p>

                        <PrimaryButton text="Book Now" />
                      </div>
                      </div>
                    )
                })}
           </div>
        </div>
      </>
    );
  }
};

export default HotelsScreenMain;
