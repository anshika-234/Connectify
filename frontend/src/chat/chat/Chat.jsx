import { useState } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import "./Chat.css";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");
function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="chat">
      <div className="chat-chatList">
        <ChatList onSelectUser={setSelectedUser} />
      </div>
      {selectedUser && (
        <ChatWindow selectedUser={selectedUser} socket={socket} />
      )}
    </div>
  );
}

export default Chat;
