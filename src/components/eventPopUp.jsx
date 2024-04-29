/* eslint-disable react/prop-types */
function EventPopup({ title, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-btn" onClick={onClose}><h2>{title}</h2></button>
        <p>Placeholder content for event details...</p>
      </div>
    </div>
  );
}

export default EventPopup;
