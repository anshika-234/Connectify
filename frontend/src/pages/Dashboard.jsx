import online_connection from "./../assets/online_connection.svg";
import "./dashboard.css";
import { Link } from "react-router-dom";
function Dashboard() {
  return (
    <div className="container-fluid  ">
      <div className="row dashboard">
        <div className="col-lg-6 dashboard-left">
          <h2>
            <span>Connect.</span> Collaborate. <span>Create</span>{" "}
            Opportunities.
          </h2>
          <p>
            Connectify is a professional networking platform built for ambitious
            individuals who want to grow their careers, share ideas, and build
            meaningful connections.
          </p>
          <Link to="/auth/login">Get Started With Connectify</Link>
        </div>
        <div className="col-lg-6 dashboard-right">
          <img
            src={online_connection}
            alt="Online Connection"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
