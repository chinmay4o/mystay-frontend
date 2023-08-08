import React from 'react'
import {useHistory , useLocation} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { UserContext } from '../../context/hotelsContext'

const Verify = () => {
    const {userData , setUserData} = React.useContext(UserContext);
    const search = useLocation().search;
    const params = new URLSearchParams(search).get("redirect");
    const history = useHistory();
    const {register , handleSubmit , formState: { errors }} = useForm();
    const token = localStorage.getItem("token");

    console.log(params);
    if(!token){
        history.push("/login");
    }

    const onSubmit = async (data) => {
        console.log(data);
        let user;
        console.log(user , "22");
        
            user = JSON.parse(localStorage.getItem("bookingUserData"));
            console.log(user, "25");
            if(!user) user = JSON.parse(localStorage.getItem("userData"));

        const email = user.email;
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
        
            if (data1.success === true && data1.data.token) {
                localStorage.removeItem("bookingUserData");
                localStorage.removeItem("token");
                localStorage.setItem("accessToken", data1.data.token);
                const response = await fetch(`http://localhost:5001/api/v1/customer/getUser`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": data1.data.token,}
                });

                const data2 = await response.json();
                // console.log(data2);
                if(data2.success === true && data2.message.user){
                    setUserData(data2.user);
                    if(params){
                        history.push(params);
                    }else{
                        history.push("/");
                    }

                }
                    
            }
    }

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
            type="text"
            placeholder="Enter OTP"
            className="w-40 h-12 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-primary"
            {...register('otp', { required:' otp is required' })}
            />
            <button type="submit" className="w-40 h-12 mt-4 mb-4 rounded-lg bg-primary text-white font-bold">Verify</button>
        </form>
        <div></div>
    </div>
  )
}

export default Verify