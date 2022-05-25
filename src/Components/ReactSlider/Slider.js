import React, { useEffect, useState } from "react";
import SliderContent from "./SliderContent";
import Dots from "./Dots";
import Arrows from "./Arrows";
import sliderImage from "./sliderImage";
import "./slider.css";

function Slider(props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const len = props.sliderImagesNew.length - 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="slider-backdrop" style={{ display: props.sliderShow }}>
 
      <div className="slider-container">
      <span
        className="closeslider-btn"
        onClick={() =>
          props.sliderShow === "none" ? props.setSliderShow("grid") : props.setSliderShow("none")
        }
      >
        <i class="fas fa-window-close"></i>
      </span>
        {/* <SliderContent activeIndex={activeIndex} sliderImage={sliderImage} /> */}
        <SliderContent
          activeIndex={activeIndex}
          sliderImagesNew={props.sliderImagesNew}
        />
        <Arrows
          prevSlide={() =>
            setActiveIndex(activeIndex < 1 ? len : activeIndex - 1)
          }
          nextSlide={() =>
            setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)
          }
        />
        <Dots
          activeIndex={activeIndex}
          sliderImage={props.sliderImagesNew}
          onclick={(activeIndex) => setActiveIndex(activeIndex)}
        />
      </div>
    </div>
  );
}

export default Slider;
