import axios from "axios";
import "./MyConnection.css";
import { useState, useEffect } from "react";
import { getImageSrc } from "../utils/helper";
import profilePhoto from "../assets/profilePhoto.jpg";
import { Link } from "react-router-dom";
import TopConnection from "../home/topConnection/TopConnection";
function MyConnections() {
  const [MyConnection, setMyConnection] = useState([]);
  useEffect(() => {
    const fetchMyConnection = async () => {
      let res = await axios.get(
        "http://localhost:8080/auth/user/see_all_connections",
        { withCredentials: true },
      );
      setMyConnection(res.data.connections);
      console.log("these are my connection", res.data.connections);
    };
    fetchMyConnection();
  }, []);
  return (
    <div className="my-connections-section">
      <h3>See Your Connections</h3>
      <div>
        {MyConnection.map((connection) => (
          <div key={connection._id} className="all-connection">
            <div className="my-connection-items">
              <img
                src={getImageSrc(connection?.profilePicture, profilePhoto)}
                alt="profile"
              />

              <div className="my-connection-name">
                <h3 className="name">{connection.name}</h3>
                <p className="username">{connection.username}</p>
              </div>
            </div>
            <Link className="send-message">Send Message</Link>
          </div>
        ))}
      </div>
      <div className="top-connection">
        <h3>Here You can make connections..</h3>
        <TopConnection single={false} />
      </div>
    </div>
  );
}

export default MyConnections;
