import { useEffect, useState, useRef } from "react";
import axios from "axios";
import WorkSection from "./WorkSection";
import EducationSection from "./EducationSection";
import UpdateProfilePhoto from "./UpdateProfilePhoto";
import ProfilePost from "./ProfilePost";
import ProfilePhoto from "../assets/ProfilePhoto.jpg";
import "./ProfileHeader.css";
import { getImageSrc } from "../utils/helper";
import Inputs from "./Inputs";

const API = import.meta.env.VITE_API_URL;

function ProfileHeader() {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    open: false,
    mode: "add",
    section: "education",
    item: null,
  });

  const [profile, setProfile] = useState({
    user: null,
    education: [],
    postWork: [],
    bio: "",
  });

  const handleEditEducation = (edu) => {
    setFormState((prev) => ({
      ...prev,
      open: true,
      item: edu,
      section: "education",
      mode: "edit",
    }));
  };
  const handleAddEducation = () => {
    setFormState((prev) => ({
      open: true,
      item: null,
      section: "education",
      mode: "add",
    }));
  };

  const handleEditWork = (work) => {
    setFormState((prev) => ({
      ...prev,
      open: true,
      item: work,
      section: "work",
      mode: "edit",
    }));
  };
  const handleAddWork = () => {
    setFormState((prev) => ({
      open: true,
      item: null,
      section: "work",
      mode: "add",
    }));
  };
  const handleOpenModel = () => {
    setOpen(!open);
  };
  const fileInputRef = useRef(null);

  useEffect(() => {
    async function fetchUser() {
      let res = await axios.get(
        `${API}/auth/get_user_and_profile`,

        {
          withCredentials: true,
        },
      );

      setProfile({
        user: res.data.user,
        education: res.data.profile?.education || [],
        postWork: res.data.profile?.postWork || [],
        bio: res.data.profile?.bio || "",
      });
    }
    fetchUser();
  }, []);

  return (
    <div className="profile-header">
      <div className="profile-header-left">
        <img
          src={getImageSrc(profile.user?.profilePicture, ProfilePhoto)}
          alt="profile"
          className="profile-header-avatar"
          onClick={handleOpenModel}
        />
        {open && (
          <UpdateProfilePhoto
            setProfile={setProfile}
            ref={fileInputRef}
            profilePicture={profile.user?.profilePicture}
            onClose={handleOpenModel}
          />
        )}

        <h2 className="name">{profile?.user?.name}</h2>
        <h3 className="username">{profile?.user?.username}</h3>
        <p className="bio"> {profile.bio}</p>
      </div>
      <div className="profile-header-right">
        {profile.education && (
          <EducationSection
            education={profile.education}
            onEdit={handleEditEducation}
            onAdd={handleAddEducation}
          />
        )}
        {formState.open && (
          <Inputs
            mode={formState.mode}
            selectedItem={formState.item}
            section={formState.section}
            setProfile={setProfile}
            setFormState={setFormState}
          />
        )}

        {profile.postWork && (
          <WorkSection
            postWork={profile.postWork}
            onEdit={handleEditWork}
            onAdd={handleAddWork}
          />
        )}

        <ProfilePost />
      </div>
    </div>
  );
}

export default ProfileHeader;
