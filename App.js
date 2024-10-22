import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CropPrediction from './components/CropPrediction';
import YieldPrediction from './components/YieldPrediction';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crop-prediction" element={<CropPrediction />} />
          <Route path="/yield-prediction" element={<YieldPrediction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
