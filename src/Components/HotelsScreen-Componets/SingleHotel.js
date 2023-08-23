import React from "react";
import { useHistory } from "react-router-dom";
import PrimaryButton from "../../Common/buttons/PrimaryButton";

const SingleHotel = ({ ele, checkIn, checkOut, key }) => {
  const history = useHistory();
  return (
    <div
      className=" flex flex-col md:flex-row gap-6 w-full md:w-4/6 lg:w-1/2"
      key={key}
    >
      <div className="bg-cover rounded-xl h-[270px] xl:h-96 lg:h-[420px] w-full md:w-1/2">
        <img
          src={ele.images[0]}
          alt=""
          className="rounded-xl h-full w-full object-cover"
        />
      </div>

      <div className="md:w-1/2">
        <p className="text-lg mb-4 font-bold text-[#6d6d6d]">
          Mystay Townhouse
        </p>
        <h2 className="mb-4 text-xl font-bold">{ele.hotelName}</h2>

        <p className="text-base mb-4 font-semibold text-[#6d6d6d]">
          {ele.description.slice(0, 180)}...
        </p>
        
        <PrimaryButton
          text="Book Now"
          onClick={() =>
            history.push(
              `/hotel/${ele.hotelId}?checkIn=${checkIn}&checkOut=${checkOut}`
            )
          }
        />
      </div>
    </div>
  );
};

export default SingleHotel;
