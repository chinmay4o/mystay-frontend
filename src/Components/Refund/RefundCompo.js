import React from "react";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

const RefundCompo = () => {
    const history = useHistory();
    const { id } = useParams();
    const [payment, setPayment] = React.useState();
    localStorage.removeItem("bookingUserData")

    useEffect(() => {
        fetch(`http://localhost:5001/api/v1/anonymous/payment/${id}`)
          .then((res) => res.json())
          .then((data) => {console.log(data);setPayment(data.message.payment)});

      }, [id]);
    useEffect(() => {
        if(payment && payment?.status === "SUCCESS"){
            const roomBook = payment?.roomBookings[0];
            if(roomBook && (roomBook.status === "Failed" || roomBook.status === "FAILED")){

            }else{
                history.push(`/payment/${id}`)
            }
        }else{
            history.push(`/payment/${id}`)
        }
    },[payment])
  return (
    <div className=" w-full flex justify-center pt-10 md:pt-20 lg:pt-32 p-8 ">
      {payment && payment?.status && (
        <div className="w-full md:w-1/2 flex  flex-col items-center gap-4 md:gap-8 p-4 rounded-lg shadow-2xl">
          {payment?.status === "SUCCESS" ? (
            <>
              <img
                src="/images/Cancelled.svg"
                alt="Failed"
                className="h-12 w-12"
              />
              <div className="text-xl md:text-3xl">Booking Unsuccessfull!</div>
              <div className=" text-sm text-center md:text-xl text-gray-500">
                Payment was successful but booking was not done. Please contact us for more information. If you have been charged, you will be refunded.
                Click in refund button to get refund or contact us.
              </div>
              <div className="flex gap-2">
              <div className="cursor-pointer bg-primary text-white px-4 py-2 rounded-lg" onClick={() => history.push("/")}>
                  Refund
              </div>
              <div className="cursor-pointer bg-primary text-white px-4 py-2 rounded-lg" onClick={() => history.push("/")}>
                  Go to Home
              </div>
              </div>
            </>
          ) : (
            <>
              <img
                src="/images/Cancelled.svg"
                alt="Failure"
                className="h-12 w-12"
              />
              <div className="text-xl md:text-3xl">Booking Unsuccessfull!</div>
              <div className="text-sm text-center md:text-xl text-gray-500">
                Please check your email for more information.
              </div>
              <div className="cursor-pointer bg-primary text-white px-4 py-2 rounded-lg" onClick={() => history.push("/")}>
                  Go to Home
              </div>
            </>
          )}
        </div>
      )}
      {!payment  && <div className="text-primary text-4xl">Loading...</div>}
      
      </div>
  )
}

export default RefundCompo