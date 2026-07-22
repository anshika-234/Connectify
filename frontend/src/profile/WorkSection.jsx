import "./EduWork.css";

function WorkSection({ postWork, onEdit, onAdd, updateProfile }) {
  return (
    <div className="edu-work-section">
      {postWork.length === 0 ? (
        <EmptyWorkSection onAdd={onAdd} />
      ) : (
        <div>
          {postWork.map((work) => (
            <div key={work._id} className="filled-section edu-work-items">
              <p className="item-one">{work.company}</p>
              <p className="item-two">{work.positions}</p>
              <p className="item-three">{work.years}</p>
              <div className="edit" onClick={() => onEdit(work)}>
                <i className="fa-solid fa-pen"></i>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const EmptyWorkSection = ({ onAdd }) => {
  return (
    <div className=" empty-section edu-work-items">
      <h4>Add your work experience to highlight your skills.</h4>
      <p className="empty-item-one">Company</p>
      <p className="empty-item-two">Position</p>
      <p className="empty-item-three">Years</p>
      <button className="add-button" onClick={onAdd}>
        Add Experience
      </button>
    </div>
  );
};
export default WorkSection;
