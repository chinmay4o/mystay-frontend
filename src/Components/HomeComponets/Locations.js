import React from "react";
import { useHistory } from "react-router-dom";

const Locations = ({checkIn, checkOut}) => {

  const history = useHistory();

  const cities = ["Delhi", "Jaipur", "Bangalore", "Ooty", "Indore", "Pune", "Dehradun", ];

  const backgroundImages = [
    "https://ik.imagekit.io/k3m4pqzpmlr/coupons/karnatakas-metropolitan-city-with-its-grand_3lJVBIb_N6NpaQyJH.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1650732187835",
    "https://ik.imagekit.io/k3m4pqzpmlr/coupons/theog-20220129083825_XqK_wo4Xl.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1650732187815",
    "https://ik.imagekit.io/k3m4pqzpmlr/coupons/the-blue-city-charms-travellers-with-rich-h_AT52qza_ndYKLog-j.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1650732187875",
    "https://ik.imagekit.io/k3m4pqzpmlr/coupons/karnatakas-metropolitan-city-with-its-grand_3lJVBIb_N6NpaQyJH.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1650732187835",
    "https://ik.imagekit.io/k3m4pqzpmlr/coupons/himachals-treasure-trove-of-adventure-scene_qi6U78o_vb6_FtLP_.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1650732185700",
    "https://ik.imagekit.io/k3m4pqzpmlr/coupons/greenery-is-found-at-its-best-in-coorg-2020_o86HXBS_sVzeIlqFP.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1650732185144",
    "https://ik.imagekit.io/k3m4pqzpmlr/coupons/the-blue-city-charms-travellers-with-rich-h_AT52qza_ndYKLog-j.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1650732187875",

  ];


  return (
    <div className="locations-container">
      <div className="location-box1">
     { cities.map((ele, index) => {
       return <div className="ec2" 
        onClick={() => {
                  localStorage.setItem("destination", ele.toLocaleLowerCase());
                  localStorage.setItem("checkIn", JSON.stringify(checkIn));
                  //  localStorage.setItem("checkIn", checkIn);
                  localStorage.setItem("checkOut", JSON.stringify(checkOut));
                  //  localStorage.setItem("checkOut", checkOut);
                  console.log(checkIn, "checkIn");
                  history.push(
                    `/hotels?city=${ele.toLocaleLowerCase()}&checkIn=${JSON.stringify(
                      checkIn
                    )}&checkOut=${JSON.stringify(checkOut)}`
                  );
              }}>
         <img src={backgroundImages[index]} alt="normal" />
         <p className="city-title">
           {ele}
         </p>

         {/* <div className="cir1">
         <i class="fas fa-plus"></i>
         </div> */}
       </div>
     })}
      </div>
    </div>
  );
};

export default Locations;
