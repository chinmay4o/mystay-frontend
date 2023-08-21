import React, { useContext, useState, useEffect } from "react";
import {
  SelectedRoomsContext,
  UserContext,
} from "../../context/hotelsContext.js";
import PrimaryButton from "../../Common/buttons/PrimaryButton.js";
import Modal from "../Modal/Modal";
import { configData } from "../../Config/config.js";
import { useHistory } from "react-router-dom";
import Policies from "../SingleHotel-Components/Policies.js";
const BookingHotel = () => {
  const { selectedRooms, setSelectedRooms } = useContext(SelectedRoomsContext);
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();
  const [guestDetails, setGuestsDetails] = useState([]);

  useEffect(()=>{
    if(selectedRooms.length>0){
      localStorage.setItem("selectedRooms",JSON.stringify(selectedRooms));
    }else{
      const rooms = JSON.parse(localStorage.getItem("selectedRooms"));
      if(rooms && rooms.length>0){
        setSelectedRooms(rooms);
      }else{
        console.log(history.goBack());
      }
    }
  },[selectedRooms])

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
  const [modalDisplay, setModalDisplay] = useState(false);
  const [modalContent, setModalContent] = useState(
    "Please Fill all the details"
  );

  // saving form info here
  const [userInfo, setUserInfo] = useState({
    firstName: userData?.firstName ? userData.firstName : "",
    lastName: userData?.lastName ? userData.lastName : "",
    email: userData?.email ? userData.email : "",
    mobile: userData?.mobile ? userData.mobile : "",
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
      checkIn: JSON.stringify(new Date(localStorage.getItem("checkIn"))).slice(
        1,
        23
      ),
      // checkIn: new Date(localStorage.getItem("checkIn")),
      checkOut: JSON.stringify(
        new Date(localStorage.getItem("checkOut"))
      ).slice(1, 23),
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

  

  async function displayRazorpay() {
    console.log("hello");
    console.log(guestDetails);
    console.log(bookingDetails.bookingDetails);
    // return;
    if (
      !userInfo.firstName ||
      !userInfo.lastName ||
      !userInfo.email ||
      !userInfo.mobile
    ) {
      setModalDisplay("grid");
    } else {
      setUserData({ ...userData, ...userInfo });

      localStorage.setItem("bookingUserData", JSON.stringify(userInfo));
      console.log(bookingDetails, "bookingDetails");
      const orderId = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/anonymous/razorpay`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount:
              +selectedRooms.reduce(
                (prev, curr) => prev + curr.qty * curr.roomPrice,
                0
              ) *
                diffDays.toFixed(2) +
              +(
                (selectedRooms.reduce(
                  (prev, curr) => prev + curr.qty * curr.roomPrice,
                  0
                ) *
                  diffDays *
                  18) /
                (100).toFixed(2)
              ),
            currency: "INR",
          }),
        }
      );

      const dataR = await orderId.json();

      setBookingDetails({ ...bookingDetails, guestDetails: userInfo });

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
          const data = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/api/v1/anonymous/roomBook`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                amount: dataR.message.amount,
                bookingDetails: bookingDetails.bookingDetails,
                userDetails: userInfo,
                guestDetails: guestDetails,
              }),
            }
          );
          const data1 = await data.json();
          console.log(data1);
          if (
            data1.success === false &&
            data1.message.payment.status === "SUCCESS"
          ) {
            if (data1.message.newUser === true) {
              localStorage.setItem("token", data1.message.token);
              history.push(
                `/verify?redirect=/refund/${data1.message.payment._id}`
              );
            } else {
              history.push(`/refund/${data1.message.payment._id}`);
            }
          } else {
            if (data1.message.newUser === true) {
              localStorage.setItem("token", data1.message.token);
              history.push(
                `/verify?redirect=/payment/${data1.message.payment._id}`
              );
            } else {
              history.push(`/payment/${data1.message.payment._id}`);
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

      paymentObject.on("payment.failed", async function (response) {
        console.log(dataR.message.amount);
        const data = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/anonymous/payment/failure`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              amount: dataR.message.amount,
              bookingDetails: bookingDetails.bookingDetails,
                userDetails: userInfo,
                guestDetails: guestDetails,
            }),
          }
        );
        const data1 = await data.json();

        paymentObject.close();
        history.push(`/payment/${data1.message.payment._id}`);
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

      <div className="w-[90%] max-w-[1280px] bg-white flex flex-col lg:flex-row gap-6 justify-center mx-auto p-3  pb-24">
        <div className="">
          <p className="text-xl font-bold cursor-pointer" onClick={()=> history.goBack()}>
            {" "}
            <i className="fas fa-long-arrow-alt-left"></i> Confirm your booking
          </p>

          <form className="border-[2px] mb-8 border-[#f1f1f1] rounded-xl mt-6 overflow-hidden">
            <p className="bg-[#def5ff] text-[#2b2b2b] p-5 text-xl font-semibold">
              {" "}
              Guest Information
            </p>

            <div className="text-[#2b2b2b] py-[10px] px-5 mt-5">
              <div className="flex flex-col sm:flex-row sm:items-center  sm:gap-10 w-full">
                <p className="font-semibold text-[18px] p-4 flex items-center">
                  Name{" "}
                  <sup className="text-red-400 font-bold text-[16px]">*</sup>{" "}
                </p>{" "}
                <div className="grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 w-[90%] gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={userInfo.firstName}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, firstName: e.target.value })
                    }
                    className="placeholder:text-[#808080/50] font-medium p-2  text-black text-[18px] border-[2px] border-[#f1f1f1] rounded-[5px]"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={userInfo.lastName}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, lastName: e.target.value })
                    }
                    className="placeholder:text-[#808080/50] font-medium p-2  text-black text-[18px] border-[2px] border-[#f1f1f1] rounded-[5px]"
                  />
                </div>
              </div>
              <div className="flex sm:items-center flex-col sm:flex-row sm:gap-7 w-full">
                <p className="font-semibold text-[18px] p-4 flex items-center">
                  Gender{" "}
                  <sup className="text-red-400 font-bold text-[16px]">*</sup>
                </p>{" "}
                <div className="w-full">
                  <select
                    name="gender"
                    id="gender"
                    placeholder="Gender"
                    value={userInfo.gender}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setUserInfo({ ...userInfo, gender: e.target.value });
                    }}
                    className="font-semibold border-[2px] border-[#f1f1f1] rounded-lg w-[90%] h-11 p-3  outline-none"
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
              <div className="flex sm:items-center flex-col sm:flex-row  sm:gap-10 w-full">
                <p className="font-semibold text-[18px] p-4 flex items-center">
                  Email{" "}
                  <sup className="text-red-400 font-bold text-[16px]">*</sup>
                </p>{" "}
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Email"
                    value={userInfo.email}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, email: e.target.value })
                    }
                    className="font-semibold border-[2px] border-[#f1f1f1] rounded-lg w-[90%] h-11 p-3  outline-none"
                  />
                </div>
              </div>
              <div className="flex sm:items-center flex-col sm:flex-row sm:gap-5 w-full">
                <p className="font-semibold text-[18px] p-4 flex items-center">
                  Number{" "}
                  <sup className="text-red-400 font-bold text-[16px]">*</sup>
                </p>{" "}
                <div className="w-full">
                  <input
                    type="number"
                    placeholder="Phone Number"
                    value={userInfo.mobile}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, mobile: e.target.value })
                    }
                    className="font-semibold border-[2px] border-[#f1f1f1] rounded-lg w-[90%] h-11 p-3  outline-none"
                  />
                </div>
              </div>
              <div className="flex sm:items-center flex-col sm:flex-row sm:gap-5 w-full">
                <p className="font-semibold text-[18px] p-4 flex items-center">
                  Address{" "}
                  <sup className="text-red-400 font-bold text-[16px]">*</sup>
                </p>{" "}
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Address"
                    value={userInfo.address}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, address: e.target.value })
                    }
                    className="font-semibold border-[2px] border-[#f1f1f1] rounded-lg w-[90%] h-11 p-3  outline-none"
                  />
                </div>
              </div>
            </div>
            {guestDetails.length > 0 &&
              guestDetails.map((ele, index) => {
                return (
                  <div className="border-t-2 py-6 px-5 flex flex-col gap-2">
                    <div className="text-xl font-bold flex gap-4 items-center ">{`Guest #${
                      index + 1
                    }`}<span className="cursor-pointer" onClick={()=>{
                      const guests = [...guestDetails];
                      guests.splice(index,1);
                      setGuestsDetails(guests);
                    }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"  className="w-5 h-5 stroke-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  </span></div>
                    <div className="flex flex-col sm:flex-row sm:items-center  sm:gap-10 w-full">
                      <p className="font-semibold text-[18px] p-4 flex items-center">
                        <span className="">Name</span>
                        <sup className="text-red-400 font-bold text-[16px]">
                          *
                        </sup>{" "}
                      </p>
                      <div className="grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 w-[90%] gap-4">
                        <input
                          type="text"
                          placeholder="First Name"
                          value={ele.firstName}
                          onChange={(e) => {
                            const details = [...guestDetails];
                            details[index].firstName = e.target.value;
                            setGuestsDetails(details);
                          }}
                          className="placeholder:text-[#808080/50] font-medium p-2  text-black text-[18px] border-[2px] border-[#f1f1f1] rounded-[5px]"
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={ele.lastName}
                          onChange={(e) => {
                            const details = [...guestDetails];
                            details[index].lastName = e.target.value;
                            setGuestsDetails(details);
                          }}
                          className="placeholder:text-[#808080/50] font-medium p-2  text-black text-[18px] border-[2px] border-[#f1f1f1] rounded-[5px]"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

            <p className="w-full border-t-2 p-4 font-medium gap-4 flex">
              {guestDetails.length === 0 ? "Not Going Solo ?" : " "}
              <span
                className="text-primary cursor-pointer"
                onClick={() => {
                  setGuestsDetails([
                    ...guestDetails,
                    { firstName: "", lastName: "" },
                  ]);
                }}
              >
                Add another person
              </span>{" "}
            </p>
          </form>

          <Policies />
        </div>

        <div className="flex max-lg:w-full max-lg:items-center justify-center mt-20">
          <div className="p-8 border-[2px] rounded-2xl h-max flex flex-col gap-4 lg:w-max w-96 ">
            <p className="text-3xl font-bold ">Summary</p>

            <p className="text-[#808080] font-semibold">
              Starting from{" "}
              {new Date(localStorage.getItem("checkIn")).getDate()}th{" "}
              {monthNames[new Date(localStorage.getItem("checkIn")).getMonth()]}
            </p>

            <div className="text-[18px] flex-col flex gap-4 w-full">
              {selectedRooms.length === 0 ? (
                <p>No Rooms Selected</p>
              ) : (
                selectedRooms.map((ele, index) => {
                  return (
                    <div
                      className="flex justify-between items-center"
                      key={index}
                    >
                      <p className="font-bold">
                        {" "}
                        {ele.roomName}{" "}
                        <span className="text-[#808080] text-base font-semibold">
                          {" "}
                          X {ele.qty}
                        </span>
                      </p>
                      <p className="font-bold">
                        {" "}
                        <i className="fas fa-rupee-sign"></i>{" "}
                        {ele.roomPrice * ele.qty * diffDays}
                      </p>
                    </div>
                  );
                })
              )}

              <div className="bg-primary h-1 w-full">&nbsp;</div>
              <div className="flex justify-between items-center font-bold">
                <p className="font-bold">Tax</p>{" "}
                <p className="dynamic">
                  {" "}
                  <i className="fas fa-rupee-sign"></i>{" "}
                  {(selectedRooms.reduce(
                    (prev, curr) => prev + curr.qty * curr.roomPrice,
                    0
                  ) *
                    diffDays *
                    18) /
                    (100).toFixed(2)}
                </p>
              </div>

              <div className="flex justify-between items-center font-bold">
                <p className="font-bold ">Total payable</p>{" "}
                <p className="dynamic">
                  <i className="fas fa-rupee-sign"></i>{" "}
                  {+selectedRooms.reduce(
                    (prev, curr) => prev + curr.qty * curr.roomPrice,
                    0
                  ) *
                    diffDays.toFixed(2) +
                    +(
                      (selectedRooms.reduce(
                        (prev, curr) => prev + curr.qty * curr.roomPrice,
                        0
                      ) *
                        diffDays *
                        18) /
                      (100).toFixed(2)
                    )}{" "}
                </p>
              </div>

              <div className="flex items-center justify-center">
                <PrimaryButton
                  text="Book Now"
                  onClick={() => {
                    console.log(selectedRooms, "selectedRooms");
                    selectedRooms.length === 0
                      ? history.push("/booking")
                      : displayRazorpay();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingHotel;
