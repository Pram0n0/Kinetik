import React from 'react';

function WorkoutHistory({ history }) {
  return (
    <div className="workout-history">
      <h2>Workout History</h2>
      <div className="history-list">
        {history.map((item, index) => (
          <div key={index} className="history-item">
            <h3>{item.templateName}</h3>
            <p>Time: {item.time} seconds</p>
            <ul>
              {Object.keys(item.exercises).map((exercise) => (
                <li key={exercise}>
                  <h4>{exercise}</h4>
                  <ol>
                    {item.exercises[exercise].map((set, setIndex) => (
                      <li key={setIndex}>
                        <label>Set {setIndex + 1}:</label>
                        <span>Weight: {set.weight}kg, Reps: {set.reps}</span>
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkoutHistory;

