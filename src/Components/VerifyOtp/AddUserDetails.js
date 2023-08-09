import React from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../Common/inputs/TextInput.js";
import { useHistory } from "react-router-dom";

const AddUserDetails = ({ setUserData }) => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    setIsSubmitting(true);
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`http://localhost:5001/api/v1/customer/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({
        user: {
          firstName: data.firstName,
          lastName: data.lastName,
          mobile: data.mobile,
        },
      }),
    });

    const res = await response.json();
    if (res.success && res.code === 200) {
      setUserData(res.message.user);
      history.push("/");
      setIsSubmitting(false);
    } else {
      alert("Error updating user");
    }

    setIsSubmitting(false);
  };

  const handleNotNow = async () => {
    setIsSubmitting(true);
    const token = localStorage.getItem("accessToken");
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

    const data2 = await response.json();
    console.log(data2);
    if (data2.success === true && data2.message.user) {
      setUserData(data2.message.user);
        history.push("/");
    }
  };

  return (
    <div
      className={`max-w-[1440px] w-full mx-auto min-h-[calc(100vh_-_60px)] md:w-[375px] mt-[40px]`}
    >
      <div className="w-full -mt-[10px]">
        <div className="w-full md:w-full p-5 pt-2">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="font-[600] text-[23px]">Add User Details</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-[6px]">
              {/* <FileInput
                    profilePicture={profilePicture}
                    setProfilePicture={setProfilePicture}
                    label="Profile picture (Recommended size - 500 X 500 pixels)"
                    mb="5"
                  /> */}
              <TextInput
                register={register}
                type="text"
                id={"firstName"}
                label="First Name"
              />
              <TextInput
                register={register}
                type="text"
                id={"lastName"}
                label="Last Name"
              />
              <TextInput
                register={register}
                type="tel"
                id={"mobile"}
                label="Phone Number"
                minLength={10}
                maxLength={10}
              />
              <div className="-mt-[10px] w-full bg-primary p-2 flex items-center justify-center rounded-lg">
                <button
                  value={isSubmitting ? "Loading..." : "Save Changes"}
                  type="submit"
                  className=" text-white"
                  disabled={isSubmitting}
                >
                  Save Changes
                </button>
              </div>

              <div
                className="mt-[12px] w-full flex items-center gap-2 cursor-pointer text-primary justify-center"
                onClick={() => handleNotNow()}
                disabled={isSubmitting}
              >
                Not Now
              </div>
              {/* <div className="spacer mb-[35px]"></div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserDetails;
