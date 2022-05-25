import React, { useState, useContext } from "react";
import { SelectedRoomsContext } from "../../context/hotelsContext.js";

const RoomCard = ({ ele }) => {
  //room count is
  const [count, setCount] = useState(0);

  const { selectedRooms, setSelectedRooms } = useContext(SelectedRoomsContext);

  function addRoomToCartHandler(newRoom) {
    const existingRoom = selectedRooms.find(
      (ele, index) => ele.roomId === newRoom.roomId
    );

    if (selectedRooms.length === 0) {
      setSelectedRooms([...selectedRooms, { ...newRoom, qty: 1 }]);
    } else if (existingRoom) {
      setSelectedRooms(
        selectedRooms.map((ele1, index) => {
          if (ele1.roomId === existingRoom.roomId) {
            return {
              ...ele1,
              qty:
                ele1.qty >= ele1.roomDetails.length ? ele1.qty : ele1.qty + 1,
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

    if (existingRoom) {
      setSelectedRooms(
        selectedRooms.map((ele1, index) => {
          if (ele1.roomId === existingRoom.roomId) {
            return { ...ele1, qty: ele1.qty > 0 ? ele1.qty - 1 : 0 };
          } else {
            return ele1;
          }
        })
      );
    }
  }

  return (
    <div className="each-room-details">
      <div className="box1">
        <img src={ele.images[0]} alt="" />
      </div>

      <div className="box2">
        <div className="r1">
          <p className="r1-title">
            {ele.roomName} <span>{ele.roomDetails.length} available</span>{" "}
          </p>
          <p className="r1-price">
            {" "}
            <i class="fas fa-rupee-sign"></i> {ele.roomPrice}
          </p>
        </div>

        {window.innerWidth > 600 ? (
          <p className="r2">{ele.roomDescription}</p>
        ) : (
          <p className="r2">{ele.roomDescription.slice(0, 60)}</p>
        )}

        <div className="r3">
          <p>{/* space taker */}</p>
          <p className="r3-guests">No. of Rooms</p>

          <div className="addition-unit-engine">
            <i
              class="fas fa-minus"
              onClick={() => {
                removeRoomFromCartHandler(ele);
                setCount(count <= 0 ? 0 : count - 1);
              }}
            ></i>
            <p>{count}</p>
            <i
              class="fas fa-plus"
              onClick={() => {
                addRoomToCartHandler(ele);
                setCount(count >= ele.roomDetails.length ? count : count + 1);
              }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
