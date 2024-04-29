import React, { useState, useEffect } from 'react';
import WorkoutHistory from '../components/workoutHistory';
import './Activity.css';

function WorkoutTracker() {
  const workoutTemplates = [
    { id: 1, name: 'Legs', exercises: ['Squats', 'Lunges', 'Deadlifts'], sets: 3, reps: 10, weight: 0 },
    { id: 2, name: 'Push', exercises: ['Bench Press', 'Overhead Press', 'Dips'], sets: 3, reps: 8, weight: 0 },
    { id: 3, name: 'Pull', exercises: ['Pull-ups', 'Rows', 'Bicep Curls'], sets: 3, reps: 8, weight: 0 }
  ];

  const initialWorkoutHistory = [
    {
      templateName: 'Legs',
      time: 1800, // 30 minutes
      exercises: {
        Squats: [{ weight: 50, reps: 10, time: 300 }, { weight: 60, reps: 10, time: 300 }, { weight: 70, reps: 10, time: 300 }],
        Lunges: [{ weight: 20, reps: 10, time: 300 }, { weight: 20, reps: 10, time: 300 }, { weight: 20, reps: 10, time: 300 }],
        Deadlifts: [{ weight: 80, reps: 10, time: 300 }, { weight: 90, reps: 10, time: 300 }, { weight: 100, reps: 10, time: 300 }]
      }
    },
    {
      templateName: 'Push',
      time: 1500, // 25 minutes
      exercises: {
        'Bench Press': [{ weight: 40, reps: 8, time: 300 }, { weight: 50, reps: 8, time: 300 }, { weight: 60, reps: 8, time: 300 }],
        'Overhead Press': [{ weight: 30, reps: 8, time: 300 }, { weight: 35, reps: 8, time: 300 }, { weight: 40, reps: 8, time: 300 }],
        Dips: [{ weight: 0, reps: 10, time: 300 }, { weight: 0, reps: 10, time: 300 }, { weight: 0, reps: 10, time: 300 }]
      }
    },
    {
      templateName: 'Pull',
      time: 1200, // 20 minutes
      exercises: {
        'Pull-ups': [{ weight: 0, reps: 10, time: 300 }, { weight: 0, reps: 10, time: 300 }, { weight: 0, reps: 10, time: 300 }],
        Rows: [{ weight: 20, reps: 8, time: 300 }, { weight: 25, reps: 8, time: 300 }, { weight: 30, reps: 8, time: 300 }],
        'Bicep Curls': [{ weight: 10, reps: 8, time: 300 }, { weight: 12, reps: 8, time: 300 }, { weight: 15, reps: 8, time: 300 }]
      }
    },
    {
      templateName: 'Chest & Triceps',
      time: 1800, // 30 minutes
      exercises: {
        'Dumbbell Chest Press': [{ weight: 20, reps: 10, time: 300 }, { weight: 25, reps: 10, time: 300 }, { weight: 30, reps: 10, time: 300 }],
        'Incline Bench Press': [{ weight: 30, reps: 8, time: 300 }, { weight: 35, reps: 8, time: 300 }, { weight: 40, reps: 8, time: 300 }],
        'Chest Flyes': [{ weight: 15, reps: 12, time: 300 }, { weight: 15, reps: 12, time: 300 }, { weight: 15, reps: 12, time: 300 }],
        'Tricep Dips': [{ weight: 0, reps: 10, time: 300 }, { weight: 0, reps: 10, time: 300 }, { weight: 0, reps: 10, time: 300 }],
        'Tricep Pushdowns': [{ weight: 20, reps: 12, time: 300 }, { weight: 25, reps: 12, time: 300 }, { weight: 30, reps: 12, time: 300 }]
      }
    }
  ];

  const [template, setTemplate] = useState('');
  const [workoutInProgress, setWorkoutInProgress] = useState(false);
  const [timer, setTimer] = useState(0);
  const [exerciseData, setExerciseData] = useState({});
  const [workoutHistory, setWorkoutHistory] = useState(initialWorkoutHistory);
  const [totalTime, setTotalTime] = useState(0);
  const [score, setScore] = useState(0);

  const calculateTotalTime = () => {
    let totalTimeInSeconds = 0;
    workoutHistory.forEach((workout) => {
      totalTimeInSeconds += workout.time;
    });
    const totalTimeInMinutes = Math.floor(totalTimeInSeconds / 60);
    setTotalTime(totalTimeInMinutes);
    calculateScore(totalTimeInMinutes);
  };

  useEffect(() => {
    calculateTotalTime();
  }, [workoutHistory]);

  useEffect(() => {
    localStorage.setItem('activityScore', score.toString());
  }, [score]);

  const calculateScore = (totalTimeInMinutes) => {
    const maxTime = 150; // Maximum workout time in minutes for full score
    const maxScore = 100; // Maximum score
    let score = (totalTimeInMinutes / maxTime) * maxScore;
    score = Math.min(maxScore, score);
    score = Math.max(0, score);
    setScore(score);
  };

  const saveWorkoutHistory = (history) => {
    localStorage.setItem('workoutHistory', JSON.stringify(history));
  };

  const startWorkout = () => {
    if (!template) {
      alert('Please select a template to start the workout.');
      return;
    }
    setWorkoutInProgress(true);
    setTimer(0);
    setExerciseData({});
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    return () => clearInterval(interval);
  };

  const addSet = (exercise) => {
    const newExerciseData = { ...exerciseData };
    if (!newExerciseData[exercise]) {
      newExerciseData[exercise] = [];
    }
    const newSet = { weight: 0, reps: 0, time: 0 };
    newExerciseData[exercise] = [...newExerciseData[exercise], newSet];
    setExerciseData(newExerciseData);
  };

  const finishWorkout = () => {
    setWorkoutInProgress(false);
    calculateTotalTime();
    const historyData = {
      templateName: template,
      time: timer,
      exercises: exerciseData,
    };
    const newWorkoutHistory = [...workoutHistory, historyData];
    setWorkoutHistory(newWorkoutHistory);
    saveWorkoutHistory(newWorkoutHistory);

    const exercisesFormatted = Object.keys(historyData.exercises).map((exerciseName) => {
      const exerciseSets = historyData.exercises[exerciseName].map((set, index) => {
        return `Set ${index + 1}: Weight ${set.weight}kg, Reps ${set.reps}`;
      }).join('\n');
      return `${exerciseName}:\n${exerciseSets}`;
    }).join('\n\n');

    alert(`Template: ${historyData.templateName}\nTime: ${historyData.time} seconds\nExercises:\n${exercisesFormatted}`);
  };

  const handleWeightChange = (exercise, setIndex, weight) => {
    const newExerciseData = { ...exerciseData };
    newExerciseData[exercise][setIndex].weight = weight;
    setExerciseData(newExerciseData);
  };

  const handleRepsChange = (exercise, setIndex, reps) => {
    const newExerciseData = { ...exerciseData };
    newExerciseData[exercise][setIndex].reps = reps;
    setExerciseData(newExerciseData);
  };

  const resetWorkoutHistory = () => {
    setWorkoutHistory([]);
    localStorage.removeItem('workoutHistory');
  };

  return (
    <div className="fitness-tracker-container">
      <h1>Workout Tracker</h1>
      <div className="template-list">
        <label htmlFor="template">Select Template:</label>
        <select id="template" value={template} onChange={(e) => setTemplate(e.target.value)}>
          <option value="">Select...</option>
          {workoutTemplates.map((template) => (
            <option key={template.id} value={template.name}>{template.name}</option>
          ))}
        </select>
      </div>
      <button onClick={startWorkout} disabled={workoutInProgress}>Start Workout</button>
      {workoutInProgress && (
        <div className="workout-in-progress">
          <h2>Workout in Progress</h2>
          <p>Time: {timer} seconds</p>
          <div className="exercises">
            {template && workoutTemplates.find((t) => t.name === template).exercises.map((exercise) => (
              <div key={exercise} className="exercise">
                <h3>{exercise}</h3>
                <button onClick={() => addSet(exercise)}>Add Set</button>
                <ol>
                  {exerciseData[exercise] && exerciseData[exercise].map((set, index) => (
                    <li key={index}>
                      <label>Set {index + 1}:</label>
                      <label>Weight (kg): </label>
                      <input
                        className="weight-input"
                        type="number"
                        value={set.weight}
                        onChange={(e) => handleWeightChange(exercise, index, e.target.value)}
                        placeholder="Weight (kg)"
                      />
                      <label>Reps: </label>
                      <input
                        className="reps-input"
                        type="number"
                        value={set.reps}
                        onChange={(e) => handleRepsChange(exercise, index, e.target.value)}
                        placeholder="Reps"
                      />
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <button onClick={finishWorkout}>Finish Workout</button>
        </div>
      )}
      <div className="workout-summary">
        <p>Total Workout Time: {totalTime} minutes</p>
        <p>Score: {score}/100</p>
        <button onClick={resetWorkoutHistory}>Reset History</button>
      </div>
      <WorkoutHistory history={workoutHistory} className='workout-history'/>
    </div>
  );
}

export default WorkoutTracker;
