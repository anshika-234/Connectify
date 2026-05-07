import { useState } from "react";
import ChatList from "./ChatList.jsx";
import ChatWindow from "./ChatWindow.jsx";
import "./Chat.css";
import { io } from "socket.io-client";
const API = import.meta.env.VITE_API_URL;

const socket = io(API);
function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="chat">
      <div className="chat-chatList">
        <ChatList onSelectUser={setSelectedUser} selectedUser={selectedUser} />
      </div>
      {selectedUser && (
        <ChatWindow selectedUser={selectedUser} socket={socket} />
      )}
    </div>
  );
}

export default Chat;
