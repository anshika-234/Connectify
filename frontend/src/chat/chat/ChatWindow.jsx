import { useState, useEffect } from "react";
import axios from "axios";
import { getImageSrc } from "../../utils/helper";
import profilePhoto from "../../assets/profilePhoto.jpg";
import "./Chat.css";

function ChatWindow({ selectedUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        "http://localhost:8080/auth/get_user_and_profile",
        { withCredentials: true },
      );

      console.log(res);
      setCurrentUser(res.data.user);
    };
    fetchUser();
  }, []);
  useEffect(() => {
    console.log("selected User", selectedUser);
    if (!currentUser || !selectedUser) return;
    const roomId = [currentUser._id, selectedUser.userId._id].sort().join("_");
    console.log(roomId);
    socket.emit("join_room", roomId);
    const fetchChats = async () => {
      const res = await axios.get(
        `http://localhost:8080/chats/message/${roomId}`,
        { withCredentials: true },
      );
      console.log(res.data.chat);
      setMessages(res.data.chat);
    };
    fetchChats();
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => {
      socket.off("receive_message");
    };
  }, [selectedUser, currentUser]);

  // SENDMESSSAGE FUNCTION
  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    const roomId = [currentUser._id, selectedUser.userId._id].sort().join("_");
    socket.emit("send_message", {
      roomId,
      message: newMessage,
      senderId: currentUser._id,
      receiverId: selectedUser.userId._id,
    });
    const res = await axios.post(
      `http://localhost:8080/chats/message/send/${selectedUser.userId._id}`,
      { message: newMessage },
      { withCredentials: true },
    );
    setNewMessage("");
  };
  return (
    <div className="chat-window">
      <div className="chat-window-item">
        <img
          src={getImageSrc(selectedUser?.userId?.profilePicture, profilePhoto)}
          className="chat-window-avtaar"
        />
        <h1 className="chat-window-name">{selectedUser?.userId?.name}</h1>
      </div>
      <div className="chat-window-message">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={
              msg.senderId === currentUser?._id
                ? "chat-message-sent"
                : "chat-message-received"
            }
          >
            <p className="message">{msg.message}</p>
          </div>
        ))}
      </div>
      <div className="chat-window-fixed-item">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="chat-window-input"
          placeholder="Write a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;
