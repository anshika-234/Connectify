import { useState } from "react";
import axios from "axios";
import authentication_img from "./../assets/authentication.svg";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
const API = import.meta.env.VITE_API_URL;

function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required..";
    }
    if (!formData.username) {
      newErrors.username = "Username os required..";
    } else if (!formData.username.startsWith("@")) {
      newErrors.username = "username contains should be @";
    }

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
      let res = await axios.post(`${API}/auth/signup`, formData, {
        withCredentials: true,
      });

      login(res.data.user, res.data.token);
      toast.success("You sign up successfully..");
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
    <div className="container-fluid signup-card mt-5">
      <h2>Create Your Professional Identity</h2>
      <p className="subtitle">
        Join Connectify and start building meaningful connections.
      </p>
      <div className="row main mt-5">
        <div className="col-lg-6 signup-input">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={handleInputs}
                className="form-control"
              />
              {error.name && <p className="error">{error.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="abc@gmail.com"
                value={formData.email}
                onChange={handleInputs}
                className="form-control"
              />
              {error.email && <p className="error">{error.email}</p>}
            </div>
            <div>
              <label htmlFor="username" className="form-label">
                User
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="@abc"
                value={formData.username}
                onChange={handleInputs}
                className="form-control"
              />
              {error.username && <p className="error">{error.username}</p>}
            </div>
            <div>
              <label htmlFor="password" className="from-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputs}
                className="form-control"
              />
              {error.password && <p className="error">{error.password}</p>}
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
        <div className="col-lg-6 signup_img">
          <img src={authentication_img} className="img-fluid" alt="signup" />
        </div>
      </div>
    </div>
  );
}

export default Signup;
