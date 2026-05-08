import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getImageSrc } from "../utils/helper.js";
import profilePhoto from "../assets/profilePhoto.jpg";
import "./Chat.css";

const API = import.meta.env.VITE_API_URL;

function ChatWindow({ selectedUser, socket, onMessageSent }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const bottomRef = useRef(null); // ✅ auto scroll to latest message

  // fetch current logged in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API}/auth/get_user_and_profile`, {
          withCredentials: true,
        });
        setCurrentUser(res.data.user);
      } catch (err) {
        console.log("Error fetching current user:", err);
      }
    };
    fetchUser();
  }, []);

  // fetch messages and listen for new ones when user is selected
  useEffect(() => {
    if (!currentUser || !selectedUser) return;

    const roomId = [currentUser._id, selectedUser.userId._id].sort().join("_");

    // join the socket room
    socket.emit("join_room", roomId);

    // fetch existing messages for this room
    const fetchChats = async () => {
      try {
        const res = await axios.get(`${API}/chats/message/${roomId}`, {
          withCredentials: true,
        });
        setMessages(res.data.chat);
      } catch (err) {
        console.log("Error fetching chats:", err);
      }
    };
    fetchChats();

    // listen for new incoming messages
    // check roomId so messages from other rooms don't leak in
    socket.on("receive_message", (data) => {
      if (data.roomId === roomId) {
        setMessages((prev) => [...prev, data]);
      }
    });

    // cleanup listener when user switches chat
    return () => {
      socket.off("receive_message");
    };
  }, [selectedUser, currentUser]);

  // auto scroll to bottom whenever messages change
  useEffect(() => {
    console.log("messages changed:", messages);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // send message function
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const roomId = [currentUser._id, selectedUser.userId._id].sort().join("_");

    // optimistic update — show message immediately without waiting for server
    const optimisticMsg = {
      _id: Date.now(),
      message: newMessage,
      senderId: currentUser._id,
      roomId,
    };
    setMessages((prev) => [...prev, optimisticMsg]);

    // emit socket event so receiver gets message in real time
    socket.emit("send_message", {
      roomId,
      message: newMessage,
      senderId: currentUser._id,
      receiverId: selectedUser.userId._id,
    });

    // save message to database
    await axios.post(
      `${API}/chats/message/send/${selectedUser.userId._id}`,
      { message: newMessage },
      { withCredentials: true },
    );

    // tell Chat.jsx to move this user to top of list
    onMessageSent(selectedUser.userId._id);

    setNewMessage("");
  };

  // send message on Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-window">
      {/* header */}
      <div className="chat-window-item">
        <img
          src={getImageSrc(selectedUser?.userId?.profilePicture, profilePhoto)}
          className="chat-window-avtaar"
        />
        <h1 className="chat-window-name">{selectedUser?.userId?.name}</h1>
      </div>

      {/* messages */}
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
        {/* this empty div is used to scroll to bottom */}
        <div ref={bottomRef} />
      </div>

      {/* input */}
      <div className="chat-window-fixed-item">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="chat-window-input"
          placeholder="Write a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;
