import axios from "axios";
import profilePhoto from "../../assets/profilePhoto.jpg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreateComment from "../../comment/CreateComment.jsx";
import { getImageSrc } from "./../../utils/helper.js";
import ShareModel from "../../shareModel/ShareModel.jsx";
import "./Posts.css";

const BASE_URL = "http://localhost:8080";

function Scroll() {
  const [posts, setPosts] = useState([]);
  const [commentSectionId, setCommentSectionId] = useState(null);
  const [like, setLike] = useState(0);
  const [openShareId, setOpenShareId] = useState(null);

  // const handleCommentSection = () => {
  //   setCommentSection(!commentSection);
  // };

  const handleLikes = async () => {
    let res = await axios.post(
      `http://localhost:8080/post/like_post/${posts._id}`,
      {},
      { withCredentials: true },
    );
    console.log(res.data);
  };

  useEffect(() => {
    async function fetchPosts() {
      let res = await axios.get("http://localhost:8080/post/get_all_post");
      setPosts(res.data.posts);
      console.log("These all are your post", res.data.posts);
    }
    fetchPosts();
  }, []);

  return (
    <div className="post-section">
      <div className="all-posts">
        {posts.map((post) => (
          <div key={post._id} className="posts">
            <div className="about_user">
              <img
                src={getImageSrc(post.userId.profilePicture, profilePhoto)}
                alt="profilePhoto"
                className="user_img"
              />

              <div className="names">
                <p className="name">{post.userId.name}</p>
                <p className="username">{post.userId.username}</p>
              </div>
            </div>

            <p className="post_body">{post.body}</p>
            {post.media && (
              <img
                src={`${BASE_URL}/uploads/${post.media}`}
                alt="post"
                className="post_img"
              />
            )}
            <div className="post-actions">
              <Link onClick={handleLikes}>
                <i className="fa-regular fa-thumbs-up"></i> Like
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
            <div className="create-comment-section">
              {commentSectionId === post._id && (
                <CreateComment
                  profilePicture={post.userId.profilePicture}
                  postId={post._id}
                  isOpen={commentSectionId === post._id}
                  onClose={() => setCommentSectionId(null)}
                />
              )}
            </div>
            <div>
              {openShareId && (
                <ShareModel
                  isOpen={openShareId === post._id}
                  onClose={() => setOpenShareId(null)}
                  postUrl={`http://localhost:5173/post/${post._id}`}
                  postTitle={post.body.slice(0, 60) + "..."}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Scroll;
