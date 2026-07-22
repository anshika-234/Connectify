import { useState } from "react";
import { Link } from "react-router-dom";
import Discover from "./Discover";
import { logOut } from "../../utils/helper";
import "./Sidebar.css";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!open);

  return (
    <nav className="navbar">
      <div className="nav-items">
        {/* Left: nav links */}
        <div className="nav-links">
          <Link to="/home">
            <i className="fa-solid fa-house"></i>
          </Link>
          <div>
            <Discover />
          </div>
        </div>

        {/* Right: actions */}
        <div className="nav-actions">
          {/* Profile dropdown */}
          <div className="profile" onClick={toggleMenu}>
            <i className="fa-solid fa-circle-user "></i>
            <div
              className={`dropdown
                ${open ? "show" : ""}`}
            >
              <p className="mb-2">
                <Link to="/home/profile">Profile</Link>
              </p>
              <hr className="border-gray-700" />
              <p className="mt-2">
                <Link to="/auth/login" onClick={logOut}>
                  Logout
                </Link>
              </p>
            </div>
          </div>

          <Link to="/home/createpost">
            <i className="fa-solid fa-plus "></i>
          </Link>
          <Link to="/home/friend_requests">
            <i className="fa-solid fa-bell"></i>
          </Link>
          <Link to="/home/my_connection">
            <i className="fa-solid fa-user-group "></i>
          </Link>
          <Link to="/home/chats">
            <i className="fa-solid fa-comment-dots"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
