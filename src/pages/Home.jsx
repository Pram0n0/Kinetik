import { useState, useEffect } from 'react';
import { useSleepScore } from '../components/sleepAPI';
import './Home.css';
import SleepDataPopup from '../components/sleepPopUp';
import EventPopup from '../components/eventPopUp';

function Home() {
  const { sleepScore, sleepData } = useSleepScore();
  const [showSleepPopup, setShowSleepPopup] = useState(false);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [nutritionScore, setNutritionScore] = useState(localStorage.getItem('nutritionScore'));
  const [activityScore, setActivityScore] = useState(localStorage.getItem('activityScore'));
  const [username, setUsername] = useState("Username Placeholder"); // User's name
  const [averageScore, setAverageScore] = useState(0); // Average score of sleep, nutrition, and activity
  const [leaderboard, setLeaderboard] = useState([
    { name: 'John', score: 85 },
    { name: 'Emma', score: 92 },
    { name: 'Michael', score: 78 },
    { name: 'Sophia', score: 70 },
    { name: 'William', score: 65 },
    { name: 'Olivia', score: 60 },
    { name: 'James', score: 55 },
    { name: 'Amelia', score: 50 },
    { name: 'Logan', score: 45 },
    { name: 'Charlotte', score: 40 }
  ]);

  useEffect(() => {
    // Calculate the average score when any of the scores change
    const average = Math.round(parseFloat(sleepScore)*0.3 + parseFloat(nutritionScore)*0.4 + parseFloat(activityScore)*0.3);
    setAverageScore(average);
  }, [sleepScore, nutritionScore, activityScore]);

  useEffect(() => {
    // Update the leaderboard when the average score changes
    updateLeaderboard();
  }, [averageScore]);

  const toggleSleepPopup = () => {
    setShowSleepPopup(!showSleepPopup);
  };

  const toggleEventPopup = (event) => {
    setSelectedEvent(event); // Set the selected event
    setShowEventPopup(!showEventPopup);
  };

  const updateLeaderboard = () => {
    // Create a copy of the leaderboard
    const updatedLeaderboard = [...leaderboard];
    // Find the user's index in the leaderboard
    const userIndex = updatedLeaderboard.findIndex((entry) => entry.name === username);
    if (userIndex !== -1) {
      // Update the user's score with the average score
      updatedLeaderboard[userIndex].score = averageScore;
    } else {
      // Add the user to the leaderboard
      updatedLeaderboard.push({ name: username, score: averageScore });
    }
    // Sort the leaderboard based on scores in descending order
    updatedLeaderboard.sort((a, b) => b.score - a.score);
    // Update the state with the new leaderboard
    setLeaderboard(updatedLeaderboard);
  };

  return (
    <div className="home-container">
      <div className="title">
        Home Page
      </div>
      <div className="ai-avatar">
        AI AVATAR
      </div>
      <div className="metrics">
        <div className="metric sleep" onClick={toggleSleepPopup}>
          Sleep Score: {sleepScore !== null ? sleepScore : 'Calculating...'}
        </div>
        <div className="metric nutrition">Nutrition Score: {nutritionScore}</div>
        <div className="metric activity">Activity Score: {activityScore}</div>
      </div>
      <div className="metric average">Average Score: {averageScore}</div>
      <div className="leaderboard">
        <p className='leaderboard-title'>Bronze League:</p>
        <ol>
          {leaderboard.map((entry, index) => (
            <li key={index}>
              <p>Rank: {index+1}</p>
              <p>{entry.name}</p>
              <p>{entry.score}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="upcoming-events">
        <p className='upcoming-events-title'>Upcoming Events:</p>
        <ul>
          <li onClick={() => toggleEventPopup('Event 1')}>Event 1</li>
          <li onClick={() => toggleEventPopup('Event 2')}>Event 2</li>
          <li onClick={() => toggleEventPopup('Event 3')}>Event 3</li>
          <li onClick={() => toggleEventPopup('Event 4')}>Event 4</li>
          <li onClick={() => toggleEventPopup('Event 5')}>Event 5</li>
        </ul>
      </div>
      {showSleepPopup && <SleepDataPopup sleepData={sleepData} onClose={toggleSleepPopup} />}
      {showEventPopup && <EventPopup title={`${selectedEvent} Details`} onClose={toggleEventPopup} />}
    </div>
  );
}

export default Home;





