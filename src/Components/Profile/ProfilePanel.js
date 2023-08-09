import React from "react";
import { UserContext } from "../../context/hotelsContext";
import { useHistory } from "react-router-dom";
import DefaultProfilePicture from "../../Common/defaultProfilePicture/DefaultProfile";
import EditProfile from "./EditProfile";

const ProfilePanel = () => {
  const history = useHistory();
  const [showProfile, setShowProfile] = React.useState(true);
  const { userData, setUserData } = React.useContext(UserContext);
  const [data, setData] = React.useState({});
  React.useEffect(() => {
    if (userData) {
      setData(userData);
    } else {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const getUser = async () => {
          const response = await fetch(
            `http://localhost:5001/api/v1/customer/getUser`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-access-token": token,
              },
            }
          );
          const data = await response.json();
          console.log(data);
          setUserData(data.message.user);
          setData(data.message.user);
        };
        getUser();
      } else {
        history.push("/login");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUserData(null);
    history.push("/");
  }
  return (
    <>
      {showProfile === true && (
        <div
          className={`max-w-[1440px] px-[16px] w-full mx-auto min-h-[calc(100vh-58px)] md:w-[422px]`}
        >
          <div className="w-full h-[570px] mt-10">
            <p className="text-black text-opacity-50 pt-5 text-center">
              {data?.email}
            </p>
            <div className="mt-5">
              <hr />
            </div>

            <div className="flex items-center w-full md:w-[387px] h-[50px] mt-5">
              <DefaultProfilePicture
                firstName={data?.firstName}
                lastName={data?.lastName}
                style={{
                  height: "64px",
                  width: "64px",
                  borderRadius: "32px",
                }}
              />

              <div className="ml-5 w-full md:w-[259px] text-[14px]">
                <p className="font-semibold text-[17px] ">{`${data?.firstName ? data?.firstName : " "} ${data?.lastName ? data?.lastName : " "}`}</p>
                <p className="text-black text-opacity-50 mt-[0px]">
                  {data?.mobile ? data?.mobile : " "}
                </p>
              </div>
              <img
                src="/images/Edit.svg"
                alt="edit"
                className="h-[23px] w-[23px] md:h-[18px] md:w-[18px] cursor-pointer relative -left-[25px] md:static"
                onClick={() => setShowProfile("editProfile")}
              />
            </div>
            <div className="mt-5">
              <hr />
            </div>
            <div
              className={`cursor-pointer w-[140px] bg-primary text-[16px] grid place-items-center h-[40px] rounded-[8px] text-[#fff] font-[600] mt-[30px] mx-auto`}
                onClick={() => handleLogout()}
            >
              Logout
            </div>
          </div>
        </div>
      )}

      {showProfile === "editProfile" && (
        <EditProfile
          setShowProfile={setShowProfile}
          data={data}
          setData={setData}
          setUserData={setUserData}
        />
      )}
    </>
  );
};

export default ProfilePanel;
