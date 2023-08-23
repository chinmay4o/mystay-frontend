import React, { useState, useContext, useEffect } from "react";
import { SelectedRoomsContext } from "../../context/hotelsContext.js";
import PrimaryButton from "../../Common/buttons/PrimaryButton.js";

const RoomCard = ({ ele }) => {
  //room count is
  const [count, setCount] = useState(0);
  const [available , setAvailable] = useState();
  const [disabled, setDisabled] = useState(false);

  const { selectedRooms, setSelectedRooms } = useContext(SelectedRoomsContext);

  useEffect(() => {
    let count=0;
    ele.roomDetails.forEach((ele1) => {
      console.log(ele1);
      if(ele1.bookingDetails.length===0) count++;
    })

    setAvailable(count);
  }, [ele]);

  function addRoomToCartHandler(newRoom) {
    console.log(ele);
    const existingRoom = selectedRooms.find(
      (ele, index) => ele.roomId === newRoom.roomId
    );

    if (selectedRooms.length === 0) {
      setSelectedRooms([...selectedRooms, { ...newRoom, qty: 1 }]);
    } else if (existingRoom) {
      setSelectedRooms(
        selectedRooms.map((ele1, index) => {
          if (ele1.roomId === existingRoom.roomId) {
            if(ele1.qty+1 >=available) setDisabled(true)
            return {
              ...ele1,
              qty:
                ele1.qty >= available ? ele1.qty : ele1.qty + 1,
            };
          } else {
            return ele1;
          }
        })
      );
    } else {
      setSelectedRooms([...selectedRooms, { ...newRoom, qty: 1 }]);
    }
  }

  function removeRoomFromCartHandler(oldRoom) {
    const existingRoom = selectedRooms.find(
      (ele, index) => ele.roomId === oldRoom.roomId
    );

    if (existingRoom.qty === 1) {
      setSelectedRooms(
        selectedRooms.filter((ele1, index) => ele1.roomId !== oldRoom.roomId)
      );
    } else if (existingRoom) {

      setSelectedRooms(
        selectedRooms.map((ele1, index) => {
          if (ele1.roomId === existingRoom.roomId) {
            if(ele1.qty-1 <available) setDisabled(false)
            return { ...ele1, qty: ele1.qty > 0 ? ele1.qty - 1 : 0 };
          } else {
            return ele1;
          }
        })
      );
    }
  }

  return (
    <div className="h-96 flex-col flex md:flex-row gap-4 mb-5 rounded-lg shadow-xs hover:shadow-md md:h-48 bg-white">
      <div className="">
        <img
          src={ele.images[0]}
          className="h-48 rounded-xl rounded-b-none md:rounded-xl md:rounded-r-none w-full md:w-56"
          alt=""
        />
      </div>

      <div className="py-3 px-5 flex flex-col gap-4 md:w-full">
        <div className="flex flex-row w-full justify-between items-center">
          <p className="text-md font-semibold">
            {ele.roomName}{" "}
            <span className="text-primary text-sm underline">
              {available} available
            </span>{" "}
          </p>
          <p className="text-md font-semibold">
            {" "}
            <i className="fas fa-rupee-sign"></i> {ele.roomPrice}
          </p>
        </div>

        {window.innerWidth > 600 ? (
          <p className="font-base text-[#808080] font-medium">
            {ele.roomDescription}
          </p>
        ) : (
          <p className="font-base text-[#808080] font-medium">
            {ele.roomDescription.slice(0, 60)}
          </p>
        )}
        {available>0 &&
        <div className="flex mt-4 gap-4 items-center justify-end">
          {count === 0 ? (
            <PrimaryButton
              classes="uppercase btn-sm text-xs flex items-center justify-center max-w-max "
              onClick={() => {
                addRoomToCartHandler(ele);
                setCount(count >= ele.roomDetails.length ? count : count + 1);
              }}
              text="Select Room"
            />
              
            
          ) : (
            <>
              <p className="r3-guests">No. of Rooms</p>

              <div className="flex gap-2 md:gap-4 items-center">
                <i
                  className="fas fa-minus bg-primary flex items-center justify-center text-white rounded-md w-6 h-6 md:w-8 md:h-8"
                  onClick={() => {
                    removeRoomFromCartHandler(ele);
                    setCount(count <= 0 ? 0 : count - 1);
                  }}
                ></i>
                <p>{count}</p>
                <i
                  className={`fas fa-plus  bg-primary flex items-center justify-center text-white rounded-md w-6 h-6 md:w-8 md:h-8 ${disabled && "bg-gray-400"}`}
                  onClick={() => {
                    !disabled && 
                    addRoomToCartHandler(ele);
                    setCount(
                      count >= ele.roomDetails.length ? count : count + 1
                    );
                  }}
                ></i>
              </div>
            </>
          )}
        </div>}
      </div>
    </div>
  );
};

export default RoomCard;
