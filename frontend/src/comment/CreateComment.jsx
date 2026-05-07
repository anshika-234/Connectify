import axios from "axios";
import { useState, useEffect } from "react";
import ShowComment from "./ShowComment.jsx";
import "./Comment.css";
import { getImageSrc } from "../utils/helper.js";
import profilePhoto from "../assets/profilePhoto.jpg";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

function CreateComment({ profilePicture, postId, isOpen, onClose }) {
  const [comment, setComment] = useState("");
  const handleInput = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API}/comments/create-comment/${postId}`,
        { body: comment },
        { withCredentials: true },
      );

      setComment("");
      toast.success("Your comment has been added successfully");
    } catch (err) {
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <div className="comment-section">
      <form onSubmit={handleSubmit}>
        <div className="add-comment">
          <img
            src={getImageSrc(profilePicture, profilePhoto)}
            alt="profile"
            className="comment-user-avatar"
          />

          <input
            type="text"
            placeholder="Write a comment"
            onChange={handleInput}
            value={comment}
          />
          <button>Comment</button>
        </div>
        <div>
          {" "}
          <ShowComment postId={postId} profilePicture={profilePicture} />{" "}
        </div>
      </form>
    </div>
  );
}

export default CreateComment;
