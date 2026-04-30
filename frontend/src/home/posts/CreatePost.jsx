import { useState, useEffect } from "react";
import "./CreatePost.css";
import axios from "axios";
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

    let res = await axios.post("http://localhost:8080/post/post", data, {
      withCredentials: true,
    });

    console.log(res.data.post);
    console.log("final data", formData);
    console.log(formData.media);
    setFormData({
      body: "",
      media: null,
    });
  };

  return (
    <div className="create_post">
      <form onSubmit={handleForm} className="create_post_form">
        <div className="body">
          <textarea
            name="body"
            id="body"
            onChange={handleChange}
            placeholder="Write Something"
          ></textarea>
        </div>
        <div className="media">
          <input type="file" name="media" onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreatePost;
