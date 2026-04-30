import { useState, useEffect } from "react";
import axios from "axios";
import { getImageSrc } from "../../utils/helper";
import profilePhoto from "../../assets/profilePhoto.jpg";
import "./Chat.css";

function ChatList({ onSelectUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:8080/auth/get_all_users", {
        withCredentials: true,
      });
      console.log("chat users", res.data.profiles);
      setUsers(res.data.profiles);
    };
    fetchUser();
  }, []);
  return (
    <div className="class-list">
      {users.map((user) => (
        <div
          key={user._id}
          className="class-list-data"
          onClick={() => onSelectUser(user)}
        >
          <img
            src={getImageSrc(user?.userId?.profilePicture, profilePhoto)}
            className="class-list-avtaar"
          />
          <h3 className="class-list-name">{user.userId.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
