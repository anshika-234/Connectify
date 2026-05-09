import axios from "axios";
import profilePhoto from "../../assets/profilePhoto.jpg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreateComment from "../../comment/CreateComment.jsx";
import { getImageSrc } from "./../../utils/helper.js";
import ShareModel from "../../shareModel/ShareModel.jsx";
import "./Posts.css";
import { toast } from "react-toastify";
import useProfile from "../../hook/useProfile.jsx";
import ShowProfile from "../../showProfile/ShowProfile.jsx";

const API = import.meta.env.VITE_API_URL;

function Scroll() {
  const { open, selectedUserId, openProfile, closeProfile } = useProfile();
  const [posts, setPosts] = useState([]);
  const [commentSectionId, setCommentSectionId] = useState(null);
  const [openShareId, setOpenShareId] = useState(null);

  const handleLikes = async (postId) => {
    try {
      const res = await axios.post(
        `${API}/post/like_post/${postId}`,
        {},
        { withCredentials: true },
      );

      const isLiked = res.data.like;

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: isLiked ? post.likes + 1 : post.likes - 1,
                likedBy: isLiked
                  ? [...(post.likedBy || []), "me"]
                  : (post.likedBy || []).filter((id) => id !== "me"),
              }
            : post,
        ),
      );
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  useEffect(() => {
    async function fetchPosts() {
      const res = await axios.get(`${API}/post/get_all_post`);
      setPosts(res.data.posts);
    }
    fetchPosts();
  }, []);

  return (
    <div className="post-section">
      <div className="all-posts">
        {posts.map((post) => (
          <div key={post._id} className="posts">
            <div
              className="about_user"
              onClick={() => {
                openProfile(post.userId._id);
              }}
            >
              <img
                src={getImageSrc(post.userId?.profilePicture, profilePhoto)}
                alt="profilePhoto"
                className="user_img"
              />

              <div className="names">
                <p className="name">{post.userId?.name}</p>
                <p className="username">{post.userId?.username}</p>
              </div>
            </div>

            <p className="post_body">{post.body}</p>

            {post.media && (
              <img
                src={`${API}/uploads/${post.media}`}
                alt="post"
                className="post_img"
              />
            )}

            <div className="post-actions">
              <Link onClick={() => handleLikes(post._id)}>
                {(post.likedBy || []).includes("me") ? (
                  <i className="fa-solid fa-thumbs-up"></i>
                ) : (
                  <i className="fa-regular fa-thumbs-up"></i>
                )}
                Like ({post.likes})
              </Link>

              <Link
                onClick={() =>
                  setCommentSectionId(
                    commentSectionId !== post._id ? post._id : null,
                  )
                }
              >
                <i className="fa-regular fa-comment"></i> Comment
              </Link>

              <Link onClick={() => setOpenShareId(post._id)}>
                <i className="fa-regular fa-paper-plane"></i> Send
              </Link>

              <Link>
                <i className="fa-regular fa-bookmark"></i>
              </Link>
            </div>

            {commentSectionId === post._id && (
              <CreateComment
                profilePicture={post.userId?.profilePicture}
                postId={post._id}
                isOpen={true}
                onClose={() => setCommentSectionId(null)}
              />
            )}

            {/*  SHARE */}
            {openShareId === post._id && (
              <ShareModel
                isOpen={true}
                onClose={() => setOpenShareId(null)}
                postUrl={`${API}/post/${post._id}`}
                postTitle={post.body.slice(0, 60) + "..."}
              />
            )}
          </div>
        ))}
      </div>
      {open && <ShowProfile userId={selectedUserId} onClose={closeProfile} />}
    </div>
  );
}

export default Scroll;
