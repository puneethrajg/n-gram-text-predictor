import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [prediction, setPrediction] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState('dark');
  const [showAllHistory, setShowAllHistory] = useState(false); // New state for toggling history visibility

  const handlePredict = async () => {
    setError('');
    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        prefix: inputText,
      });
      setPrediction(response.data.next_word);
      setHistory([...history, { input: inputText, output: response.data.next_word }]);
    } catch (error) {
      setError('Failed to predict the next word. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setInputText('');
    setPrediction('');
    setError('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(prediction);
    alert('Copied to clipboard!');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    console.log("Current theme:", theme); // Debug statement
  };

  const toggleHistoryVisibility = () => {
    setShowAllHistory(!showAllHistory); // Toggle visibility of all history items
  };

  const charCount = inputText.length;
  const wordCount = inputText.split(/\s+/).filter(Boolean).length;

  // Slice history to show only the first 2 items by default
  const visibleHistory = showAllHistory ? history : history.slice(0, 2);

  return (
    <div className={`App ${theme}`}>
      <div className="container">
        <h1>N-Gram Text Predictor</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
        <div className="card">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type something to predict the next word..."
          />
          <div className="counter">
            <span>Characters: {charCount}</span>
            <span>Words: {wordCount}</span>
          </div>
          <div className="buttons">
            <button className="predict-button" onClick={handlePredict} disabled={isLoading}>
              {isLoading ? '🔮 Predicting...' : '🔮 Predict Next Word'}
            </button>
            <button className="reset-button" onClick={handleReset}>
              🔄 Reset
            </button>
          </div>
          {error && <p className="error">{error}</p>}
          {prediction && (
            <div className="prediction">
              <p>Predicted Next Word:</p>
              <strong>{prediction}</strong>
              <button className="copy-button" onClick={handleCopy}>
                📋 Copy
              </button>
            </div>
          )}
          {history.length > 0 && (
            <div className="history">
              <h2>History</h2>
              <ul>
                {visibleHistory.map((item, index) => (
                  <li key={index}>
                    <strong>Input:</strong> {item.input} <br />
                    <strong>Output:</strong> {item.output}
                  </li>
                ))}
              </ul>
              {history.length > 2 && (
                <button className="show-more-button" onClick={toggleHistoryVisibility}>
                  {showAllHistory ? 'Show Less' : 'Show More'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;