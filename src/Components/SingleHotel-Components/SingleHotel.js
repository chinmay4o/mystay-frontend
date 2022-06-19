import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { SelectedRoomsContext } from "../../context/hotelsContext.js";
import RoomCard from "../RoomCard/RoomCard";
import Slider from "../ReactSlider/Slider";
import Modal from "../Modal/Modal";
import { configData } from "../../Config/config.js";


const SingleHotel = () => {
  const history = useHistory();
  let { id } = useParams();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [singleHotel, setSingleHotel] = useState({ success: false });
  const [sliderShow, setSliderShow] = useState("none");
  const [modalDisplay, setModalDisplay] = useState("none");

  const { selectedRooms, setSelectedRooms } = useContext(SelectedRoomsContext);

  let imgClasses = ["a1", "b1", "c1", "d1"];

  const search = useLocation().search;
  const checkIn = new URLSearchParams(search).get("checkIn");
  const checkOut = new URLSearchParams(search).get("checkOut");

  async function getSingleHotel(id) {
    const response = await fetch(
      // `http://localhost:5001/anonymous/api/v1/hotels?checkIn=2022-04-16T00:00:00.000z&checkOut=2022-04-17T00:00:00.000z&hotelId=${id}`,
      // `http://15.206.116.126:5001/api/v1/anonymous/hotels?checkIn=${JSON.stringify(new Date(checkIn))}&checkOut=${JSON.stringify(new Date(checkOut))}&hotelId=${id}`,
      `${configData.SERVER_URL}/api/v1/anonymous/hotels?checkIn=${new Date(
        checkIn
      ).toISOString()}&checkOut=${new Date(
        checkOut
      ).toISOString()}&hotelId=${id}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    setSingleHotel(data);
    console.log(data);
  }

  useEffect(() => {
    getSingleHotel(id);
    console.log("date", new Date(checkIn).getDate());
    // console.log("month", new Date(checkIn).getMonth());
    console.log("month", monthNames[new Date(checkIn).getMonth()]);
    // empty the selected rooms array on this page
    setSelectedRooms([]);
    window.scrollTo(0, 0);
  }, []);

  if (singleHotel.success === false) {
    return <h2> Loading ...</h2>;
  } else {
    return (
      <>
        <Modal
          content="Please add any room"
          modalDisplay={modalDisplay}
          setModalDisplay={setModalDisplay}
        />
        <Slider
          sliderShow={sliderShow}
          setSliderShow={setSliderShow}
          sliderImagesNew={singleHotel.data[0].images}
        />
        <div className="single-hotel-images">
          {singleHotel.data[0].images.map((ele, index) => {
            return (
              <div
                className={imgClasses[index]}
                style={{ backgroundImage: `url(${ele})`, cursor: "pointer" }}
                onClick={() =>
                  sliderShow === "none"
                    ? setSliderShow("grid")
                    : setSliderShow("none")
                }
              >
                {/* <img src={ele} alt="more" /> */}
              </div>
            );
          })}

          {/* <div className="a1">
            <img src={singleHotel.data.images[0]} alt="" />
          </div>
          <div className="b1"></div>
          <div className="c1"></div>
          <div className="d1"></div> */}
        </div>

        <div className="hotel-details">
          <div className="hotel-info">
            <p className="hotel-title">{singleHotel.data[0].hotelName}</p>

            <p className="hotel-description">
              {singleHotel.data[0].description}
            </p>
          </div>
          <div className="hotel-amenities">
            <p className="sub-title">Amenities</p>

            <div className="amenities-grid">
              {singleHotel.data[0].amenities.map((ele, index) => {
                return <div className="one-amenity">{ele}</div>;
              })}
            </div>
          </div>
        </div>

        <div className="hotel-room-details-outer">
          <div className="hotel-room-details">
            {/* date grid */}
            <div className="box1">
              <div className="date-grid">
                <div className="static-details">
                  <p className="sub-title">Book Your Stay</p>
                  <p className="sub-title-info">
                    Select from a range of beautiful rooms
                  </p>
                </div>

                <div className="date-select">
                  {/* <input type="date" value={checkIn} /> */}
                  <p className="input">
                    {new Date(checkIn).getDate()}th{" "}
                    {monthNames[new Date(checkIn).getMonth()]}{" "}
                    {new Date(checkIn).getFullYear()}
                  </p>

                  <p className="arrow">
                    <i class="fas fa-long-arrow-alt-right"></i>{" "}
                  </p>
                  {/* <input type="date" value={checkOut} /> */}
                  <p className="input">
                    {new Date(checkOut).getDate()}th{" "}
                    {monthNames[new Date(checkOut).getMonth()]}{" "}
                    {new Date(checkOut).getFullYear()}
                  </p>
                </div>
              </div>
              {/* end of date grid */}

              {/* hotel rooms mapping */}
              <div className="room-booking-details">
                {singleHotel.data[0].rooms.map((ele, index) => {
                  return <RoomCard ele={ele} />;
                })}
              </div>
            </div>

            {window.innerWidth > 600 ? (
              <div className="box2">
                <div className="order-box">
                  <p className="order-title">Summary</p>

                  <p className="dynamic-date-box">
                    Starting from {new Date(checkIn).getDate()}th{" "}
                    {monthNames[new Date(checkIn).getMonth()]}
                    {/* {checkIn} */}
                  </p>

                  <div className="dynamic-room-details">
                    {selectedRooms.length === 0 ? (
                      <p>No Rooms Selected</p>
                    ) : (
                      selectedRooms.map((ele, index) => {
                        return (
                          <div className="dynamic-room-pricing" key={index}>
                            <p className="dynamic-room-type">
                              {" "}
                              {ele.roomName} <span> X {ele.qty}</span>
                            </p>
                            <p className="dynamic-room-tprice">
                              {" "}
                              <i class="fas fa-rupee-sign"></i>{" "}
                              {ele.roomPrice * ele.qty}
                            </p>
                          </div>
                        );
                      })
                    )}

                    <div className="dynamic-subtotal">
                      <p className="bordered"></p>
                      <div className="tax">
                        <p className="stable">Tax</p>{" "}
                        <p className="dynamic">
                          {" "}
                          <i class="fas fa-rupee-sign"></i>{" "}
                          {(selectedRooms.reduce(
                            (prev, curr) => prev + curr.qty * curr.roomPrice,
                            0
                          ) *
                            18) /
                            (100).toFixed(2)}
                        </p>
                      </div>

                      <div className="payable">
                        <p className="stable">Total payable</p>{" "}
                        <p className="dynamic">
                          <i class="fas fa-rupee-sign"></i>{" "}
                          {+selectedRooms
                            .reduce(
                              (prev, curr) => prev + curr.qty * curr.roomPrice,
                              0
                            )
                            .toFixed(2) +
                            +(
                              (selectedRooms.reduce(
                                (prev, curr) =>
                                  prev + curr.qty * curr.roomPrice,
                                0
                              ) *
                                18) /
                              (100).toFixed(2)
                            )}{" "}
                        </p>
                      </div>

                      <div
                        className="pay-btn"
                        onClick={() =>
                          selectedRooms.length > 0
                            ? history.push("/booking")
                            : setModalDisplay("grid")
                        }
                      >
                        Book Now
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              //else
              <div className="mobile-box2">
                <p className="mobile-payable">
                  Payable Now
                  <span>
                    <i class="fas fa-rupee-sign"></i>{" "}
                    {+selectedRooms
                      .reduce(
                        (prev, curr) => prev + curr.qty * curr.roomPrice,
                        0
                      )
                      .toFixed(2)}{" "}
                  </span>
                </p>
                {/* <div className="mobile-btn">View Summary</div> */}
                <div
                  className="mobile-btn"
                  onClick={() =>
                    selectedRooms.length > 0
                      ? history.push("/booking")
                      : setModalDisplay("grid")
                  }
                >
                  Book Now
                </div>

                <div className="order-box">
                  {/* <p className="order-title">Summary</p>

                <p className="dynamic-date-box">
                  Starting from {new Date(checkIn).getDate()}th{" "}
                  {monthNames[new Date(checkIn).getMonth()]}

                </p>

                <div className="dynamic-room-details">
                  {selectedRooms.length === 0 ? (
                    <p>No Rooms Selected</p>
                  ) : (
                    selectedRooms.map((ele, index) => {
                      return (
                        <div className="dynamic-room-pricing" key={index}>
                          <p className="dynamic-room-type">
                            {" "}
                            {ele.roomName} <span> X {ele.qty}</span>
                          </p>
                          <p className="dynamic-room-tprice">
                            {" "}
                            <i class="fas fa-rupee-sign"></i>{" "}
                            {ele.roomPrice * ele.qty}
                          </p>
                        </div>
                      );
                    })
                  )}

                  <div className="dynamic-subtotal">
                    <p className="bordered"></p>
                    <div className="tax">
                      <p className="stable">Tax</p>{" "}
                      <p className="dynamic">
                        {" "}
                        <i class="fas fa-rupee-sign"></i>{" "}
                        {(selectedRooms.reduce(
                          (prev, curr) => prev + curr.qty * curr.roomPrice,
                          0
                        ) *
                          18) /
                          (100).toFixed(2)}
                      </p>
                    </div>

                    <div className="payable">
                      <p className="stable">Total payable</p>{" "}
                      <p className="dynamic">
                        <i class="fas fa-rupee-sign"></i>{" "}
                        {+selectedRooms
                          .reduce(
                            (prev, curr) => prev + curr.qty * curr.roomPrice,
                            0
                          )
                          .toFixed(2) +
                          +(
                            (selectedRooms.reduce(
                              (prev, curr) => prev + curr.qty * curr.roomPrice,
                              0
                            ) *
                              18) /
                            (100).toFixed(2)
                          )}{" "}
                      </p>
                    </div>

                    <div
                      className="pay-btn"
                      onClick={() =>
                        selectedRooms.length > 0
                          ? history.push("/booking")
                          : alert("please select min rooms")
                      }
                    >
                      Book Now
                    </div>
                  </div>
                </div> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
};

export default SingleHotel;
