import React from "react";

const Features = () => {
  return (
    <div className="features-container">
      <div className="features-inner">
        <div className="usp-column">
          <div className="icon-container">
            <img
              className="icon"
              alt=""
              src="https://d1ha4q9jvugw4k.cloudfront.net/static/img/best.svg"
              onerror="this.onerror=null;pagespeed.lazyLoadImages.loadIfVisibleAndMaybeBeacon(this);"
            />
          </div>
          <div className="usp-content">
            <div className="sub-title bolder black">BEST HOTELS</div>
            <p className="caption">
              Our average rating is 4+
            </p>
          </div>
        </div>
        <div class="usp-column">
          <div class="icon-container">
            <img
              class="icon"
              alt=""
              src="https://d1ha4q9jvugw4k.cloudfront.net/static/img/speed.svg"
              onerror="this.onerror=null;pagespeed.lazyLoadImages.loadIfVisibleAndMaybeBeacon(this);"
            />
          </div>
          <div class="usp-content">
            <div class="sub-title bolder black">FLEXIBLE STAY</div>
            <p class="caption">
              Check-in &amp; Check-out of our hotels at your convenience
            </p>
          </div>
        </div>
        <div class="usp-column">
          <div class="icon-container">
            <img
              class="icon"
              alt=""
              src="https://d1ha4q9jvugw4k.cloudfront.net/static/img/hand.svg"
              onerror="this.onerror=null;pagespeed.lazyLoadImages.loadIfVisibleAndMaybeBeacon(this);"
            />
          </div>
          <div class="usp-content">
            <div class="sub-title bolder black">FAIR PRICING</div>
            <p class="caption">
            Always find pricing which is 20% less to the other hotels in the similar locality
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
