import { useCallback, useEffect, useRef, useState } from "react";
import "./word.css";
import Board from "./Board";
import Keyboard from "./Keybord";
import Modal from "./Modal";
import { words } from "./words";

const ROWS = 6;

const merge = (letters, word) => {
  return Array.from(new Set(letters + word)).join("");
};

function Word() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(new Array(ROWS).fill(""));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [letters, setLetters] = useState("");
  const [gameStatus, setGameStatus] = useState("");

  const ref = useRef();

  const selectWord = () =>
    setSolution(words[Math.floor(Math.random() * words.length)]);

  useEffect(() => {
    selectWord();
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      const { key, keyCode } = e;
      if (keyCode === 8 && currentWord.length) {
        setCurrentWord((currentRow) => currentRow.slice(0, -1));
        return;
      }
      if (currentWord.length === 5) {
        if (keyCode !== 13) return;
        else {
          setGuesses((guesses) =>
            guesses.map((guess, idx) =>
              idx === currentRow ? currentWord : guess
            )
          );
          setCurrentRow((currentRow) => currentRow + 1);
          setLetters((letters) => merge(letters, currentWord));
          setCurrentWord("");
          return;
        }
      }

      if (keyCode >= 65 && keyCode <= 90) {
        setCurrentWord((currentRow) => currentRow + key.toUpperCase());
      }
    },
    [currentWord, currentRow]
  );
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (guesses[currentRow - 1] === solution && solution) {
      setGameStatus("You Won!");
      ref.current.openModal();
    } else if (currentRow > 5) {
      setGameStatus("You Lost!");
      ref.current.openModal();
    }
  }, [currentRow, guesses, solution]);

  const handleGameReset = () => {
    selectWord();
    setGuesses(new Array(ROWS).fill(""));
    setCurrentRow(0);
    setCurrentWord("");
    setLetters("");
    setGameStatus("");
  };

  return (
    <div className="Appp text-blue-700">
      <Board 
        guesses={guesses}
        currentWord={currentWord}
        currentRow={currentRow}
        solution={solution}
      />
      <Keyboard letters={letters} solution={solution} guesses={guesses} />
      <Modal
        gameStatus={gameStatus}
        ref={ref}
        solution={solution}
        handleGameReset={handleGameReset}
        
      />
    </div>
  );
}

export default Word;