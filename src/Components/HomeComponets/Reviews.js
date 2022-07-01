import React from "react";

const Reviews = () => {
  let pxx1 = 0;
  let pxx2 = 0;

  const sliderNxt = () => {
    const box = document.querySelector(".reviews-inner");
    box.style.transition = "all 0.3s ease-in-out";
    console.log(box.style.transform);
    pxx1 = pxx1 - 150;
    pxx2 = 0;
    if (box.style.transform === "translateX(-1500px)") {
      box.style.transform = `translateX(0px)`;
      pxx1 = 0;
      return;
    }
    box.style.transform = `translateX(${pxx1}px)`;
  };

  const sliderPre = () => {
    const box = document.querySelector(".reviews-inner");
    box.style.transition = "all 0.3s ease-in-out";
    console.log(box.style.transform);

    //  pxx2 = box.style.transform;
    pxx2 = pxx2 + 100;
    pxx1 = 0;
    // box.style.transform = `translateX(${pxx2}px)`;
    box.style.transform = `translateX(${0}px)`;
  };

  return (
    <div className="review-container">
      <p className="title">
        Customer Reviews <span className="emoji">🥳</span>{" "}
        <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
      </p>
      <div className="nxt" onClick={sliderNxt}>
        <i className="fa fa-chevron-right " aria-hidden="true"></i>
      </div>
      <div className="pre" onClick={sliderPre}>
        <i className="fa fa-chevron-left" aria-hidden="true"></i>
      </div>
      <div className="reviews-outer">
        <div className="reviews-inner">
          <div className="one">
            <p className="name">
              {" "}
              <span>Rahul Srivastava</span>{" "}
            </p>

            <p className="review">
              <span>
                As promised as served. Location is really accessible from Scheme
                78 ibus station. Room was clean and spacious. Overall a good
                experience.
              </span>
            </p>
          </div>
          <div className="two">
            <p className="name">
              {" "}
              <span>Ayushman aggarwal</span>
            </p>

            <p className="review">
              <span>
                it was a good stay.... quite residential place.... away from
                markets... the only con is that they dont have any option for
                breakfast. it is very quite area after getting tired you can
                sleep in peace
              </span>
            </p>
          </div>
          <div className="three">
            <p className="name">
              <span>Chinmay Surve</span>
            </p>

            <p className="review">
              <span>
                it was amazing experience..i stayed here 2nd time..they are
                excellent in all. nice, clen and spacious room..highly
                recommended stay.
              </span>
            </p>
          </div>

          <div className="four">
            <p className="name">
              <span>Siddhi Harish</span>
            </p>

            <p className="review">
              <span>
                Great hotet..at an affordable price..one issue i faced was to
                find the hotel..sooo complicated location..it took me 1.5hrs to
                find the hotel..other than that no issue..great accomodation🙌
              </span>
            </p>
          </div>

          <div className="five">
            <p className="name">
              <span>Vijay Hegde</span>
            </p>

            <p className="review">
              <span>
                This is a very good hotel. Well located. Courteous staff made our stay very comfortable. We
                stayed here after having a horrendous experience at a hotel in
                Shivpuri called Shivam Paradise, which reminded us of hell. The
                best part of the room is the shower, which is placed inside the
                false ceiling of the bathroom. The room was very clean and tidy.
                The linen too was clean. Since it's a recently built hotel, they
                didn't have a functional kitchen, but the team was very helpful
                in arranging crockery cutlery and glassware for us for dinner.
                Will definitely stay here when I am in Indore next.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
