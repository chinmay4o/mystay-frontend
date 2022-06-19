import React, { useState, useEffect, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {HotelContext} from "../../context/hotelsContext.js";
import { configData } from "../../Config/config.js";

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
      `${configData.SERVER_URL}/api/v1/anonymous/hotels?city=${city}&checkIn=${checkIn}&checkOut=${checkOut}`,

      // `http://localhost:5001/api/v1/anonymous/hotels?city=${city}&checkIn=${checkIn}&checkOut=${checkOut}`,
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
        <div className="city-picture">
          {/* <img src="" alt="" /> */}
          <h1 className="cityName">{allSearchedHotels.data[0].city.toLowerCase()}</h1>
        </div>

        {/* <div className="about-city">
          <h1 className="cityName-h1">{allSearchedHotels.data[0].city}</h1>

          <p className="cityInfo-p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
            maiores, dolore id adipisci illum officia pariatur vitae voluptatum
            vel quo similique totam ad nam odio, modi distinctio quod tenetur
            inventore?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
            maiores, dolore id adipisci illum officia pariatur vitae voluptatum
            vel quo similique totam ad nam odio, modi distinctio quod tenetur
            inventore?
          </p>
        </div> */}

        <div className="hotels-available">
          <h1 className="title-available-hotels">Stays At {allSearchedHotels.data[0].city}</h1>

          {/* array.map Hotels in City */}
           <div className="available-hotels">
                {allSearchedHotels.data.map((ele, index) => {
                    return (
                      <div className="one-hotel" onClick={() => history.push(`/hotel/${ele.hotelId}?checkIn=${checkIn}&checkOut=${checkOut}`)}> 
                      <div className="img" style={{"backgroundImage" : `url(${ele.images[0]})`}}>
                        {/* <img src={ele.images[0]} alt="" /> */}
                      </div>

                      <div className="hotel-description">
                         <p className="brand-name">Mystay Townhouse</p>
                         <h2 className="hotel-title">{ele.hotelName}</h2>

                         <p className="hotel-moreinfo">
                           {ele.description}
                         </p>

                         <div className="view-btn">
                           View <i class="fas fa-long-arrow-alt-right"></i>
                         </div>
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
