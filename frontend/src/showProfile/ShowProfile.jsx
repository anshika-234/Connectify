// ShowProfile.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import profilePhoto from "../assets/profilePhoto.jpg";
import { getImageSrc } from "../utils/helper";
import "./ShowProfile.css";

const API = import.meta.env.VITE_API_URL;

function ShowProfile({ userId, onClose }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/auth/${userId}/profile`, {
          withCredentials: true,
        });
        setProfile(res.data.profile);
        console.log(res.data.profile);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [userId]);

  return (
    <div className="sp-overlay" onClick={onClose}>
      <div className="sp-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="sp-close-btn" onClick={onClose}>
          ✕
        </button>

        {loading ? (
          <div className="sp-loading">
            <div className="sp-spinner"></div>
            <p>Loading profile...</p>
          </div>
        ) : profile ? (
          <>
            {/* Header */}
            <div className="sp-header">
              <img
                src={getImageSrc(profile?.userId?.profilePicture, profilePhoto)}
                className="sp-avatar"
                alt="profile"
              />
              <div className="sp-header-info">
                <h2 className="sp-name">{profile?.userId?.name}</h2>
                <p className="sp-username">@{profile?.userId?.username}</p>
                {profile?.currentpost && (
                  <p className="sp-current-post">💼 {profile?.currentpost}</p>
                )}
              </div>
            </div>

            <hr className="sp-divider" />

            {/* Bio */}
            {profile?.bio && (
              <div className="sp-section">
                <h4 className="sp-section-title">About</h4>
                <p className="sp-bio">{profile?.bio}</p>
              </div>
            )}

            {/* Work Experience */}
            {profile?.postWork?.length > 0 && (
              <div className="sp-section">
                <h4 className="sp-section-title">Work Experience</h4>
                {profile.postWork.map((work, index) => (
                  <div key={index} className="sp-work-item">
                    <p className="sp-work-company">🏢 {work.company}</p>
                    <p className="sp-work-position">{work.positions}</p>
                    <p className="sp-work-years">📅 {work.years}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {profile?.education?.length > 0 && (
              <div className="sp-section">
                <h4 className="sp-section-title">Education</h4>
                {profile.education.map((edu, index) => (
                  <div key={index} className="sp-edu-item">
                    <p className="sp-edu-school">🎓 {edu.school}</p>
                    <p className="sp-edu-degree">{edu.degree}</p>
                    <p className="sp-edu-field">{edu.fieldOfStudy}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="sp-no-profile">
            <p>Profile not found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowProfile;
