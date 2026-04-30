import { useState, forwardRef } from "react";
import axios from "axios";
import { getImageSrc } from "../utils/helper";
import ProfilePhoto from "../assets/ProfilePhoto.jpg";
import "./UpdateProfilePhoto.css";

const UpdateProfilePhoto = forwardRef(
  ({ setProfile, profilePicture, onClose }, ref) => {
    const [file, setFile] = useState(null);

    const handleChange = async (e) => {
      try {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        const data = new FormData();
        data.append("profile", selectedFile);

        const res = await axios.post(
          "http://localhost:8080/auth/update-profile",
          data,
          { withCredentials: true },
        );

        setProfile((prev) => ({
          ...prev,
          user: res.data.user,
        }));
      } catch (err) {
        console.log(err.message);
      }
    };

    const removeProfilePhoto = () => {};

    return (
      <div className="overlay" onClick={onClose}>
        <div
          className="update-profile-photo"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={getImageSrc(profilePicture, ProfilePhoto)}
            alt="Profile photo"
            className="update-profile-avtaar"
          />
          <input
            type="file"
            onChange={handleChange}
            ref={ref}
            style={{ display: "none" }}
            className="update-profile-input"
          />
          <div className="update-profile-buttons">
            <button onClick={() => ref.current.click()}>Edit</button>
            <button>Remove</button>
          </div>
        </div>
      </div>
    );
  },
);

export default UpdateProfilePhoto;
