import { useState, useEffect } from "react";
import axios from "axios";
import "./EduWork.css";
const API = import.meta.env.VITE_API_URL;

function ProfilePost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await axios.get(
        `${API}/post/get_my_posts`,

        {
          withCredentials: true,
        },
      );

      setPosts(res.data.userPosts);
    }

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.length === 0 ? (
        <button className="add-button">Add Post</button>
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post._id}>
              <p>{post.userId?.name}</p>
              <p>{post.body}</p>
              {post.media && (
                <img
                  src={`${API}/uploads/${post.media}`}
                  alt="post"
                  className="post_img"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfilePost;
