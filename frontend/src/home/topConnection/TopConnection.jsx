import { useEffect, useState } from "react";
import axios from "axios";
import ProfilePhoto from "../../assets/profilePhoto.jpg";
import { getImageSrc } from "../../utils/helper";
import { toast } from "react-toastify";
import ShowProfile from "../../showProfile/ShowProfile.jsx";
import "./TopConnection.css";

const BASE_URL = "http://localhost:8080";
function TopConnection({ single }) {
  const [users, setUsers] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/auth/get_all_users",
          {
            withCredentials: true,
          },
        );
        console.log(res.data.profiles);
        setUsers(res.data.profiles);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };

    fetchUsers();
  }, []);

  const sendConection = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/auth/user/send_connection_request/${id}`,
        {},
        { withCredentials: true },
      );
      toast.success("You send requested successfully..");
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="top-connections">
      <div
        className={`user-profile ${single ? "single-column" : "two-column"}`}
      >
        {users.map((user) => (
          <div key={user._id} className="user">
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
            >
              Connect{" "}
              <span>
                <i className="fa-solid fa-plus"></i>
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopConnection;
