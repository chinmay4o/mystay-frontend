import React from "react";

const Footer = () => {
  return (
    <div className="footer-parent ">
      <footer className="footer_container">
        <h5>MyStay</h5>

        <div className="more-info">
          Explore with MyStay - We provide ultra Luxurious Hotel Rooms for long
          accommodations, at Best Price, We are couple friendly, Great interiors
          and mesmerizing location in Jaipur, Gurugram, Indore and Banglore
          <br></br>
          <br></br>
          We are a chain of 30+ hotels offering hotel rooms, longstays, pg's and
          corporate bookings
          <p className="email">Mail us - infomystay@gmail.com</p>
        </div>

        <div className="mailing-address">
          <p className="head-address"> Contact Us - </p>

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

        <div className="footer-social">
          {/* <p className="head-address"> Follow Us on - </p> */}
          <p>Customer Support - +91 89520 93209</p>
          <p>Email - infomystay@gmail.com</p>

          <div className="links">
            <a
              href="https://www.instagram.com/mystayrooms/"
              className="home_social-icon"
              target="_blank"
            >
              <i class="fab fa-instagram"></i>
            </a>
            {/* <a
          href="https://github.com/chinmay4o"
          className="home_social-icon"
          target="_blank"
        >
          <i class="fab fa-github"></i>
        </a> */}
            <a
              href="https://www.facebook.com/Mystayhotels/"
              className="home_social-icon"
              target="_blank"
            >
              <i class="fab fa-facebook"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
