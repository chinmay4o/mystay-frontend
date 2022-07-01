import React from "react";

const Trust = () => {
  return (
    <div className="trust-container">
      <div className="trust-inner">
        <div className="b1">
          <h3>Why trust MyStay</h3>

          <div className="b1-inner">
            <div className="point">
              <lord-icon
                src="https://cdn.lordicon.com/nxaaasqe.json"
                colors="primary:#121331,secondary:#000000"
                trigger="loop"
                stroke="75"
                delay="2000"
                style={{ width: "50px", height: "50px" }}
              ></lord-icon>{" "}
              <span>80,000+ rooms served till today</span>
            </div>
            <div className="point">
              <lord-icon
                src="https://cdn.lordicon.com/wlpxtupd.json"
                colors="primary:#121331,secondary:#000000"
                trigger="loop"
                stroke="75"
                delay="2300"
                style={{ width: "50px", height: "50px" }}
              ></lord-icon>
              <span>40+ Partnered Hotels</span>
            </div>
            <div className="point">
              <lord-icon
                src="https://cdn.lordicon.com/gqzfzudq.json"
                colors="primary:#121331,secondary:#000000"
                trigger="loop"
                stroke="75"
                delay="2500"
                style={{ width: "50px", height: "50px" }}
              ></lord-icon>
              <span>3+ Cities</span>
            </div>
          </div>
        </div>

        <div className="b2">
          <h3>
            Sign-Up to our <br></br> newsletter
          </h3>

          <div className="input">
            <input type="text" name="email" id="email" />
            <div className="btn">Signup</div>
          </div>

          <img
            src="https://ik.imagekit.io/k3m4pqzpmlr/Hotel_pictures/hiking_zro9gna99.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1656655885340"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Trust;
