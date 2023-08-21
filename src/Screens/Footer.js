import React from "react";

const Footer = () => {
  return (
    <div className="w-screen bg-[#3b4a5b] text-white px-20">
      <div className="w-full flex flex-col md:flex-row gap-8 lg:gap-20 items-center justify-center py-12 px-4 text-[18px] md:text-sm lg:text-base xl:text-[18px]">
        <div className="text-3xl font-semibold lg:text-4xl md:hidden lg:block">MyStay</div>

        <div className="flex flex-col gap-4 justify-center items-left">
        <div className="text-base hidden md:block lg:hidden">MyStay</div>
          <div className="text-base">
          Explore with MyStay - We provide ultra Luxurious Hotel Rooms for long
          accommodations, at Best Price, We are couple friendly, Great interiors
          and mesmerizing location in Jaipur, Gurugram, Indore and Banglore
          </div>
          <div>
          We are a chain of 30+ hotels offering hotel rooms, longstays, pg's and
          corporate bookings
          </div>
          <a href= "mailto:infomystay@gmail.com" className="text-left">Mail us - infomystay@gmail.com</a>
        </div>

        <div className="flex flex-col gap-2 text-base">
          <p className=""> Contact Us - </p>

          <p>
            Jaipur office - Ground Floor,Akshyam, Ganesh Nagar, Ramnagar, Jaipur,
            Rajasthan 302019
          </p>
          <p>
            Gurugram office- Ground Floor,Aashiyana Paradise, sector 49, opp to Spaze
            itech park, Gurugram, Haryana 122018
          </p>
          <p>
            Indore office- Ground Floor, Comfort Medows, near Sky Earth, Indore,
            Madhya Pradesh 452016
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center justify-center text-base">
          {/* <p className="head-address"> Follow Us on - </p> */}
          <p>Customer Support - +91 89520 93209</p>
          <a  href= "mailto:infomystay@gmail.com">Email - infomystay@gmail.com</a>
          <div className="flex gap-4 items-center justify-center">
            <a
              href="https://www.instagram.com/mystayrooms/"
              className="home_social-icon"
              target="_blank"
            >
              <i className="fab fa-instagram"></i>
            </a>
            {/* <a
          href="https://github.com/chinmay4o"
          className="home_social-icon"
          target="_blank"
        >
          <i className="fab fa-github"></i>
        </a> */}
            <a
              href="https://www.facebook.com/Mystayhotels/"
              className="home_social-icon"
              target="_blank"
            >
              <i className="fab fa-facebook"></i>
            </a>
          </div>
          
        </div>

        
      </div>
    </div>
  );
};

export default Footer;
