import { useState, useEffect } from "react";
import axios from "axios";
import { getImageSrc } from "../utils/helper.js";
import profilePhoto from "../assets/profilePhoto.jpg";
import "./Chat.css";

const API = import.meta.env.VITE_API_URL;

function ChatList({ onSelectUser, selectedUser, chatOrder }) {
  const [users, setUsers] = useState([]);

  // fetch all users only once on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API}/auth/get_all_users`, {
          withCredentials: true,
        });
        setUsers(res.data.profiles || []);
      } catch (err) {
        console.log("Error fetching users:", err);
      }
    };
    fetchUser();
  }, []); // runs only once

  // sort users based on chatOrder array coming from Chat.jsx
  // chatOrder = ["userId1", "userId2", ...] ordered by latest message
  const sortedUsers = [...users].sort((a, b) => {
    const aIndex = chatOrder.indexOf(a.userId._id);
    const bIndex = chatOrder.indexOf(b.userId._id);

    // if user is not in chatOrder (never messaged), push to bottom
    const aPos = aIndex === -1 ? Infinity : aIndex;
    const bPos = bIndex === -1 ? Infinity : bIndex;

    return aPos - bPos;
  });

  return (
    <div className="class-list">
      {sortedUsers.map((user) => (
        <div
          key={user._id}
          className={`class-list-data ${
            selectedUser?.userId?._id === user.userId._id
              ? "active-chat" // highlights currently open chat
              : ""
          }`}
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
