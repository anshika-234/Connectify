import { useEffect, useState } from "react";
import axios from "axios";
import ProfilePhoto from "../../assets/profilePhoto.jpg";
import { getImageSrc } from "../../utils/helper";
import { toast } from "react-toastify";
import ShowProfile from "../../showProfile/ShowProfile.jsx";
import useProfile from "../../hook/useProfile.jsx";

import "./TopConnection.css";

const API = import.meta.env.VITE_API_URL;

function TopConnection({ single }) {
  const { open, selectedUserId, openProfile, closeProfile } = useProfile();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API}/auth/get_all_users`, {
          withCredentials: true,
        });
        console.log("these are profile data..", res.data.profiles);
        const sorted = res.data.profiles.sort((a, b) => {
          if (a.status === "pending") return 1;
          if (b.status === "pending") return -1;
          return 0;
        });

        setUsers(sorted);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };

    fetchUsers();
  }, []);

  const sendConection = async (id) => {
    try {
      const res = await axios.post(
        `${API}/auth/user/send_connection_request/${id}`,
        {},
        { withCredentials: true },
      );
      console.log("This is request data", res.data);
      toast.success("You send requested successfully..");
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };
  return (
    <div className="top-connections">
      <div
        className={`user-profile ${single ? "single-column" : "two-column"}`}
      >
        {users.map((user) => (
          <div
            key={user._id}
            className="user"
            onClick={() => {
              openProfile(user.userId._id);
            }}
          >
            <div className="about-user">
              <img
                src={getImageSrc(user.userId.profilePicture, ProfilePhoto)}
                className="profile-picture"
              />
              <div className="user-names">
                <h5 className="name">{user?.userId?.name}</h5>

                <h6 className="username">{user?.userId?.username}</h6>
              </div>
            </div>
            <button
              onClick={() => {
                sendConection(user._id);
              }}
              disabled={user.status === "pending"}
            >
              {user.status === "pending" ? "Pending" : "Connect"}
              {/* <span>
                <i className="fa-solid fa-plus"></i>
              </span> */}
            </button>
          </div>
        ))}
      </div>
      {open && <ShowProfile userId={selectedUserId} onClose={closeProfile} />}
    </div>
  );
}

export default TopConnection;
