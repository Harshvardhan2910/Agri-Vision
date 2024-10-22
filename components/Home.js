import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, BarChart3 } from 'lucide-react';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleCropPrediction = () => {
    navigate('/crop-prediction');
  };

  const handleYieldPrediction = () => {
    navigate('/yield-prediction');
  };

  return (
    <div className="app-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            
            AgriVision <br />Crop and Yield Prediction
          </h1>
          <p className="hero-description">
            Make data-driven decisions for your agricultural success using advanced prediction models.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="cards-grid">
          {/* Crop Prediction Card */}
          <div className="card">
            <div className="card-header green">
              <div className="header-content">
                <Leaf className="header-icon" />
                <h2 className="header-title">Crop Prediction</h2>
              </div>
            </div>
            <div className="card-content">
              <p className="card-description">
                Input your soil parameters and weather conditions to get intelligent crop recommendations.
              </p>
              <button className="button green" onClick={handleCropPrediction}>
                Start Prediction
              </button>
            </div>
          </div>

          {/* Yield Prediction Card */}
          <div className="card">
            <div className="card-header yellow">
              <div className="header-content">
                <BarChart3 className="header-icon" />
                <h2 className="header-title">Yield Prediction</h2>
              </div>
            </div>
            <div className="card-content">
              <p className="card-description">
                Estimate your crop yield based on historical data and current conditions.
              </p>
              <button className="button yellow" onClick={handleYieldPrediction}>
                Calculate Yield
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          {['Advanced ML Models', 'Real-time Analysis', 'Historical Data'].map((feature) => (
            <div key={feature} className="feature-card">
              <h3 className="feature-title">{feature}</h3>
              <p className="feature-description">
                Using cutting-edge technology to provide accurate predictions for your farming needs.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
