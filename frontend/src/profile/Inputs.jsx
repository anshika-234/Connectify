import { useState, useEffect } from "react";
import "./Input.css";
import axios from "axios";
import { toast } from "react-toastify";

function Inputs({ mode, selectedItem, section, setProfile, setFormState }) {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    company: "",
    positions: "",
    years: "",
  });

  const handleUpdateProfileData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/auth/update_profile_data",
        section === "education"
          ? { education: formData }
          : { postWork: formData },
        { withCredentials: true },
      );
      console.log(res.data);
      setProfile(res.data.profile);
      setFormState({ open: false });
      toast.success("You updated successfully..");
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error.response?.data?.message);
    }
  };
  const handleEditeProfileData = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:8080/auth/edit_profile_data",
        formData,
        { withCredentials: true },
      );
      console.log(res.data);
      setProfile((prev) => ({
        ...prev,
        education: res.data.profile.education,
        postWork: res.data.profile.postWork,
      }));
      setFormState({ open: false });
      toast.success("You edit successfully..");
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error.response?.data?.message);
    }
  };
  useEffect(() => {
    if (mode === "edit" && selectedItem) {
      setFormData(selectedItem);
    } else {
      setFormData({
        school: "",
        degree: "",
        fieldOfStudy: "",
        company: "",
        positions: "",
        years: "",
      });
    }
  }, [mode, selectedItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mode === "edit" ? handleEditeProfileData() : handleUpdateProfileData();
  };
  return (
    <div className="overlay" onClick={() => setFormState({ open: false })}>
      <div className="inputs-section" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          {section === "education" ? (
            <>
              <input
                name="school"
                value={formData.school}
                onChange={handleChange}
                placeholder="School"
              />

              <input
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                placeholder="Degree"
              />

              <input
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                placeholder="Field"
              />
            </>
          ) : (
            <>
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company"
              />

              <input
                name="positions"
                value={formData.positions}
                onChange={handleChange}
                placeholder="Position"
              />
              <input
                name="years"
                value={formData.years}
                onChange={handleChange}
                placeholder="years"
              />
            </>
          )}
          {mode === "edit" ? <button>Edit</button> : <button>Add</button>}
        </form>
      </div>
    </div>
  );
}

export default Inputs;
