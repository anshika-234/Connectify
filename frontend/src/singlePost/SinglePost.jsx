import { useState, useEffect } from "react";
import axios from "axios";
import { getImageSrc } from "../utils/helper";
import profilePhoto from "../assets/profilePhoto.jpg";
import { useParams } from "react-router-dom";

const BASE_URL = "http://localhost:8080";

function SinglePost() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    let fetchSinglePost = async () => {
      const res = await axios.get(
        `http://localhost:8080/post/get_single_post/${id}`,
      );
      console.log("This is post", res.data.post);
      setPost(res.data.post);
    };
    fetchSinglePost();
  }, []);
  if (!post) return <p>Loading...</p>;
  return (
    <div>
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
          src={getImageSrc(post.media, null)}
          alt="post"
          className="post_img"
        />
      )}
    </div>
  );
}

export default SinglePost;
