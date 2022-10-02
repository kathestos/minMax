import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Workout from "./Pages/Workout";
import Food from "./Pages/Food";
import Home from "./Pages/Home";
import Chest from "./Pages/Chest";
import Legs from "./Pages/Legs";
import Abs from "./Pages/Abs";
import Configuration from "./Pages/Configuration";
import "./Pages/Styles.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/minMax" element={<Home />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/workout" element={<Workout />} />
        <Route exact path="/food" element={<Food />} />
        <Route exact path="/chest" element={<Chest />} />
        <Route exact path="/legs" element={<Legs />} />
        <Route exact path="/abs" element={<Abs />} />
        <Route exact path="/config" element={<Configuration />} />
      </Routes>
    </Router>
  );
}

export default App;
