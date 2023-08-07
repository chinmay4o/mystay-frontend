import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import citiesD from "../HomeComponets/citiesData.js";
import { nanoid } from "nanoid";

const Navbar = ({ setDestination }) => {
  const history = useHistory();
  const [show, setShow] = useState("none");
  const [width, setWidth] = useState(window.innerWidth);
  React.useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    // <div id="nav-parent" className="w-screen relative p-0 top-0 h-[70px] flex flex-col justify-self-center items-center bg-white z-10">
    //   <div className="navbar top-0 left-0 w-full  h-[70px] pl-1 pt-4 pr-3 place-items-center bg-white border-b-0 z-50 flex items-center justify-between">
    //     <div className="w-10 h-12" onClick={() => history.push("/")}>
    //       <img
    //         // src="https://ik.imagekit.io/k3m4pqzpmlr/Logo/mystay-logo-removebg-preview_s7Qj1Ibh3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655707681416"
    //         src="https://ik.imagekit.io/k3m4pqzpmlr/Hotel_pictures/mystay-logo-removebg-preview_Gu-jhBpNX.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656660679160"
    //         alt="mystay"
    //         className="logo-img"
    //       />
    //       {/* My<span>Stay</span>{" "} */}
    //     </div>

        
    //     <div className="flex flex-col gap-1">
    //       <span className="w-6 bg-primary h-[4px]">&nbsp;</span>
    //       <span className="w-6 bg-primary h-[4px]">&nbsp;</span>
    //       <span className="w-6 bg-primary h-[4px]">&nbsp;</span>
    //     </div>
    //   </div>

    //     <ul class="menu_ul">
    //       <li
    //         class="Destination-box"
    //         onClick={() => setShow(show === "none" ? "grid" : "none")}
    //       >
    //         {/* <a href="#location"> */}
    //         <a>
    //           {" "}
    //           {/* <i class="fas fa-home"></i> */}
    //           Search Destination <i class="fas fa-angle-down"></i>
    //           {citiesD.length !== 0 && (
    //             <div
    //               className="Destination-dataResult"
    //               style={{ display: show }}
    //             >
    //               {citiesD.slice(0, 15).map((ele, index) => {
    //                 return (
    //                   <p
    //                     className="dataItem"
    //                     onClick={() => {
    //                       // setDestination(ele.city.toLowerCase());
    //                       history.push(
    //                         `/hotels?city=${ele.city.toLowerCase()}&checkIn=${localStorage.getItem(
    //                           "checkIn"
    //                         )}&checkOut=${localStorage.getItem("checkOut")}`
    //                       );
    //                     }}
    //                     key={nanoid()}
    //                   >
    //                     {/* <p className="dataItem"> */}
    //                     {/* <img src={ele.img} alt="" className="img-search" /> */}
    //                     <p>{ele.city} </p>
    //                   </p>
    //                 );
    //               })}
    //             </div>
    //           )}
    //         </a>
    //       </li>
    //       <li class="nav_about">
    //         <a onClick={() => history.push(`/longstays`)}>
    //           {" "}
    //           {/* <i class="fas fa-people-carry"></i> */}
    //           Longstays <i class="fas fa-angle-down"></i>
    //         </a>
    //       </li>
    //       <li class="nav_work">
    //         <a
    //           href="https://master.d3mfetjd9ywif7.amplifyapp.com/"
    //           target="_blank"
    //           rel="noreferrer noopener"
    //         >
    //           {" "}
    //           {/* <i class="fas fa-globe-americas"></i>  */}
    //           Coworking
    //         </a>
    //       </li>
    //       <li
    //         class="nav_work"
    //         style={{ cursor: "pointer" }}
    //         onClick={() => history.push(`/aboutus`)}
    //       >
    //         {" "}
    //         <a>About Us</a>
    //       </li>
    //       <li class="nav_contact">
    //         <a href="#contact" className="contact">
    //           {" "}
    //           <p className="text-muted">
    //             <i className="fas fa-mobile-alt"></i>
    //             Customer Support
    //           </p>
    //           +91 8952093209
    //         </a>
    //       </li>
    //     </ul>
    // </div>
    <>
    {
      width > 760 ?(<DesktopComponent />):(<MobileComponent />)
    }
    </>

  );
};

const MobileComponent = () => {
  const history = useHistory();
  const [show, setShow] = useState("none");
  const [isOpen , setIsOpen] = useState(false)

  return(
    <div className="w-screen max-h-screen relative">
      <div className="w-full  p-4 flex justify-between items-center">
        <div className="" onClick={() => history.push("/")}>
          <img
            // src="https://ik.imagekit.io/k3m4pqzpmlr/Logo/mystay-logo-removebg-preview_s7Qj1Ibh3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655707681416"
            src="https://ik.imagekit.io/k3m4pqzpmlr/Hotel_pictures/mystay-logo-removebg-preview_Gu-jhBpNX.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656660679160"
            alt="mystay"
            className="h-10 w-12 object-contain"
          />
          {/* My<span>Stay</span>{" "} */}
        </div>
        <div className="flex flex-col gap-1 cursor-pointer" onClick={()=>setIsOpen(!isOpen)}>
          <span className="w-6 bg-primary h-[4px]">&nbsp;</span>
          <span className="w-6 bg-primary h-[4px]">&nbsp;</span>
          <span className="w-6 bg-primary h-[4px]">&nbsp;</span>
        </div>
      </div>
      <div className={`transition-all left-0 absolute duration-300 w-full h-screen z-[99999] flex flex-col justify-start items-left text-2xl bg-[#1f202c] p-8 gap-12 text-white font-bold ${isOpen ? "translate-x-0": "translate-x-full"}`}>
      
          <div
            className="hover:text-primary cursor-pointer relative"
            onClick={() => setShow(show === "none" ? "grid" : "none")}
          >
            {/* <a href="#location"> */}
            <a>
              {" "}
              {/* <i class="fas fa-home"></i> */}
              Search Destination <i class="fas fa-angle-down"></i>
              {citiesD.length !== 0 && (
                <div
                  className="absolute  max-w-[410px] grid mt-3 py-3 min-w-[210px] overflow-hidden overflow-y-auto shadow-lg gap-y-2 place-items-center grid-cols-1 grid-rows-2 rounded-lg bg-white "
                  style={{ display: show }}
                >
                  {citiesD.slice(0, 15).map((ele, index) => {
                    return (
                      <p
                        className="cursor-pointer"
                        onClick={() => {
                          // setDestination(ele.city.toLowerCase());
                          history.push(
                            `/hotels?city=${ele.city.toLowerCase()}&checkIn=${localStorage.getItem(
                              "checkIn"
                            )}&checkOut=${localStorage.getItem("checkOut")}`
                          );
                        }}
                        key={nanoid()}
                      >
                        {/* <p className="dataItem"> */}
                        {/* <img src={ele.img} alt="" className="img-search" /> */}
                        <p className="hover:bg-[#c7c7c7] hover:text-black text-xl text-[#c7c7c7]">{ele.city} </p>
                      </p>
                    );
                  })}
                </div>
              )}
            </a>
          </div>
          <div className="hover:text-primary cursor-pointer">
            <a onClick={() => history.push(`/longstays`)}>
              {" "}
              {/* <i class="fas fa-people-carry"></i> */}
              Longstays <i class="fas fa-angle-down"></i>
            </a>
          </div>
          <div className="hover:text-primary cursor-pointer">
            <a
              href="https://master.d3mfetjd9ywif7.amplifyapp.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              {" "}
              {/* <i class="fas fa-globe-americas"></i>  */}
              Coworking
            </a>
          </div>
          <div
            className="hover:text-primary cursor-pointer"
            style={{ cursor: "pointer" }}
            onClick={() => history.push(`/aboutus`)}
          >
            {" "}
            <a>About Us</a>
          </div>
          <div class="hover:text-primary cursor-pointer">
            <a className="flex flex-col-reverse">
              {" "}
              <p className="text-muted">
                <i className="fas fa-mobile-alt"></i>
                Customer Support
              </p>
              +91 8952093209
            </a>
          </div>
        </div>
    </div>
  )
}

const DesktopComponent = () => {
  const history = useHistory();
  const [show, setShow] = useState("none");
  const [isOpen , setIsOpen] = useState(false)

  return(
    <div className="w-screen h-16 flex p-4 lg:p-8 xl:p-12 items-center lg:justify-between">
      <div className="w-full p-2 flex justify-between items-center">
        <div className="" onClick={() => history.push("/")}>
          <img
            // src="https://ik.imagekit.io/k3m4pqzpmlr/Logo/mystay-logo-removebg-preview_s7Qj1Ibh3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655707681416"
            src="https://ik.imagekit.io/k3m4pqzpmlr/Hotel_pictures/mystay-logo-removebg-preview_Gu-jhBpNX.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656660679160"
            alt="mystay"
            className="h-12 w-14 lg:h-14 lg:w-16 object-contain"
          />
          {/* My<span>Stay</span>{" "} */}
        </div>
      
      </div>
      <div className={`transition-all  duration-300   flex justify-evenly items-center gap-4 lg:gap-10  flex-shrink-0 text-base lg:text-xl   text-black font-semibold `}>
      
          <div
            className="hover:text-primary cursor-pointer relative"
            onClick={() => setShow(show === "none" ? "grid" : "none")}
          >
            {/* <a href="#location"> */}
            <a>
              {" "}
              {/* <i class="fas fa-home"></i> */}
              Search Destination <i class="fas fa-angle-down"></i>
              {citiesD.length !== 0 && (
                <div
                  className="absolute  max-w-[410px] grid mt-3 py-3 min-w-[210px] overflow-hidden overflow-y-auto shadow-lg gap-y-2 place-items-center grid-cols-1 grid-rows-2 rounded-lg bg-white "
                  style={{ display: show }}
                >
                  {citiesD.slice(0, 15).map((ele, index) => {
                    return (
                      <p
                        className="cursor-pointer"
                        onClick={() => {
                          // setDestination(ele.city.toLowerCase());
                          history.push(
                            `/hotels?city=${ele.city.toLowerCase()}&checkIn=${localStorage.getItem(
                              "checkIn"
                            )}&checkOut=${localStorage.getItem("checkOut")}`
                          );
                        }}
                        key={nanoid()}
                      >
                        {/* <p className="dataItem"> */}
                        {/* <img src={ele.img} alt="" className="img-search" /> */}
                        <p className=" hover:text-black text-xl text-[#c7c7c7]">{ele.city} </p>
                      </p>
                    );
                  })}
                </div>
              )}
            </a>
          </div>
          <div className="hover:text-primary cursor-pointer">
            <a onClick={() => history.push(`/longstays`)}>
              {" "}
              {/* <i class="fas fa-people-carry"></i> */}
              Longstays <i class="fas fa-angle-down"></i>
            </a>
          </div>
          <div className="hover:text-primary cursor-pointer">
            <a
              href="https://master.d3mfetjd9ywif7.amplifyapp.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              {" "}
              {/* <i class="fas fa-globe-americas"></i>  */}
              Coworking
            </a>
          </div>
          <div
            className="hover:text-primary cursor-pointer"
            style={{ cursor: "pointer" }}
            onClick={() => history.push(`/aboutus`)}
          >
            {" "}
            <a>About Us</a>
          </div>
          <div class="hover:text-primary cursor-pointer">
            <a className="flex flex-col-reverse">
              {" "}
              <p className="text-primary">
                <i className="fas fa-mobile-alt"></i>
                Customer Support
              </p>
              +91 8952093209
            </a>
          </div>
        </div>
    </div>
  )
}

export default Navbar;

