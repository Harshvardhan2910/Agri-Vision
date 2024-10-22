import React, { useState } from 'react';
import './YieldPrediction.css';

const YieldPrediction = () => {
  const [formData, setFormData] = useState({
    crop: '',
    crop_year: '',
    season: '',
    state: '',
    area: '',
    production: '',
    rainfall: '',
    fertilizer: '',
    pesticide: '',
  });

  const [predictedYield, setPredictedYield] = useState(null);
  const [error, setError] = useState(''); // State for error message

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(''); // Reset error message on input change
  };

  // Validate inputs
  const validateInputs = () => {
    const { crop_year, area, production, rainfall, fertilizer, pesticide } = formData;

    if (crop_year < 1900 || crop_year > new Date().getFullYear()) {
      return "Crop year must be between 1900 and the current year.";
    }
    if (area <= 0) {
      return "Area must be greater than 0.";
    }
    if (production < 0) {
      return "Production cannot be negative.";
    }
    if (rainfall < 0) {
      return "Rainfall cannot be negative.";
    }
    if (fertilizer < 0) {
      return "Fertilizer cannot be negative.";
    }
    if (pesticide < 0) {
      return "Pesticide cannot be negative.";
    }
    return null; // Return null if all inputs are valid
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError); // Set error message if validation fails
      return; // Stop form submission
    }

    try {
      const response = await fetch('http://localhost:5000/predict/yield', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Check for successful response
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
  
      const data = await response.json();
      setPredictedYield(data.prediction); // Update the predicted yield
    } catch (error) {
      console.error('Error:', error);
      setPredictedYield('Error predicting yield. Please try again.'); // Set error message
    }
  };

  return (
    <div className='yield-body'>
      <h1>Yield Prediction:</h1>
      <form onSubmit={handleSubmit}>
        <label>Crop Name:</label>
        <input type="text" name="crop" placeholder="Enter Crop Name" onChange={handleChange} />

        <label>Crop Year:</label>
        <input type="number" name="crop_year" placeholder="Enter Crop Year" onChange={handleChange} />

        <label>Season:</label>
        <input type="text" name="season" placeholder="Enter Season (e.g., Kharif, Rabi, Summer,Whole Year)" onChange={handleChange} />

        <label>State:</label>
        <input type="text" name="state" placeholder="Enter State" onChange={handleChange} />

        <label>Area (in hectares):</label>
        <input type="number" name="area" placeholder="Enter Area in hectares" onChange={handleChange} />

        <label>Production (in tonnes):</label>
        <input type="number" name="production" placeholder="Enter Production in metric tons" onChange={handleChange} />

        <label>Annual Rainfall (in mm):</label>
        <input type="number" name="rainfall" placeholder="Enter Rainfall in mm" onChange={handleChange} />

        <label>Fertilizer Used (in kg):</label>
        <input type="number" name="fertilizer" placeholder="Enter Fertilizer Used in kgs" onChange={handleChange} />

        <label>Pesticide Used (in kg):</label>
        <input type="number" name="pesticide" placeholder="Enter Pesticide Used in kgs" onChange={handleChange} />

        <button type="submit">Predict Yield</button>
      </form>
      {error && <div className='error-message'>{error}</div>} {/* Display error message */}

      <div className="yield-result">
        <h1 className='heading-result'>Predicted Yield in MT/ha:</h1>
        {predictedYield !== null && (
          <h2>{predictedYield}</h2>
        )}
      </div>
    </div>
  );
};

export default YieldPrediction;
