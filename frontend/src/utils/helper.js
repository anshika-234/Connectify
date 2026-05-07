const BASE_URL = "http://localhost:8080";
import axios from "axios";
import { toast } from "react-toastify";
const API = import.meta.env.VITE_API_URL;

export const getImageSrc = (picture, fallback) => {
  if (!picture) return fallback;
  if (picture.startsWith("http")) return picture;
  return `${API}/uploads/${picture}`;
};

export const logOut = async () => {
  try {
    const res = await axios.post(
      `${API}/auth/logout`,
      {},
      {
        withCredentials: true,
      },
    );
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    toast.success("You logged out successfully.");
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
};
