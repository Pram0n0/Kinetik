import { Link } from 'react-router-dom';
import "../navbuttons/iconNavigationButtons.css"
import activityIcon from './svgs/strong.png';
import homeIcon from './svgs/home.png';
import collectionsIcon from './svgs/category.png';
import profileIcon from './svgs/profile.png';
import foodIcon from './svgs/food.png';

function IconNavigationButtons() {
  return (
    <div className="buttons-container">
      <div className="button-container">
        <Link to="/activity">
          <img src={activityIcon} alt="Activity" /> 
        </Link>
        <Link to="/collections">
          <img src={collectionsIcon} alt="Collections" />
        </Link>
        <Link to="/">
          <img src={homeIcon} alt="Home" />
        </Link>
        <Link to="/profile">
          <img src={profileIcon} alt="Profile" />
        </Link>
        <Link to="/food-log">
          <img src={foodIcon} alt="Food Icon" />
        </Link>
      </div>  
    </div>
  );
}

export default IconNavigationButtons;
