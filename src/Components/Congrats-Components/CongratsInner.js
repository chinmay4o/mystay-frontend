import React from "react";

const CongratsInner = () => {
  return (
    <div className="congrats-inner">
      {/* <div className="b-box1">
        <p className="confirm-title">
          <lord-icon
            src="https://cdn.lordicon.com/lupuorrc.json"
            trigger="loop"
            style={{ width: "250px", height: "250px" }}
          ></lord-icon>{" "}
          <i class="fas fa-long-arrow-alt-left"></i> Confirm your booking
        </p>

        <form className="form">
          <p className="guest-title"> Guest Information</p>

          <div className="form-grid">
            <div className="b1">
              <p>
                Name <sup>*</sup>{" "}
              </p>{" "}
              <div></div>
            </div>
            <div className="b2">
              <p>
                Gender <sup>*</sup>
              </p>{" "}
              <div></div>
            </div>
            <div className="b3">
              <p>
                Email <sup>*</sup>
              </p>{" "}
              <div></div>
            </div>
            <div className="b4">
              <p>
                Number <sup>*</sup>
              </p>{" "}
              <div></div>
            </div>
            <div className="b5">
              <p>
                Address <sup>*</sup>
              </p>{" "}
              <div></div>
            </div>
          </div>

          <p className="b6">
            Not Going Solo ? <span>Add another person</span>{" "}
          </p>
        </form>
      </div>

      <div className="b-box2">
        <div className="booking-summary-box">
          <p className="order-title">Summary</p>

          <p className="dynamic-date-box">
            Starting from {new Date(localStorage.getItem("checkIn")).getDate()}
            th{" "}
            {monthNames[new Date(localStorage.getItem("checkIn")).getMonth()]}
          </p>

          <div className="dynamic-room-details">
            {selectedRooms.length === 0 ? (
              <p>No Rooms Selected</p>
            ) : (
              selectedRooms.map((ele, index) => {
                return (
                  <div className="dynamic-room-pricing" key={index}>
                    <p className="dynamic-room-type">
                      {" "}
                      {ele.roomName} <span> X {ele.qty}</span>
                    </p>
                    <p className="dynamic-room-tprice">
                      {" "}
                      <i class="fas fa-rupee-sign"></i>{" "}
                      {ele.roomPrice * ele.qty}
                    </p>
                  </div>
                );
              })
            )}

            <div className="dynamic-subtotal">
              <p className="bordered"></p>
              <div className="tax">
                <p className="stable">Tax</p>{" "}
               
              </div>

              <div className="payable">
                <p className="stable">Total payable</p>{" "}
                <p className="dynamic">
                  <i class="fas fa-rupee-sign"></i>{" "}
                  {+selectedRooms
                    .reduce((prev, curr) => prev + curr.qty * curr.roomPrice, 0)
                    .toFixed(2) +
                    +(
                      (selectedRooms.reduce(
                        (prev, curr) => prev + curr.qty * curr.roomPrice,
                        0
                      ) *
                        18) /
                      (100).toFixed(2)
                    )}{" "}
                </p>
              </div>

              <div className="pay-btn" onClick={(e) => bookRooms(e)}>
                Pay & Reserve
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default CongratsInner;
