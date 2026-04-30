import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  school: {
    type: String,
    default: "",
  },
  degree: {
    type: String,
    default: "",
  },
  fieldOfStudy: {
    type: String,
    default: "",
  },
});

const workSchema = new mongoose.Schema({
  company: {
    type: String,
    default: "",
  },
  positions: {
    type: String,
    default: "",
  },
  years: {
    type: String,
    default: "",
  },
});
const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  bio: {
    type: String,
    default: "",
  },
  currentpost: {
    type: String,
    default: "",
  },
  postWork: {
    type: [workSchema],
    default: [],
  },
  education: {
    type: [educationSchema],
    default: [],
  },
});

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
