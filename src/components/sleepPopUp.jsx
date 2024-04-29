/* eslint-disable react/prop-types */

function SleepDataPopup({ sleepData, onClose }) {
  // Calculate total sleep hours
  const totalHours = sleepData.reduce((total, entry) => total + entry.userId, 0);
  // Calculate average sleep per day
  const averageHoursPerDay = totalHours / sleepData.length;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-btn" onClick={onClose}><h2>Sleep Data</h2></button>
        <div className="sleep-data">
          {sleepData.map((entry, index) => (
            <div key={index}>
              Day {index + 1}: {entry.userId} hours
            </div>
          ))}
        </div>
        <div className="average-sleep">
          Average Sleep Per Day: {averageHoursPerDay.toFixed(2)} hours
        </div>
      </div>
    </div>
  );
}

export default SleepDataPopup;

