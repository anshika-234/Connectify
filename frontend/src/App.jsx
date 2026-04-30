import Home from "../src/home/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Signup from "./authentication/Signup.jsx";
import Login from "./authentication/Login.jsx";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import { Navigate } from "react-router-dom";
import SinglePost from "./singlePost/SinglePost.jsx";

function App() {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  8;
  return (
    <>
      {console.log("This is user", user)}
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <Dashboard />}
        />
        <Route
          path="/home/*"
          element={user ? <Home /> : <Navigate to="/auth/login" />}
        />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route
          path="/post/:id"
          element={user ? <SinglePost /> : <Navigate to="/auth/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
