import { useState, useEffect } from 'react';

export const useSleepScore = () => {
  const [sleepScore, setSleepScore] = useState(null);
  const [sleepData, setSleepData] = useState([]);

  useEffect(() => {
    const fetchSleepData = async () => {
      try {
        // Generate random sleep data (7 entries for 7 days)
        const newSleepData = Array.from({ length: 7 }, () => ({
          userId: Math.floor(Math.random() * 11), // Random value between 0 and 10
        }));
        // Calculate sleep score based on random sleep data
        const totalHours = newSleepData.reduce((total, entry) => total + entry.userId, 0);
        const averageHours = totalHours / newSleepData.length;
        let score = averageHours > 8 ? 100 : (averageHours / 8) * 100;
        score = score.toFixed(2);
        // Update state with sleep score and sleep data
        setSleepScore(score);
        setSleepData(newSleepData);
      } catch (error) {
        console.error('Error generating sleep data:', error.message);
      }
    };

    fetchSleepData();
  }, []);

  return { sleepScore, sleepData };
};


