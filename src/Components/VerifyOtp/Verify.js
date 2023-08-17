import React from 'react'
import {useHistory , useLocation} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { UserContext } from '../../context/hotelsContext'
import AddUserDetails from './AddUserDetails'

const Verify = () => {
    const {userData , setUserData} = React.useContext(UserContext);
    const search = useLocation().search;
    const [newUser , setNewUser] = React.useState(false);
    const params = new URLSearchParams(search).get("redirect");
    const history = useHistory();
    const {register , handleSubmit, reset , formState: { errors }} = useForm();
    let token = localStorage.getItem("token");
    let user;
    console.log(user , "22");
    user = JSON.parse(localStorage.getItem("userData"));
    if(!user) user = JSON.parse(localStorage.getItem("bookingUserData"));
    const email = user?.email;

    console.log(params);
    if(!token && !newUser){
        history.push("/login");
    }

    const onSubmit = async (data) => {
        console.log(data);
        
        console.log(email , "email");
        
        const response = await fetch(
            `http://localhost:5001/api/v1/customer/verifyOtp`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                otp: parseInt(data.otp),
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
                if(data1.data.newUser){
                  setNewUser(data1.data.newUser);
                }else{

                  const response = await fetch(`http://localhost:5001/api/v1/customer/getUser`, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      "x-access-token": data1.data.jwt,}
                    });
                    
                    const data2 = await response.json();
                    // console.log(data2);
                    if(data2.success === true && data2.message.user){
                    setUserData(data2.message.user);
                    if(params){
                        history.push(params);
                      }else{
                        
                        history.push("/");
                      }

                    }
                  }
                    
            }else{
                reset({
                  otp: "",
                });
                alert("Invalid OTP")
            }
    }

    const resendOtp = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/v1/customer/sendOtp`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
            }),

          }
        )
        const data = await response.json();
        console.log(data.message.token);
        if (data.success === true) {
          alert("Otp Sent");
          token = data.message.token;
          localStorage.setItem("token", token);
          reset({
            otp: "",
          })
        }

      } catch (error) {
        
      }
    }

  return (
    <>
    {!newUser &&
      <div className='w-full h-full flex flex-col items-center justify-center gap-12'>
            <div className="text-gray-700 text-2xl md:text-4xl font-normal">Email Verification</div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col shadow-lg p-6 rounded-lg w-max gap-2 md:gap-6 justify-center items-center'>
            <label className="text-gray-600 text-sm md:text-normal font-normal">We have a verification code to {email}</label>
            <input
            type="text"
            placeholder="Enter OTP"
            className="w-40 md:w-full  h-12 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-primary"
            {...register('otp', { required:' otp is required' })}
            />
            <button type="submit" className="w-40 md:w-full h-12 mt-4 mb-4 rounded-lg bg-primary text-white font-bold">Verify</button>
            <div className='text-blue-600 cursor-pointer' onClick={()=> resendOtp()}>Resend code?</div>
        </form>
        <div></div>
    </div>
    }
    {
      newUser && 
      <AddUserDetails
        setUserData={setUserData}
      />
    }
            </>
  )
}

export default Verify