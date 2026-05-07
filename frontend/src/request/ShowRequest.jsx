import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./ShowRequest.css";
import TopConnection from "../home/topConnection/TopConnection";
import { getImageSrc } from "../utils/helper.JS";
import profilePhoto from "../assets/profilePhoto.jpg";
const API = import.meta.env.VITE_API_URL;

function ShowRequest() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        const res = await axios.get(`${API}/auth/user/see_all_request`, {
          withCredentials: true,
        });

        setRequests(res.data.requests);
      } catch (err) {
        toast.error(
          err.response?.data?.message ||
            "Something went wrong .. Please try again later..",
        );
      }
    };

    fetchAllRequests();
  }, []);

  const acceptRequest = async (id) => {
    try {
      await axios.post(
        `${API}/auth/user/response_to_pending_request/${id}`,
        { status: "accepted" },
        { withCredentials: true },
      );

      setRequests((prev) => prev.filter((request) => request._id !== id));

      toast.success("You are now friends 🎉");
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  const declineRequest = async (id) => {
    try {
      await axios.post(
        `${API}/auth/user/response_to_pending_request/${id}`,
        { status: "rejected" },
        { withCredentials: true },
      );

      setRequests((prev) => prev.filter((request) => request._id !== id));

      toast.error("Request declined");
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <div className="request-section">
      {requests.length === 0 ? (
        <h3 style={{ textAlign: "center", padding: "10px" }}>
          There is no friend request.
        </h3>
      ) : (
        <AllRequests
          requests={requests}
          acceptRequest={acceptRequest}
          declineRequest={declineRequest}
        />
      )}

      <div className="top-connection">
        <h3>People you may know</h3>
        <TopConnection single={false} />
      </div>
    </div>
  );
}

function AllRequests({ requests, acceptRequest, declineRequest }) {
  return (
    <div className="all-requests">
      {requests.map((request) => (
        <div key={request._id}>
          <div className="user-items">
            <img
              src={getImageSrc(request.sender.profilePhoto, profilePhoto)}
              alt="profile"
            />

            <div className="user-name">
              <h3>{request.sender.name}</h3>
              <p>{request.sender.username}</p>
            </div>
          </div>

          <div className="buttons">
            <button onClick={() => acceptRequest(request._id)}>Accept</button>

            <button onClick={() => declineRequest(request._id)}>Decline</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShowRequest;
