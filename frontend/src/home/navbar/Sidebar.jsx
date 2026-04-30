import { useState } from "react";
import { Link } from "react-router-dom";
// import logo from "./../assets/connectify.png";
import "./Sidebar.css";
import Discover from "./Discover";
import { getImageSrc, logOut } from "../../utils/helper";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen(!open);
  };
  return (
    <div className="navbar">
      {/* <div className="logo">
        <img src={logo} alt="logo" className="logo-img img-fluid" />
      </div> */}
      <div className="nav-items">
        <div className="nav-links">
          <div className="home">
            <Link to="/home">
              <p>
                <i className="fa-solid fa-house"></i>
              </p>
            </Link>
          </div>

          <div className="discover">
            <Discover />
          </div>
        </div>
        <div className="nav-actions">
          <div className="profile" onClick={toggleMenu}>
            <p>
              <i className="fa-solid fa-circle-user"></i>
            </p>

            <div className={`dropdown ${open ? "show" : ""}`}>
              <p>
                <Link to="/home/profile">Profile</Link>
              </p>
              <hr />
              <p>
                <Link to="/auth/login" onClick={logOut}>
                  Logout
                </Link>
              </p>
            </div>
          </div>
          <div className="createPost">
            <Link to="/home/createpost">
              <p>
                <i className="fa-solid fa-plus"></i>
              </p>
            </Link>
          </div>
          <div className="friend-requests">
            <Link to="/home/friend_requests">
              <i className="fa-solid fa-bell"></i>
            </Link>
          </div>
          <div className="my-connections">
            <Link to="/home/my_connection">
              <p>
                <i className="fa-solid fa-user-group"></i>
              </p>
            </Link>
          </div>
          <div className="/chats">
            <Link to="/home/chats">
              <i className="fa-solid fa-comment-dots"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
