import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import "./Comment.css";
import { getImageSrc } from "../utils/helper.js";
import profilePhoto from "../assets/profilePhoto.jpg";

const API = import.meta.env.VITE_API_URL;

function ShowComment({ postId }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  useEffect(() => {
    let fetchComments = async () => {
      try {
        let res = await axios.get(`${API}/comments/all-comments/${postId}`, {
          withCredentials: true,
        });

        setComments(res.data.comments || []);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchComments();
  }, [postId]);
  return (
    <div className="show-comments">
      {comments.map((comment) => (
        <div key={comment._id} className="comment-items">
          <div className="user-data">
            <img
              src={getImageSrc(comment.userId?.profilePicture, profilePhoto)}
              alt="profile"
              className="comment-user-avatar"
            />
            <div>
              <p className="comment-user-name">{comment.userId?.name}</p>
              <p className="comment-user-username">
                {comment.userId?.username}
              </p>
            </div>
          </div>
          <div className="comment-body">
            <p className="body">{comment.body}</p>
            {user._id === comment.userId._id ? (
              <p>
                <i className="fa-solid fa-trash"></i>
              </p>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShowComment;
