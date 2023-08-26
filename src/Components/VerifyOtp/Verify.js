import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/hotelsContext";
import AddUserDetails from "./AddUserDetails";
import OTPLogin from "./OtpLogin";

const Verify = () => {
  const { userData, setUserData } = React.useContext(UserContext);
  const search = useLocation().search;
  const [otp,setOtp]= React.useState(['','','',''])
  const [newUser, setNewUser] = React.useState(false);
  const params = new URLSearchParams(search).get("redirect");
  const history = useHistory();

  const handleChange = (e) => {
    const regex = /^[0-9\b]+$/;
    const inputChar = e.target.value;
    if (inputChar === "" || (regex.test(inputChar) && inputChar.length <= 1)) {
      // if (regex.test(inputChar) && inputChar.length <= 1) {
      const index = parseInt(e.target.id.slice(-1)) - 1;
      const newOtp = otp.slice();
      newOtp[index] = e.target.value;
      setOtp(newOtp);

      if (inputChar !== "" && index < 3) {
        const nextInput = e.target.nextSibling;
        if (nextInput) {
          nextInput.focus();
        }
      }
      if (inputChar === "" && index > 0) {
        const prevInput = e.target.previousSibling;
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  let token = localStorage.getItem("token");
  let user;
  console.log(user, "22");
  user = JSON.parse(localStorage.getItem("userData"));
  if (!user) user = JSON.parse(localStorage.getItem("bookingUserData"));
  const email = user?.email;

  console.log(params);
  // if (!token && !newUser) {
  //   history.push("/login");
  // }

  const onSubmit = async (data) => {
    console.log(data);

    console.log(email, "email");
    const finalOtp = Number(otp.join(""));

    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/customer/verifyOtp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: finalOtp,
          email: user.email,
          token: token,
        }),
      }
    );
    const data1 = await response.json();
    console.log(data1);

    if (data1.success === true && data1.data.jwt) {
      localStorage.removeItem("bookingUserData");
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      localStorage.setItem("accessToken", data1.data.jwt);
      if (data1.data.newUser) {
        setNewUser(data1.data.newUser);
      } else {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/customer/getUser`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": data1.data.jwt,
            },
          }
        );

        const data2 = await response.json();
        // console.log(data2);
        if (data2.success === true && data2.message.user) {
          setUserData(data2.message.user);
          if (params) {
            history.push(params);
          } else {
            history.push("/");
          }
        }
      }
    } else {
      reset({
        otp: "",
      });
      alert("Invalid OTP");
    }
  };

  const resendOtp = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/customer/sendOtp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );
      const data = await response.json();
      console.log(data.message.token);
      if (data.success === true) {
        alert("Otp Sent");
        token = data.message.token;
        localStorage.setItem("token", token);
        reset({
          otp: "",
        });
      }
    } catch (error) {}
  };

  return (
    <>
      {!newUser && (
        <section>
          <div className="relative items-center w-full h-[calc(100vh-64px)] flex justify-center px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-xl">
            <div className="w-full max-w-md p-8 mx-auto text-center">
              <div>
                <h2 className="text-[24px] font-[700] ">Verify</h2>
              </div>
              <div className="mt-8">
                <div className="mt-6">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <div className="col-span-full">
                      <label
                        className="block mb-3 text-sm font-medium text-gray-600"
                        name="email"
                      >
                        Enter OTP
                      </label>
                      <OTPLogin otp={otp} handleChange={handleChange} />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="btn  w-full bg-primary text-white hover:bg-white hover:text-primary"
                      >
                        <span> Submit </span>
                      </button>
                    </div>
                    <div className="text-sm text-primary cursor-pointer" onClick={()=>resendOtp()}>
                      Resend OTP
                      </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {newUser && <AddUserDetails setUserData={setUserData} />}
    </>
  );
};

export default Verify;

// {...register('otp', { required:' otp is required' })}
