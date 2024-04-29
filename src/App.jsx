import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IconButtons from "./components/navbuttons/iconNavigationButtons"
import Activity from "./pages/Activity";
import Collections from "./pages/Collections";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import FoodLog from "./pages/FoodLog";

function App() {
  return (
    <>
      <Router>
        <div className="App Pages">
          <Routes>
            <Route path="/Activity" element={<Activity />} />
            <Route path="/Collections" element={<Collections />} />
            <Route path="/" element={<Home />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Food-Log" element={<FoodLog />} />
          </Routes>
        </div>
        <IconButtons />
      </Router>
    </>
  );
}

export default App;

