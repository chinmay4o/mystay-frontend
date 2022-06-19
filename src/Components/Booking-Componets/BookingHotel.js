import React, { useContext, useState, useEffect } from "react";
import { SelectedRoomsContext } from "../../context/hotelsContext.js";
import Modal from "../Modal/Modal"
import { configData } from "../../Config/config.js";

const BookingHotel = () => {
  const { selectedRooms, setSelectedRooms } = useContext(SelectedRoomsContext);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //saving success payment id by razorpay_payment_id
  const [successPaymentId, setSuccessPaymentId] = useState("");

  //Modal Display
  const [modalDisplay, setModalDisplay] = useState("none");
  const [modalContent, setModalContent] = useState("Please Fill all the details");

  // saving form info here
  const [userInfo, setUserInfo] = useState({
    fname: "",
    lname: "",
    gender: "",
    email: "",
    mobile: "",
    address: "",
  });

  //Calculating differecebetween Days/nights
  const date1 = new Date(localStorage.getItem("checkIn"));
  const date2 = new Date(localStorage.getItem("checkOut"));
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(diffTime + " milliseconds");
  console.log(diffDays + " days");

  //mapping a new array to save details in requires backend format
  let b1 = selectedRooms.map((ele, id) => {
    return {
      roomId: ele.roomId,
      hotelId: ele.hotelId,
      bookingNoOfRoom: ele.qty,
      checkIn: JSON.stringify(new Date(localStorage.getItem("checkIn"))).slice(1, 23),
      // checkIn: new Date(localStorage.getItem("checkIn")),
      checkOut: JSON.stringify(new Date(localStorage.getItem("checkOut"))).slice(1, 23),
      // checkOut: new Date(localStorage.getItem("checkOut")),
      night: diffDays,
    };
  });

  //main object to pass in Backend
  const [bookingDetails, setBookingDetails] = useState({
    guestDetails: {
      firstName: userInfo.fname,
      lastName: userInfo.lname,
      email: userInfo.email,
      mobile: userInfo.mobile,
    },
    bookingDetails: [...b1],
  });

  // onClick pay and reserve handler
  // onClick pay and reserve handler
  async function bookRooms(e) {
    e.preventDefault();

    setBookingDetails({
      guestDetails: {
        firstName: userInfo.fname,
        lastName: userInfo.lname,
        email: userInfo.email,
        mobile: userInfo.mobile,
      },
      bookingDetails: [...b1],
    });

    console.log(
      {
        guestDetails: {
          firstName: userInfo.fname,
          lastName: userInfo.lname,
          email: userInfo.email,
          mobile: userInfo.mobile,
        },
        bookingDetails: [...b1],
      },
      "console of details line 71"
    );

    if (
      !userInfo.fname ||
      !userInfo.lname ||
      !userInfo.email ||
      !userInfo.mobile
    ) {
      setModalDisplay("grid");
    } else {
      setBookingDetails({
        guestDetails: {
          firstName: userInfo.fname,
          lastName: userInfo.lname,
          email: userInfo.email,
          mobile: userInfo.mobile,
        },
        bookingDetails: [...b1],
      });

      const response = await fetch(
        `${configData.SERVER_URL}/api/v1/anonymous/roomBook`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            guestDetails: {
              firstName: userInfo.fname,
              lastName: userInfo.lname,
              email: userInfo.email,
              mobile: userInfo.mobile,
            },
            bookingDetails: [...b1],
          }),
        }
      );

      const data = await response.json();

      if (data.success === false) {
        setModalContent("Booking Failure");
        setModalDisplay("grid");
        console.log("Booking Failure");
        console.log("FinalData", data);
      } else {
        setModalContent("Booking Success");
        setModalDisplay("grid");
        console.log("Booking Success");
        console.log("FinalData", data);
      }
    }
  }

  //onclick of pay genrate oderId and open razorpay
  async function displayRazorpay(e) {
    if (
      !userInfo.fname ||
      !userInfo.lname ||
      !userInfo.email ||
      !userInfo.mobile
    ) {
      setModalDisplay("grid");
    } else {
      const orderId = await fetch(`${configData.SERVER_URL}/razorpay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount:
            +selectedRooms
              .reduce((prev, curr) => prev + curr.qty * curr.roomPrice, 0)
              .toFixed(2) +
            +(
              (selectedRooms.reduce(
                (prev, curr) => prev + curr.qty * curr.roomPrice,
                0
              ) *
                18) /
              (100).toFixed(2)
            ),
          currency: "INR",
        }),
      });

      const dataR = await orderId.json();

      var options = {
        key: "rzp_test_28IqL0gh4iu9ot", // Enter the Key ID generated from the Dashboard
        amount: dataR.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "MyStay Rooms",
        description: "Test-room Transaction",
        image:
          "https://ik.imagekit.io/k3m4pqzpmlr/coupons/1880-moon-outline_TBPed9a84.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1640773110779",
        order_id: dataR.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response) {
          setSuccessPaymentId(response.razorpay_payment_id);
          if (response.razorpay_payment_id) {
            bookRooms(e);
          }
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
          console.log(response);
        },
        prefill: {
          name: userInfo.fname,
          email: userInfo.email,
          contact: userInfo.mobile,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      // document.getElementById("rzp-button1").onclick = function (e) {
      //   rzp1.open();
      //   e.preventDefault();
      // };
    }
  }

  //useEffect Hook
  useEffect(() => {
    console.log("Rooms", selectedRooms);
    // console.log("checkin", localStorage.getItem("checkIn"));
    console.log(
      "checkinOO",
      JSON.stringify(new Date(localStorage.getItem("checkIn")))
    );
    console.log("b1", b1);
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
        <Modal
          content={modalContent}
          modalDisplay={modalDisplay}
          setModalDisplay={setModalDisplay}
        />
  
    <div className="booking-inner">
      <div className="b-box1">
        <p className="confirm-title">
          {" "}
          <i class="fas fa-long-arrow-alt-left"></i> Confirm your booking
        </p>

        <form className="form">
          <p className="guest-title"> Guest Information</p>

          <div className="form-grid">
            <div className="b1">
              <p>
                Name <sup>*</sup>{" "}
              </p>{" "}
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={userInfo.fname}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, fname: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={userInfo.lname}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, lname: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="b2">
              <p>
                Gender <sup>*</sup>
              </p>{" "}
              <div>
                <select
                  name="gender"
                  id="gender"
                  placeholder="Gender"
                  value={userInfo.gender}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setUserInfo({ ...userInfo, gender: e.target.value });
                  }}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {/* <input
                  type="text"
                  value={userInfo.gender}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, gender: e.target.value })
                  }
                /> */}
              </div>
            </div>
            <div className="b3">
              <p>
                Email <sup>*</sup>
              </p>{" "}
              <div>
                <input
                  type="text"
                  placeholder="Email"
                  value={userInfo.email}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="b4">
              <p>
                Number <sup>*</sup>
              </p>{" "}
              <div>
                <input
                  type="number"
                  placeholder="Phone Number"
                  value={userInfo.mobile}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, mobile: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="b5">
              <p>
                Address <sup>*</sup>
              </p>{" "}
              <div>
                <input
                  type="text"
                  placeholder="Address"
                  value={userInfo.address}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, address: e.target.value })
                  }
                />
              </div>
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
          Starting from {new Date(localStorage.getItem("checkIn")).getDate()}th{" "}
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
                <p className="dynamic">
                  {" "}
                  <i class="fas fa-rupee-sign"></i>{" "}
                  {(selectedRooms.reduce(
                    (prev, curr) => prev + curr.qty * curr.roomPrice,
                    0
                  ) *
                    18) /
                    (100).toFixed(2)}
                </p>
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
              {/* <div className="pay-btn" onClick={(e) => displayRazorpay(e)}> */}
                Pay & Reserve
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default BookingHotel;
