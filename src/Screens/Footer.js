import React from "react";

const Footer = () => {
  return (
    <footer className="footer_container">
      <h5>MyStay</h5>

      <div className="more-info">
        Explore with MyStay - oldest & the biggest hotel brand of
        India. Travel India & Nepal on budget while having fun at our quirky,
        activity-led hotels.
        <br></br>
        <br></br>
        We are here for your throughout the entire development lifecycle, we
        love to keep our communication active, to make sure you always know
        where we are.
        <p className="email">Mail us @ MyStay.business@gmail.com</p>
      </div>
      <div className="footer-social">
        <a
          href="https://www.linkedin.com/in/chinmay4o"
          className="home_social-icon"
          target="_blank"
        >
          <i class="fab fa-linkedin-in"></i>
        </a>
        <a
          href="https://github.com/chinmay4o"
          className="home_social-icon"
          target="_blank"
        >
          <i class="fab fa-github"></i>
        </a>
        <a
          href="https://twitter.com/Chinmay4o"
          className="home_social-icon"
          target="_blank"
        >
          <i class="fab fa-twitter"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
