import { Routes, Route, useLocation } from "react-router-dom";
import Scroll from "./posts/Scroll.jsx";
import TopConnection from "../home/topConnection/TopConnection.jsx";
import MyConnections from "../pages/MyConnection.jsx";
import Sidebar from "../home/navbar/Sidebar.jsx";
import Profile from "../profile/Profile.jsx";
import Login from "../authentication/Login.jsx";
import CreatePost from "./posts/CreatePost.jsx";
import ShowRequest from "../network/requests/ShowRequest.jsx";
import Chat from "../chat/chat/Chat.jsx";

import "./Home.css";

function Home() {
  const location = useLocation();
  const isHome = location.pathname === "/home";

  return (
    <div className="main_home">
      {/* Row 1 — Navbar full width */}
      <Sidebar />

      {/* Row 2 — Posts + TopConnection */}
      <div className={`content-area ${isHome ? "with-top-connection" : ""}`}>
        {/* Left 70% */}
        <div className="posts-area">
          <Routes>
            <Route index element={<Scroll />} />
            <Route path="my_connection" element={<MyConnections />} />
            <Route path="friend_requests" element={<ShowRequest />} />
            <Route path="profile" element={<Profile />} />
            <Route path="top_connection" element={<TopConnection />} />
            <Route path="createpost" element={<CreatePost />} />
            <Route path="createprofile" element={<Login />} />
            <Route path="chats" element={<Chat />} />
          </Routes>
        </div>

        {/* Right 30% — sirf /home pe */}
        {isHome && (
          <div className="top-connection">
            <TopConnection single={true} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
