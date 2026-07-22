import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

import "./Login.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required..";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required..";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password should be more than 6";
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputs = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      let res = await axios.post(`${API}/auth/login`, formData, {
        withCredentials: true,
      });
      login(res.data.user, res.data.token);

      toast.success(`${res.data.user.name} you logged in successfully`);
      navigate("/home");
    } catch (error) {
      if (error.response?.data?.message) {
        setError({ api: error.response.data.message });
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-wrapper">
      <div className="login-form w-full md:w-[60%] lg:w-[30%]">
        <form onSubmit={handleSubmit}>
          <div className="login-data">
            <div className="data">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="abc@gmail.com"
                value={formData.email}
                onChange={handleInputs}
              />
              {error.email && <p className="error">{error.email}</p>}
            </div>

            <div className="data ">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputs}
              />
              {error.password && <p className="error">{error.password}</p>}
            </div>
            <div className="btn">
              <button type="submit">Login In</button>
            </div>
            <div className="no-account">
              <p>
                Do not have account? <Link to="/auth/signup">Sign Up</Link>{" "}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
