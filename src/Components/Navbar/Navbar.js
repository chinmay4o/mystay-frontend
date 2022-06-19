import React from "react";
import {useHistory} from "react-router-dom";

const Navbar = () => {
  const history = useHistory();
  
  return (
    <div id="nav-parent">
      <nav class="navbar">
        <div class="logo" onClick={() => history.push("/")}>
          My<span>Stay</span>{" "}
        </div>

<div className="spacer">

</div>
        <input type="checkbox" id="click" />
        <label for="click" class="menu-btn">
      <i class="fas fa-bars"></i>
          {/* <i class="fas fa-basketball-ball" onclick="ulClose()"></i> */}
        </label>

        <ul class="menu_ul">
          <li class="nav_home">
            <a href="#home">
              {" "}
              {/* <i class="fas fa-home"></i> */}
               Search Desination <i class="fas fa-angle-down"></i>
            </a>
          </li>
          <li class="nav_about">
            <a href="#about">
              {" "}
              {/* <i class="fas fa-people-carry"></i> */}
               Longstays <i class="fas fa-angle-down"></i>
            </a>
          </li>
          <li class="nav_work">
            <a href="#work">
              {" "}
              {/* <i class="fas fa-globe-americas"></i>  */}
              Join Us
            </a>
          </li>
          <li class="nav_contact">
            <a href="#contact">
              {" "}
              {/* <i class="fas fa-mobile-alt"></i> */}
               Blog
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
