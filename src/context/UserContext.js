import React, {useState} from "react";
import {UserContext} from "./hotelsContext.js";

const UserStateContext = (props) => {

  const [userData , setUserData] = useState({
  });

    React.useEffect(() => {
        const token = localStorage.getItem("accessToken");
      if(token){
        const getUser = async () => {
          const response = await fetch(`http://localhost:5001/api/v1/customer/getUser`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token,
            },
          });
          const data = await response.json();
          console.log(data);
          setUserData(data.message.user);
        };
        getUser();
      }
    },[])

  return (
    <UserContext.Provider value={{ userData , setUserData}}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserStateContext;
