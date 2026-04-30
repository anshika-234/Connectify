import { useState } from "react";
import "./Discover.css";
function Discover() {
  const [discover, setDiscover] = useState("");
  const handleDiscover = (e) => {
    setDiscover(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="discover">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="search"
          onChange={handleDiscover}
          value={discover}
        />
      </form>
    </div>
  );
}

export default Discover;
