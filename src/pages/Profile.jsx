import { useState } from 'react';
import ProgressBar from '../components/progressBar'; // Adjust the path as per your project structure

function Profile() {
  const initialUserPersonalData = {
    name: 'Ben Dover',
    gender: 'Male',
    age: 30,
    birthday: "1/1/2007",
    email: 'ben.dover@gmail.com',
    phoneNumber: "38210381",
    location: 'Singapore',
    allergies: ['Pollen', 'Dust'],
    medications: ['Medication A', 'Medication B'],
  };

  const initialUserMetricsData = {
    heartRate: "78",
    restingHeartRate: "65",
    vo2Max: "40",
    steps: "10000",
    activity: "2"
  };

  const initialUserGoalsData = {
    height: 180,
    weight: {
      start: 75,
      end: 70,
      current: 73.8, // Assuming the current weight is 73 kg
      timePeriod: "3 months" // Assuming the time period for weight loss is 3 months
    },
    bodyFat: {
      start: 20,
      end: 15,
      current: 16.1, // Assuming the current body fat percentage is 18%
      timePeriod: "3 months" // Assuming the time period for reducing body fat is 3 months
    }
  };

  const [userPersonalData, setUserPersonalData] = useState(initialUserPersonalData);
  const [userMetricsData, setUserMetricsData] = useState(initialUserMetricsData);
  const [userGoalsData, setUserGoalsData] = useState(initialUserGoalsData);
  const [lastSavedPersonalData, setLastSavedPersonalData] = useState(initialUserPersonalData);
  const [lastSavedMetricsData, setLastSavedMetricsData] = useState(initialUserMetricsData);
  const [lastSavedGoalsData, setLastSavedGoalsData] = useState(initialUserGoalsData);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleConfirm = () => {
    setIsEditing(false);
    setLastSavedPersonalData(userPersonalData);
    setLastSavedMetricsData(userMetricsData);
    setLastSavedGoalsData(userGoalsData);
    // Perform actions to save edited data
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUserPersonalData(lastSavedPersonalData);
    setUserMetricsData(lastSavedMetricsData);
    setUserGoalsData(lastSavedGoalsData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (initialUserMetricsData.hasOwnProperty(name)) {
      setUserMetricsData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (initialUserGoalsData.hasOwnProperty(name)) {
      setUserGoalsData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setUserPersonalData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const insertSpaces = (label) => {
    return (
      label
        // Insert a space before each uppercase letter (except the first one)
        .replace(/(?<!^)([A-Z])/g, ' $1')
        // Convert the first character to uppercase without modifying other spaces
        .replace(/^([^\s])/, (match) => match.toUpperCase())
    ).trim(); // Trim any leading or trailing spaces
  };

  const formatList = (list) => {
    return list.join(', ');
  };

  // Function to calculate progress based on time period and starting/end/current values
  const calculateProgress = (start, end, current, timePeriod) => {
    // Assuming timePeriod is in months
    const startValue = parseFloat(start);
    const endValue = parseFloat(end);
    const currentValue = parseFloat(current);
    const time = parseFloat(timePeriod);
    const progress = ((startValue - currentValue) / (startValue - endValue)) * 100;
    return progress > 100 ? 100 : progress; // Limit progress to 100%
  };

  // Calculate progress for weight goal
  const weightProgress = calculateProgress(
    userGoalsData.weight.start,
    userGoalsData.weight.end,
    userGoalsData.weight.current,
    userGoalsData.weight.timePeriod
  );

  // Calculate progress for body fat goal
  const bodyFatProgress = calculateProgress(
    userGoalsData.bodyFat.start,
    userGoalsData.bodyFat.end,
    userGoalsData.bodyFat.current,
    userGoalsData.bodyFat.timePeriod
  );

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>User Profile</h2>
        <h4>Streak: 29</h4>
        {!isEditing ? (
          <button onClick={handleEdit}>Edit</button>
        ) : (
          <>
            <button onClick={handleConfirm}>Confirm</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        )}
      </div>
      <div className="profile-details">
        {/* Personal Information Section */}
        <div className="profile-section">
          <h3>Personal Information</h3>
          <div className="profile-fields">
            {Object.entries(userPersonalData).map(([key, value]) => (
              <div key={key} className="profile-field">
                <label htmlFor={key}>{insertSpaces(key)}: </label>
                {isEditing ? (
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleChange}
                  />
                ) : Array.isArray(value) ? (
                  <span>{formatList(value)}</span>
                ) : (
                  <span>{value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Metrics Section */}
        <div className="profile-section">
          <h3>Metrics</h3>
          <div className="profile-fields">
            {Object.entries(userMetricsData).map(([key, value]) => (
              <div key={key} className="profile-field">
                <label htmlFor={key}>{insertSpaces(key)}: </label>
                {isEditing ? (
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{value}</span>
                )}
                {/* Add units for relevant fields */}
                {key === 'heartRate' && <span> bpm</span>}
                {key === 'restingHeartRate' && <span> bpm</span>}
                {key === 'vo2Max' && <span> ml/kg/min</span>}
                {key === 'activity' && <span> hr</span>}
              </div>
            ))}
          </div>
        </div>
        
        {/* Goals Section */}
        <div className="profile-section">
          <h3>Goals</h3>
          <div className="profile-fields">
            {Object.entries(userGoalsData).map(([key, value]) => (
              <div key={key} className="profile-field">
                <label htmlFor={key}>{insertSpaces(key)}: </label>
                {isEditing ? (
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={typeof value === 'object' ? value.current : value}
                    onChange={handleChange}
                  />
                ) : (
                  <>
                    {typeof value === 'object' ? (
                      <>
                        <br></br>
                        <span>Current: {value.current}</span>
                        <br></br>
                        <span>{`Targets: ${value.start} to ${value.end}`}</span>                
                        <ProgressBar progress={key === 'weight' ? weightProgress : bodyFatProgress} />
                      </>
                    ) : (
                      <>
                        <span>{value}</span>
                        {/* Add units for relevant fields */}
                        {key === 'height' && <span> cm</span>}
                        {key === 'weight' && <span> kg</span>}
                        {key === 'bodyFat' && <span> %</span>}
                      </>
                    )}
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
      </div>
    </div>
  );
}

export default Profile;






