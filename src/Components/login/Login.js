import React from 'react'
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import {UserContext} from '../../App'


const Login = () => {
    const {register, handleSubmit, formState: { errors }} = useForm();
    const history = useHistory();
    const onSubmit = async (data) => {
        console.log(data);
        const response = await fetch(
            `http://localhost:5001/api/v1/customer/login`,
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
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Email" {...register("email", {required: true})} className="w-96 h-12 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-primary" />
            <button type="submit" className="w-40 h-12 mt-4 mb-4 rounded-lg bg-primary text-white font-bold">Submit</button>
        </form>
    </div>
  )
}

export default Login