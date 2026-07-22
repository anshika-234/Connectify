import "./Eduwork.css";

function EducationSection({ education, onEdit, onAdd }) {
  return (
    <div className="edu-work-section">
      {education.length === 0 ? (
        <EmptyEducationSection onAdd={onAdd} />
      ) : (
        <div>
          {education.map((edu) => (
            <div key={edu._id} className="filled-section edu-work-items">
              <p className="item-one">{edu.school}</p>
              <p className="item-two">{edu.degree}</p>
              <p className="item-three">{edu.fieldOfStudy}</p>
              <div className="edit" onClick={() => onEdit(edu)}>
                <i className="fa-solid fa-pen"></i>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const EmptyEducationSection = ({ onAdd }) => {
  return (
    <div className=" empty-section edu-work-items">
      <h4>Add your education to let others know your background.</h4>
      <p className="empty-item-one">School</p>
      <p className="empty-item-two">Degree</p>
      <p className="empty-item-three">Field Of Study</p>
      <button className="add-button" onClick={onAdd}>
        Add Education
      </button>
    </div>
  );
};
export default EducationSection;
