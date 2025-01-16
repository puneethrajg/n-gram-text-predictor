# N-gram Text Predictor

Welcome to the **N-gram Text Predictor** project! This project is a full-stack application that predicts the next word in a sequence of text using N-gram models. It consists of a **React Native** frontend for mobile devices and a **Flask** backend for handling the N-gram model and predictions.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The N-gram Text Predictor is a probabilistic model that uses N-grams (sequences of N words) to predict the next word in a sentence. This project demonstrates how to build a full-stack application with a **React Native** frontend and a **Flask** backend to provide a seamless text prediction experience.

## Features

- **N-gram Model**: Supports unigram, bigram, trigram, and higher-order N-gram models.
- **Text Prediction**: Predicts the next word based on the input sequence.
- **Mobile-Friendly**: Built with React Native for cross-platform mobile compatibility.
- **REST API**: Flask backend exposes a REST API for text prediction.
- **Customizable**: Allows you to specify the value of N for the N-gram model.
- **Training on Custom Data**: Train the model on any text corpus of your choice.

## Tech Stack

- **Frontend**: React Native (JavaScript/TypeScript)
- **Backend**: Flask (Python)
- **N-gram Model**: Built using Python's `nltk` or custom implementation
- **API Communication**: REST API with JSON payloads

## Installation

To set up the project locally, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/n-gram-text-predictor.git
cd n-gram-text-predictor
```

### 2. Set Up the Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the Flask server:
   ```bash
   python app.py
   ```
   The backend will start at `http://127.0.0.1:5000`.

### 3. Set Up the Frontend
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install Node.js dependencies:
   ```bash
   npm install
   ```
3. Start the React Native development server:
   ```bash
   npm start
   ```
   
## Usage

### Backend (Flask)
The Flask backend provides a REST API for text prediction. The API endpoint is:
- **POST `/predict`**: Predicts the next word based on the input text.
  - Request Body:
    ```json
    {
      "input_text": "Your input text here"
      
    }
    ```
  - Response:
    ```json
    {
      "prediction": "predicted_word"
    }
    ```

### Frontend (React Native)
The React Native app allows users to input text and receive predictions in real time. Simply type a sentence, and the app will display the predicted next word.

### Example
1. Open the React Native app.
2. Type a sentence, e.g., "Sun rises in the".
3. The app will display the predicted next word, e.g., "morning".

## How It Works

1. **N-gram Extraction**: The text corpus is split into N-grams of the specified length.
2. **Probability Calculation**: The probability of each N-gram is calculated based on its frequency in the corpus.
3. **Prediction**: Given an input sequence, the model predicts the next word by selecting the most probable N-gram that matches the input.
4. **API Communication**: The React Native frontend sends the input text to the Flask backend, which processes the request and returns the prediction.

### Smoothing
To handle cases where an N-gram is not present in the training data, basic smoothing techniques (e.g., Laplace smoothing) are applied.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
