import React, { useState, useEffect } from "react";
import "./App.css";

// API for fetching random words
const fetchWord = async (level) => {
  const length = Math.min(4 + level, 12); // Word length increases with levels
  const res = await fetch(`https://random-word-api.herokuapp.com/word?length=${length}`);
  const data = await res.json();
  return data[0].toUpperCase(); // Convert to uppercase
};

const HangmanGame = () => {
  const [level, setLevel] = useState(1);
  const [word, setWord] = useState("");
  const [wordDisplay, setWordDisplay] = useState([]);
  const [attemptsLeft, setAttemptsLeft] = useState(6);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const hangmanStages = [
    "____\n |  |\n |   \n |   \n_|_",
    "____\n |  |\n |  O\n |   \n_|_",
    "____\n |  |\n |  O\n |  |\n_|_",
    "____\n |  |\n |  O\n | /|\n_|_",
    "____\n |  |\n |  O\n | /|\\\n_|_",
    "____\n |  |\n |  O\n | /|\\\n_|_\n /",
    "____\n |  |\n |  O\n | /|\\\n_|_\n / \\",
  ];

  // Fetch a new word when the game starts or level increases
  useEffect(() => {
    const loadWord = async () => {
      const newWord = await fetchWord(level);
      setWord(newWord);
      setWordDisplay(Array(newWord.length).fill("_"));
      setGuessedLetters([]);
      setGameOver(false);
    };
    loadWord();
  }, [level]);

  // Handle letter guesses
  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter) || attemptsLeft === 0 || gameOver) return;

    setGuessedLetters([...guessedLetters, letter]);

    if (word.includes(letter)) {
      const updatedWordDisplay = word.split("").map((char) =>
        guessedLetters.includes(char) || char === letter ? char : "_"
      );
      setWordDisplay(updatedWordDisplay);

      if (!updatedWordDisplay.includes("_")) {
        setTimeout(() => nextLevel(), 500);
      }
    } else {
      setAttemptsLeft(attemptsLeft - 1);
      if (attemptsLeft - 1 === 0) {
        setGameOver(true);
      }
    }
  };

  // Move to the next level
  const nextLevel = () => {
    setLevel(level + 1);
  };

  // Restart the game
  const restartGame = () => {
    setLevel(1);
    setAttemptsLeft(6);
    setGuessedLetters([]);
    setGameOver(false);
    const resetWord = async () => {
      const newWord = await fetchWord(1);
      setWord(newWord);
      setWordDisplay(Array(newWord.length).fill("_"));
    };
    resetWord();
  };

  return (
    <div className="container">
      <h1>Hangman Game - Level {level}</h1>
      <pre className="hangman">{hangmanStages[6 - attemptsLeft]}</pre>
      <h2 className="word">{wordDisplay.join(" ")}</h2>

      {!gameOver ? (
        <div className="buttons">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={guessedLetters.includes(letter) || attemptsLeft === 0}
              className="letter-button"
            >
              {letter}
            </button>
          ))}
        </div>
      ) : (
        <h2 color="red">💀 Game Over! You reached Level {level}. </h2>
      )}

      <p>Attempts Left: {attemptsLeft}</p>

      {/* Restart Button */}
      <button className="restart-button" onClick={restartGame}>
        🔄 Restart Game
      </button>
    </div>
  );
};

export default HangmanGame;
