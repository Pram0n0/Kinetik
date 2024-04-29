import React, { useEffect, useState } from 'react';
import './FoodLog.css'

function FoodLog() {
  // Function to initialize state from local storage or use default values
  const initializeStateFromLocalStorage = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  };

  const [foodList, setFoodList] = useState(initializeStateFromLocalStorage('foodList', []));
  const [targetCalories, setTargetCalories] = useState(initializeStateFromLocalStorage('targetCalories', 2000));
  const [targetProtein, setTargetProtein] = useState(initializeStateFromLocalStorage('targetProtein', 50));
  const [targetCarbs, setTargetCarbs] = useState(initializeStateFromLocalStorage('targetCarbs', 200));
  const [targetSugar, setTargetSugar] = useState(initializeStateFromLocalStorage('targetSugar', 50));
  const [targetFat, setTargetFat] = useState(initializeStateFromLocalStorage('targetFat', 70));
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [sugar, setSugar] = useState(0);
  const [fat, setFat] = useState(0);
  const [nutritionScore, setNutritionScore] = useState(0);

  // Function to update local storage when state changes
  useEffect(() => {
    localStorage.setItem('foodList', JSON.stringify(foodList));
    localStorage.setItem('targetCalories', targetCalories.toString());
    localStorage.setItem('targetProtein', targetProtein.toString());
    localStorage.setItem('targetCarbs', targetCarbs.toString());
    localStorage.setItem('targetSugar', targetSugar.toString());
    localStorage.setItem('targetFat', targetFat.toString());
    localStorage.setItem('nutritionScore', nutritionScore.toString()); // Save nutrition score to local storage
  }, [foodList, targetCalories, targetProtein, targetCarbs, targetSugar, targetFat, nutritionScore]);

  useEffect(() => {
    let initialCalories = 0;
    let initialProtein = 0;
    let initialCarbs = 0;
    let initialSugar = 0;
    let initialFat = 0;
  
    foodList.forEach(food => {
      initialCalories += food.calories;
      initialProtein += food.protein;
      initialCarbs += food.carbs;
      initialSugar += food.sugar;
      initialFat += food.fat;
    });
  
    setCalories(initialCalories);
    setProtein(initialProtein);
    setCarbs(initialCarbs);
    setSugar(initialSugar);
    setFat(initialFat);
  }, [foodList]);

  useEffect(() => {
    // Calculate and set the nutrition score
    const score = calculateNutritionScore();
    setNutritionScore(score);
  }, [calories, protein, carbs, sugar, fat]);

  // Function to handle adding food
  const handleAddFood = () => {
    const foodName = document.getElementById('foodName').value;
    const caloriesValue = parseInt(document.getElementById('calories').value);
    const proteinValue = parseInt(document.getElementById('protein').value) || 0;
    const carbsValue = parseInt(document.getElementById('carbs').value) || 0;
    const sugarValue = parseInt(document.getElementById('sugar').value) || 0;
    const fatValue = parseInt(document.getElementById('fat').value) || 0;
  
    if (!caloriesValue || caloriesValue === 0) {
      alert('Please enter a valid calorie value.');
      return;
    }
  
    const foodItem = {
      name: foodName,
      calories: caloriesValue,
      protein: proteinValue,
      carbs: carbsValue,
      sugar: sugarValue,
      fat: fatValue
    };
  
    // Update foodList state
    setFoodList(prevFoodList => [...prevFoodList, foodItem]);
  };  

  // Function to handle changing target values
  const handleChangeTarget = (e, targetSetter) => {
    targetSetter(parseInt(e.target.value));
  };

  // Function to calculate the nutrition score
  const calculateScore = (value, idealValue) => {
    // Calculate the distance away from the ideal value using a non-linear function
    const distance = Math.sqrt(Math.pow(value - idealValue, 2));
    // Calculate the maximum distance for normalization
    const maxDistance = Math.max(idealValue, value - idealValue);
    // Linearly decrease the score as the distance increases, using a max of 0.5
    return 1 - Math.min(distance / maxDistance, 1);
  };
  
  // Function to calculate the total nutrition score
  const calculateNutritionScore = () => {
    // Ideal values for each metric
    const idealCalories = targetCalories;
    const idealProtein = targetProtein;
    const idealCarbs = targetCarbs;
    const idealSugar = targetSugar;
    const idealFat = targetFat;
  
    // Calculate individual scores for each metric
    const scoreCalories = calculateScore(calories, idealCalories);
    const scoreProtein = calculateScore(protein, idealProtein);
    const scoreCarbs = calculateScore(carbs, idealCarbs);
    const scoreSugar = calculateScore(sugar, idealSugar);
    const scoreFat = calculateScore(fat, idealFat);
  
    // Apply weights and sum up the scores
    const totalScore =
      0.4 * scoreCalories +
      0.3 * scoreProtein +
      0.1 * scoreCarbs +
      0.1 * scoreSugar +
      0.1 * scoreFat;
  
    // Scale the total score to be out of 100
    return Math.round(totalScore * 100);
  };

  // Function to reset all state variables and clear localStorage
  const handleReset = () => {
    setFoodList([]);
    setTargetCalories(2000);
    setTargetProtein(50);
    setTargetCarbs(200);
    setTargetSugar(50);
    setTargetFat(70);
    setCalories(0);
    setProtein(0);
    setCarbs(0);
    setSugar(0);
    setFat(0);
    setNutritionScore(0);
    localStorage.clear();
  };

  return (
    <div className="food-log-container">
      <div className="food-score">{nutritionScore}</div>
      <div className="stats">
        <div>Current Calories: {calories}</div>
        <div>Target Calories: {targetCalories}</div>
        <div>Protein: {protein}g / {targetProtein}g</div>
        <div>Carbs: {carbs}g / {targetCarbs}g</div>
        <div>Sugar: {sugar}g / {targetSugar}g</div>
        <div>Fat: {fat}g / {targetFat}g</div>
      </div>
      <div className="food-list">
        <h3>Food Eaten Today:</h3>
        <ul>
          {foodList.map((food, index) => (
            <li key={index}>{food.name} - {food.calories} calories</li>
          ))}
        </ul>
      </div>
      <div className="add-food">
        <h3>Add Food Item:</h3>
        <input type="text" placeholder="Food Name" id="foodName" />
        <input type="number" placeholder="Calories" id="calories" />
        <input type="number" placeholder="Protein (g)" id="protein" />
        <input type="number" placeholder="Carbs (g)" id="carbs" />
        <input type="number" placeholder="Sugar (g)" id="sugar" />
        <input type="number" placeholder="Fat (g)" id="fat" />
        <button onClick={handleAddFood}>Add Food</button>
      </div>
      <div className="settings">
        <h3>Settings:</h3>
        <label htmlFor="targetCalories">Target Calories:</label>
        <input type="number" id="targetCalories" value={targetCalories} onChange={(e) => handleChangeTarget(e, setTargetCalories)} />
        <label htmlFor="targetProtein">Target Protein (g):</label>
        <input type="number" id="targetProtein" value={targetProtein} onChange={(e) => handleChangeTarget(e, setTargetProtein)} />
        <label htmlFor="targetCarbs">Target Carbs (g):</label>
        <input type="number" id="targetCarbs" value={targetCarbs} onChange={(e) => handleChangeTarget(e, setTargetCarbs)} />
        <label htmlFor="targetSugar">Target Sugar (g):</label>
        <input type="number" id="targetSugar" value={targetSugar} onChange={(e) => handleChangeTarget(e, setTargetSugar)} />
        <label htmlFor="targetFat">Target Fat (g):</label>
        <input type="number" id="targetFat" value={targetFat} onChange={(e) => handleChangeTarget(e, setTargetFat)} />
      </div>
      <button onClick={handleReset}>Reset</button> {/* Add reset button */}
    </div>
  );
}

export default FoodLog;
