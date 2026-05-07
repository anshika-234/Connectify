import { useState, useEffect } from "react";
import axios from "axios";
import "./Discover.css";
function Discover() {
  const [discover, setDiscover] = useState("");
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const handleDiscover = (e) => {
    setDiscover(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        `http://localhost:8080/auth/user/find-user?searchUser=${discover}`,
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
          onFocus={() => setOpen(true)}
        />
      </form>
      {open && <DiscoverPeople users={users} isOpen={handleOpen} />}
    </div>
  );
}

const DiscoverPeople = ({ users, isOpen }) => {
  return (
    <div className="overlay" onClick={isOpen}>
      <div
        className="searched-user-section"
        onClick={(e) => e.stopPropagation()}
      >
        {users.map((user) => (
          <div className="searched-user">
            <p className="searched-user-name">{user.name}</p>
            <i className="fa-solid fa-user-plus"></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;
