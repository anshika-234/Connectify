import { useState, useEffect } from "react";
import ChatList from "./ChatList.jsx";
import ChatWindow from "./ChatWindow.jsx";
import "./Chat.css";
import { io } from "socket.io-client";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;
const socket = io(API);

function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatOrder, setChatOrder] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // fetch current logged in user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await axios.get(`${API}/auth/get_user_and_profile`, {
        withCredentials: true,
      });
      setCurrentUser(res.data.user);
    };
    fetchCurrentUser();
  }, []);

  // fetch conversation order from DB on first load
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get(`${API}/chats/conversations`, {
          withCredentials: true,
        });
        const conversations = res.data.conversations;
        const orderedIds = conversations.map((c) => c.otherUserId.toString());
        setChatOrder(orderedIds);
      } catch (err) {
        console.log("Error fetching conversations:", err);
      }
    };
    fetchConversations();
  }, []);

  // listen for incoming messages and move sender to top
  useEffect(() => {
    if (!currentUser) return;

    socket.on("receive_message", (data) => {
      const senderId = data.senderId;
      setChatOrder((prev) => {
        const rest = prev.filter((id) => id !== senderId);
        return [senderId, ...rest];
      });
    });

    return () => {
      socket.off("receive_message");
    };
  }, [currentUser]);

  // called from ChatWindow when you send a message
  const handleMessageSent = (userId) => {
    setChatOrder((prev) => {
      const rest = prev.filter((id) => id !== userId);
      return [userId, ...rest];
    });
  };

  return (
    <div className="chat">
      <div className="chat-chatList">
        <ChatList
          onSelectUser={setSelectedUser}
          selectedUser={selectedUser}
          chatOrder={chatOrder}
        />
      </div>
      {selectedUser && (
        <ChatWindow
          selectedUser={selectedUser}
          socket={socket}
          onMessageSent={handleMessageSent}
        />
      )}
    </div>
  );
}

export default Chat;
