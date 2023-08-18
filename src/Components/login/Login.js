import React from 'react'
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
// import {UserContext} from '../../App'


const Login = () => {
    const {register, handleSubmit, formState: { errors }} = useForm();
    const history = useHistory();
    const onSubmit = async (data) => {
        console.log(data);
        console.log(process.env.REACT_APP_SERVER_URL);
        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/api/v1/customer/login`,
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                email: data.email,
                }),
            });
            const data1 = await response.json();
            console.log(data1);
            if(data1.success === true){
                localStorage.setItem("token", data1.data.token);
                localStorage.setItem("userData", JSON.stringify({email: data.email}));
                history.push("/verify");
            }
    }

  return (
    <div className='w-full h-full flex  flex-col gap-16 pt-40 items-center'>
        <div className='text-4xl font-bold text-primary'>Login</div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 items-center'>
            <label className="text-gray-700 text-xl font-normal">Enter Your email </label>
            <input type="text" placeholder="Email" {...register("email", {required: true})} className="w-72 md:w-96 h-12 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-primary" />
            <button type="submit" className="w-72 md:w-96 h-12 mt-4 mb-4 rounded-lg bg-primary text-white font-normal">Submit</button>
        </form>
    </div>
  )
}

export default Login