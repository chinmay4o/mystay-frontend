import React from "react";
import { useHistory } from "react-router-dom";

const Locations = ({checkIn, checkOut}) => {

  const history = useHistory();

  const cities = ["Jaipur", "Indore","Gurugram", "Bangalore", "Ooty", "Pune", "Dehradun" ];

  const backgroundImages = [
    "https://ik.imagekit.io/k3m4pqzpmlr/coupons/karnatakas-metropolitan-city-with-its-grand_3lJVBIb_N6NpaQyJH.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1650732187835",
    "https://upload.wikimedia.org/wikipedia/commons/e/e1/Indore_Rajwada01.jpg",
    "https://ik.imagekit.io/k3m4pqzpmlr/desktop_coupons/topimg_20060_gurgaon_fa7WFfrTL.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1655708054965",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Lalbagh_Glasshouse_night_panorama.jpg/1920px-Lalbagh_Glasshouse_night_panorama.jpg",
    "https://ik.imagekit.io/k3m4pqzpmlr/coupons/himachals-treasure-trove-of-adventure-scene_qi6U78o_vb6_FtLP_.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1650732185700",
    "https://ik.imagekit.io/k3m4pqzpmlr/coupons/greenery-is-found-at-its-best-in-coorg-2020_o86HXBS_sVzeIlqFP.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1650732185144",
    "https://ik.imagekit.io/k3m4pqzpmlr/coupons/the-blue-city-charms-travellers-with-rich-h_AT52qza_ndYKLog-j.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1650732187875",
  ];


  return (
    <div className="locations-container" id="location">
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
                    `/hotels?city=${ele.toLowerCase()}&checkIn=${JSON.stringify(
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
