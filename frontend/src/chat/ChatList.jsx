import { useState, useEffect } from "react";
import axios from "axios";
import { getImageSrc } from "../utils/helper.js";
import profilePhoto from "../assets/profilePhoto.jpg";
import "./Chat.css";
const API = import.meta.env.VITE_API_URL;

function ChatList({ onSelectUser, selectedUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${API}/auth/get_all_users`, {
        withCredentials: true,
      });
      let allUsers = res.data.users;
      if (selectedUser) {
        const filteredUser = allUsers.filter(
          (user) => user._id !== selectedUser._id,
        );
        allUsers = [selectedUser, ...filteredUser];
      }
      setUsers(allUsers);
    };
    fetchUser();
  }, [selectedUser]);
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
