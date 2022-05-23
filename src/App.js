import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Workout from './Pages/Workout';
import Food from './Pages/Food';
import Home from './Pages/Home';
import { useState } from 'react';

function App() {

  const initialText = 'Click';
  const changedText = 'Click 2';
  const [buttonText, setButtonText] = useState(initialText);

  function handleClick() {
    if (buttonText === initialText) {
      setButtonText(changedText);
    } else {
      setButtonText(initialText);
    }
  }

  return (
    <Router>
      <Routes>
        <Route exact path="/minMax" element={<Home />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/workout" element={<Workout />} />
        <Route exact path="/food" element={<Food />} />
      </Routes>

      <button style={{ height: '100px', width: '100px' }} onClick={handleClick}>
        {buttonText}
      </button>

    </Router>
  );
}

export default App;
