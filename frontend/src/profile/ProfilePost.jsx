import { useState, useEffect } from "react";
import axios from "axios";
import "./EduWork.css";

function ProfilePost() {
  const [posts, setPosts] = useState([]);
  const BASE_URL = "http://localhost:8080";

  useEffect(() => {
    async function fetchPosts() {
      const res = await axios.get(
        "http://localhost:8080/post/get_my_posts",

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
                  src={`${BASE_URL}/uploads/${post.media}`}
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
