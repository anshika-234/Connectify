import { useState, useEffect } from "react";
import axios from "axios";
import "./Discover.css";
import useProfile from "../../hook/useProfile";
import ShowProfile from "../../showProfile/ShowProfile";
const API = import.meta.env.VITE_API_URL;

function Discover() {
  const [discover, setDiscover] = useState("");
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleDiscover = (e) => {
    setDiscover(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        `${API}/auth/user/find-user?searchUser=${discover}`,
        {
          withCredentials: true,
        },
      );

      console.log(res.data.user);
      setUsers(res.data.user);
    };
    fetchUsers();
  }, [discover]);
  return (
    <div className="discover">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="search"
          onChange={handleDiscover}
          value={discover}
          onFocus={() => setIsOpen(true)}
        />
      </form>
      {isOpen && <DiscoverPeople users={users} isOpen={handleOpen} />}
    </div>
  );
}

const DiscoverPeople = ({ users, isOpen }) => {
  const { open, selectedUserId, openProfile, closeProfile } = useProfile();
  return (
    <div>
      <div className="overlay" onClick={isOpen}>
        <div
          className="searched-user-section"
          onClick={(e) => e.stopPropagation()}
        >
          {users.map((user) => (
            <div className="searched-user" key={user._id}>
              <p
                className="searched-user-name"
                onClick={() => openProfile(user._id)}
              >
                {user.name}
              </p>
              <i className="fa-solid fa-user-plus"></i>
            </div>
          ))}
        </div>
      </div>
      {open && <ShowProfile userId={selectedUserId} onClose={closeProfile} />}
    </div>
  );
};

export default Discover;
