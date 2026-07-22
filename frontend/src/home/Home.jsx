import { Routes, Route, useLocation } from "react-router-dom";
import Scroll from "./posts/Scroll.jsx";
import TopConnection from "../home/topConnection/TopConnection.jsx";
import MyConnections from "../pages/MyConnection.jsx";
import Sidebar from "../home/navbar/Sidebar.jsx";
import Profile from "../profile/Profile.jsx";
import Login from "../authentication/Login.jsx";
import CreatePost from "./posts/CreatePost.jsx";
import ShowRequest from "../request/ShowRequest.jsx";
import Chat from "../chat/Chat.jsx";
import ShowProfile from "../showProfile/ShowProfile.jsx";

import "./Home.css";

function Home() {
  const location = useLocation();
  const isHome = location.pathname === "/home";

  return (
    <div className="main-container h-screen  flex flex-col">
      <Sidebar />
      <div className={`flex flex-1 ${isHome ? "lg:flex-row" : "flex-col"}`}>
        <div
          className={`posts-area overflow-y-scroll h-[calc(100vh-68px)] ${isHome ? "w-full lg:w-[65%]" : "w-full"}`}
        >
          <Routes>
            <Route index element={<Scroll />} />
            <Route path="my_connection" element={<MyConnections />} />
            <Route path="friend_requests" element={<ShowRequest />} />
            <Route path="profile" element={<Profile />} />
            <Route path="top_connection" element={<TopConnection />} />
            <Route path="createpost" element={<CreatePost />} />
            <Route path="createprofile" element={<Login />} />
            <Route path="chats" element={<Chat />} />
            <Route path="showProfile" element={<ShowProfile />} />
          </Routes>
        </div>

        {isHome && (
          <div className="top-connection hidden lg:block lg:w-[35%] overflow-y-auto ">
            <TopConnection single={true} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
