import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { SelectedRoomsContext } from "../../context/hotelsContext.js";
import RoomCard from "../RoomCard/RoomCard";
import Slider from "../ReactSlider/Slider";
import Modal from "../Modal/Modal";
import { configData } from "../../Config/config.js";
import PrimaryButton from "../../Common/buttons/PrimaryButton.js";

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

  let imgClasses = [
    "col-span-3 row-span-3 bg-cover  rounded-xl",
    "col-start-4 bg-cover rounded-xl hidden md:block",
    "col-start-4 bg-cover rounded-xl hidden md:block",
    "col-start-4 bg-cover rounded-xl hidden md:block",
  ];

  const search = useLocation().search;
  const checkIn = new URLSearchParams(search).get("checkIn");
  const checkOut = new URLSearchParams(search).get("checkOut");

  //Calculating differecebetween Days/nights
  const date1 = new Date(localStorage.getItem("checkIn"));
  const date2 = new Date(localStorage.getItem("checkOut"));
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(diffTime + " milliseconds");
  console.log(diffDays + " days");

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
        <div className="w-[96%] md:w-[96%] h-96 md:h-[600px] xl:w-[1280px] md:gap-2 mx-auto py-5 grid grid-cols-3 grid-rows-3 md:grid-cols-4">
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

        <div className="w-[96%] xl:w-[1280px] mx-auto flex flex-col lg:flex-row gap-6 px-4">
          <div className="flex flex-col gap-6 lg:w-4/6">
            <p className="text-2xl font-bold">
              {singleHotel.data[0].hotelName}
            </p>

            <p className="font-semibold text-base text-[#6d6d6d]">
              {singleHotel.data[0].description}
            </p>
          </div>
          <div className=" flex flex-col gap-6 lg:w-2/6">
            <p className="text-2xl font-bold">Amenities</p>

            <div className="grid grid-cols-2 grid-rows-4 gap-4 grid-flow-row md:grid-cols-3">
              {singleHotel.data[0].amenities.map((ele, index) => {
                return <div className="">{ele}</div>;
              })}
            </div>
          </div>
        </div>

        <div className="w-full bg-[#f9f7f1]">
          <div className=" py-12 px-5 flex flex-col lg:flex-row gap-12 mx-auto rounded-xl  max-w-[1280px]">
            {/* date grid */}

            <div className="flex flex-col gap-6">
              <p className="font-bold text-3xl">Book Your Stay</p>
              <p className="font-semi-bold text-[#808080] text-xl">
                Select from a range of beautiful rooms
              </p>

              <div className="grid place-items-center">
                <div className="flex gap-4 items-center justify-center p-4 rounded-xl bg-white shadow-md w-max">
                  {/* <input type="date" value={checkIn} /> */}
                  <p className="font-medium text-[#484848]">
                    {new Date(checkIn).getDate()}th{" "}
                    {monthNames[new Date(checkIn).getMonth()]}{" "}
                    {new Date(checkIn).getFullYear()}
                  </p>

                  <p className="arrow">
                    <i className="fas fa-long-arrow-alt-right"></i>{" "}
                  </p>
                  {/* <input type="date" value={checkOut} /> */}
                  <p className="font-medium text-[#484848]">
                    {new Date(checkOut).getDate()}th{" "}
                    {monthNames[new Date(checkOut).getMonth()]}{" "}
                    {new Date(checkOut).getFullYear()}
                  </p>
                </div>
              </div>

              {/* end of date grid */}

              {/* hotel rooms mapping */}
              <div className="w-full rounded-xl gap-6 flex-col flex">
                {singleHotel.data[0].rooms.map((ele, index) => {
                  return <RoomCard ele={ele} />;
                })}
              </div>
            </div>

              <div className="hidden md:flex max-lg:w-full max-lg:items-center justify-center">

             
              <div className="hidden md:flex flex-col gap-4 lg:w-max w-96 ">
                <p className="text-3xl font-bold ">Summary</p>

                <p className="text-[#808080] font-semibold">
                  Starting from {new Date(checkIn).getDate()}th{" "}
                  {monthNames[new Date(checkIn).getMonth()]} for {diffDays} days
                  {/* {checkIn} */}
                </p>

                <div className="text-[18px] flex-col flex gap-4 w-full">
                  {selectedRooms.length === 0 ? (
                    <p>No Rooms Selected</p>
                  ) : (
                    selectedRooms.map((ele, index) => {
                      return (
                        <div
                          className="flex justify-between items-center"
                          key={index}
                        >
                          <p className="font-bold">
                            {" "}
                            {ele.roomName}{" "}
                            <span className="text-[#808080] text-base font-semibold">
                              {" "}
                              X {ele.qty}
                            </span>
                          </p>
                          <p className="font-bold">
                            {" "}
                            <i className="fas fa-rupee-sign"></i>{" "}
                            {ele.roomPrice * ele.qty * diffDays}
                          </p>
                        </div>
                      );
                    })
                  )}

                  <div className="bg-primary h-1 w-full">&nbsp;</div>
                  <div className="flex justify-between items-center font-bold">
                    <p className="font-bold">Tax</p>{" "}
                    <p className="dynamic">
                      {" "}
                      <i className="fas fa-rupee-sign"></i>{" "}
                      {(selectedRooms.reduce(
                        (prev, curr) => prev + curr.qty * curr.roomPrice,
                        0
                      ) *
                        diffDays *
                        18) /
                        (100).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex justify-between items-center font-bold">
                    <p className="font-bold ">Total payable</p>{" "}
                    <p className="dynamic">
                      <i className="fas fa-rupee-sign"></i>{" "}
                      {+selectedRooms.reduce(
                        (prev, curr) => prev + curr.qty * curr.roomPrice,
                        0
                      ) *
                        diffDays.toFixed(2) +
                        +(
                          (selectedRooms.reduce(
                            (prev, curr) => prev + curr.qty * curr.roomPrice,
                            0
                          ) *
                            diffDays *
                            18) /
                          (100).toFixed(2)
                        )}{" "}
                    </p>
                  </div>

<div className="flex items-center justify-center">

                  <PrimaryButton
                    text="Book Now"
                    onClick={() =>
                      selectedRooms.length > 0
                      ? history.push("/booking")
                      : setModalDisplay("grid")
                    }
                    />
                    </div>
                </div>
              </div>
              </div>

              <div className="md:hidden fixed bottom-0 border-t-[1px] border-[#808080/10] bg-white shadow-xl left-0 p-4 flex justify-between items-center w-full">
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-bold text-[#808080]">Payable Now</p>
                  <p className="text-xl font-semibold">
                  <i className="fas fa-rupee-sign"></i>{" "}
                      {+selectedRooms.reduce(
                        (prev, curr) => prev + curr.qty * curr.roomPrice,
                        0
                      ) *
                        diffDays.toFixed(2) +
                        +(
                          (selectedRooms.reduce(
                            (prev, curr) => prev + curr.qty * curr.roomPrice,
                            0
                          ) *
                            diffDays *
                            18) /
                          (100).toFixed(2)
                        )}
                  </p>
                </div>
                <PrimaryButton 
                text="Book Now"
                onClick={() =>
                  selectedRooms.length > 0
                    ? history.push("/booking")
                    : setModalDisplay("grid")
                }
                />
              </div>
           
          </div>
        </div>
      </>
    );
  }
};

export default SingleHotel;
