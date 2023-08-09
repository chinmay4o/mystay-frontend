import React, { useContext, useState, useEffect } from "react";
import { SelectedRoomsContext , UserContext } from "../../context/hotelsContext.js";

import Modal from "../Modal/Modal"
import { configData } from "../../Config/config.js";
import { useHistory } from "react-router-dom";
const BookingHotel = () => {
  const { selectedRooms, setSelectedRooms } = useContext(SelectedRoomsContext);
  const {userData, setUserData} = useContext(UserContext);
  const history = useHistory();

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
    firstName: userData?.firstName ? userData.firstName : "",
    lastName: userData?.lastName ? userData.lastName : "",
    email: userData?.email ? userData.email : "",
    mobile: userData?.mobile ? userData.mobile : "",
    address: ""
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
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
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
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        mobile: userInfo.mobile,
      },
      bookingDetails: [...b1],
    });

    console.log(
      {
        guestDetails: {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          mobile: userInfo.mobile,
        },
        bookingDetails: [...b1],
      },
      "console of details line 71"
    );

    if (
      !userInfo.firstName ||
      !userInfo.lastName ||
      !userInfo.email ||
      !userInfo.mobile
    ) {
      setModalDisplay("grid");
    } else {
      setBookingDetails({
        guestDetails: {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
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
              firstName: userInfo.firstName,
              lastName: userInfo.lastName,
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
      !userInfo.firstName ||
      !userInfo.lastName ||
      !userInfo.email ||
      !userInfo.mobile
    ) {
      setModalDisplay("grid");
    } else {
      setUserData({...userData, ...userInfo});

      localStorage.setItem("bookingUserData", JSON.stringify(userInfo));
      const orderId = await fetch(`${configData.SERVER_URL}/api/v1/anonymous/razorpay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount:
            +selectedRooms
              .reduce((prev, curr) => prev + curr.qty * curr.roomPrice, 0)  * diffDays
              .toFixed(2) +
            +(
              (selectedRooms.reduce(
                (prev, curr) => prev + curr.qty * curr.roomPrice,
                0
              )  * diffDays *
                18) /
              (100).toFixed(2)
            ),
          currency: "INR",
        }),
      });

      const dataR = await orderId.json();

      setBookingDetails({...bookingDetails, guestDetails: userInfo})

      
      var options = {
        key: "rzp_test_vlPwuXtjFz1cq1", // Enter the Key ID generated from the Dashboard
        // key: "rzp_live_0tYxpyabQlGWRc", // Enter the Key ID generated from the Dashboard
        amount: dataR.message.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "MyStay Rooms",
        description: "Test-room Transaction",
        image:
          "https://ik.imagekit.io/k3m4pqzpmlr/coupons/1880-moon-outline_TBPed9a84.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1640773110779",
        order_id: dataR.message.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
          
         const data =  await fetch(`${configData.SERVER_URL}/api/v1/anonymous/roomBook`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              amount: dataR.message.amount,
              bookingDetails: bookingDetails.bookingDetails,
              guestDetails: userInfo,
            })})
            const data1 = await data.json()
            console.log(data1);
            if(data1.success === false && data1.message.payment.status === "SUCCESS"){
              if(data1.message.newUser === true){
                localStorage.setItem("token", data1.message.token);
                history.push(`/verify?redirect=/refund/${data1.message.payment._id}`)
              }else{
                history.push(`/refund/${data1.message.payment._id}`)
              }
            }else{
              if(data1.message.newUser === true){
                localStorage.setItem("token", data1.message.token);
                history.push(`/verify?redirect=/payment/${data1.message.payment._id}`)
              }else{
                history.push(`/payment/${data1.message.payment._id}`)
              }
          }
        },
        prefill: {
          name: userInfo.firstName,
          email: userInfo.email,
          contact: 9827485821,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on('payment.failed', async function (response){
        console.log(dataR.message.amount);
        const data =  await fetch(`${configData.SERVER_URL}/api/v1/anonymous/payment/failure`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...response,
            amount: dataR.message.amount,
          })})
          const data1 = await data.json();
          

            paymentObject.close();
            history.push(`/payment/${data1.message.payment._id}`)
          
});

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
          <i className="fas fa-long-arrow-alt-left"></i> Confirm your booking
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
                  value={userInfo.firstName}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, firstName: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={userInfo.lastName}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, lastName: e.target.value })
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
                      <i className="fas fa-rupee-sign"></i>{" "}
                      {ele.roomPrice * ele.qty * diffDays}
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
                  <i className="fas fa-rupee-sign"></i>{" "}
                  {(selectedRooms.reduce(
                    (prev, curr) => prev + curr.qty * curr.roomPrice,
                    0
                  )  * diffDays *
                    18) /
                    (100).toFixed(2)}
                </p>
              </div>

              <div className="payable">
                <p className="stable">Total payable</p>{" "}
                <p className="dynamic">
                  <i className="fas fa-rupee-sign"></i>{" "}
                  {+selectedRooms
                    .reduce((prev, curr) => prev + curr.qty * curr.roomPrice, 0) * diffDays
                    .toFixed(2) +
                    +(
                      (selectedRooms.reduce(
                        (prev, curr) => prev + curr.qty * curr.roomPrice,
                        0
                      )  * diffDays *
                        18) /
                      (100).toFixed(2)
                    )}{" "}
                </p>
              </div>

              {/* <div className="pay-btn" onClick={(e) => bookRooms(e)}> */}
              <div className="pay-btn" onClick={(e) => displayRazorpay(e)}>
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


