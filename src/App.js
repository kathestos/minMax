import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Workout from "./Pages/Workout";
import Food from "./Pages/Food";
import Home from "./Pages/Home";
import Workouts from "./Pages/Workouts";
import Configuration from "./Pages/Configuration";
import Foods from "./Pages/Foods";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ExercisesOverview from "./Pages/ExercisesOverview";
import Training from "./Pages/Training";
import "./Pages/Styles.css";

function App() {
  return (
    <Router basename="/minMax">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/workout" element={<Workout />} />
        <Route exact path="/food" element={<Food />} />
        <Route exact path="/workouts" element={<Workouts />} />
        <Route exact path="/config" element={<Configuration />} />
        <Route exact path="/foods" element={<Foods />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/exoverview" element={<ExercisesOverview />} />
        <Route exact path="/train" element={<Training />} />
      </Routes>
    </Router>
  );
}

export default App;
