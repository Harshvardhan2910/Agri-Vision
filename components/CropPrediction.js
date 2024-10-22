import React, { useState } from 'react';
import './CropPrediction.css';
import axios from 'axios';

function CropPrediction() {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    pH: '',
    rainfall: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError(''); // Reset error message when input changes
  };

  const validateInputs = () => {
    const { nitrogen, phosphorus, potassium, temperature, humidity, pH, rainfall } = formData;
    
    if (pH < 0 || pH > 14) {
      return "pH must be between 0 and 14.";
    }
    if (nitrogen < 0) {
      return "Nitrogen cannot be negative.";
    }
    if (phosphorus < 0) {
      return "Phosphorus cannot be negative.";
    }
    if (potassium < 0) {
      return "Potassium cannot be negative.";
    }
    if (temperature < -10 || temperature > 50) {
      return "Temperature must be between -10°C and 50°C.";
    }
    if (humidity < 0 || humidity > 100) {
      return "Humidity must be between 0% and 100%.";
    }
    if (rainfall < 0) {
      return "Rainfall cannot be negative.";
    }
    return null; // Return null if all inputs are valid
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return; // Stop form submission if there are validation errors
    }

    try {
      // Send form data to Flask backend
      const response = await axios.post('http://localhost:5000/predict', formData);
      // Get the prediction from the response
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  };

  return (
    <div className='predict-body'>
      <h1>Crop Prediction:</h1>
      <form className='predict-form' onSubmit={handleSubmit}>
        
        <label>Nitrogen (N):</label>
        <input 
          type="number" 
          name="nitrogen"
          placeholder="Enter Nitrogen in mg/Kg" 
          value={formData.nitrogen}
          onChange={handleChange} 
          required 
        />

        <label>Phosphorus (P):</label>
        <input 
          type="number" 
          name="phosphorus"
          placeholder="Enter Phosphorus value in mg/Kg" 
          value={formData.phosphorus}
          onChange={handleChange} 
          required 
        />

        <label>Potassium (K):</label>
        <input 
          type="number" 
          name="potassium"
          placeholder="Enter Potassium value in mg/kg" 
          value={formData.potassium}
          onChange={handleChange} 
          required 
        />

        <label>Temperature:</label>
        <input 
          type="number" 
          name="temperature"
          placeholder="Enter Temperature in °C" 
          value={formData.temperature}
          onChange={handleChange} 
          required 
        />

        <label>Humidity:</label>
        <input 
          type="number" 
          name="humidity"
          placeholder="Enter Humidity percentage" 
          value={formData.humidity}
          onChange={handleChange} 
          required 
        />

        <label>pH:</label>
        <input 
          type="number" 
          name="pH"
          placeholder="Enter pH value" 
          value={formData.pH}
          onChange={handleChange} 
          required 
        />

        <label>Rainfall:</label>
        <input 
          type="number" 
          name="rainfall"
          placeholder="Enter Rainfall in mm"
          value={formData.rainfall}
          onChange={handleChange} 
          required 
        />

        <button type="submit">Predict Crop</button>
      </form>

      {error && <div className='error-message'>{error}</div>} {/* Display error message */}

      <div className='predict-result'>
        <h1 className='heading-result'>Predicted Crop:</h1>
        {prediction != null && <h2>{prediction}</h2>}
      </div>
    </div>
  );
};

export default CropPrediction;
