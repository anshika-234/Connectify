import { useState, useEffect } from "react";
import "./CreatePost.css";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;
function CreatePost() {
  const [formData, setFormData] = useState({
    body: "",
    media: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "media") {
      setFormData((prev) => ({ ...prev, media: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("body", formData.body);
    data.append("media", formData.media);

    let res = await axios.post(`${API}/post/post`, data, {
      withCredentials: true,
    });

    setFormData({
      body: "",
      media: null,
    });
  };

  return (
    <div className="create-post  !mt-4 md:!mt-10 lg:!mt-[150px]">
      <form onSubmit={handleForm} className="create-post-form">
        <div className="body">
          <textarea
            name="body"
            id="body"
            onChange={handleChange}
            placeholder="Write Something"
          ></textarea>
        </div>
        <div className="media">
          <label htmlFor="media">📎 Choose File</label>
          <input type="file" name="media" id="media" onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreatePost;
