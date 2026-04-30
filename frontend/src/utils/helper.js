const BASE_URL = "http://localhost:8080";
import axios from "axios";
import { toast } from "react-toastify";

export const getImageSrc = (picture, fallback) => {
  if (!picture) return fallback;
  if (picture.startsWith("http")) return picture;
  return `${BASE_URL}/uploads/${picture}`;
};

export const logOut = async () => {
  try {
    const res = await axios.post(
      "http://localhost:8080/auth/logout",
      {},
      {
        withCredentials: true,
      },
    );
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    console.log(res.data);
    toast.success("You logged out successfully.");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
