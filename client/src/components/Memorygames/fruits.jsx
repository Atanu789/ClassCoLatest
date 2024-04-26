import React, { useEffect, useState } from 'react';
import fruitItems from '../../fruits.json';
import './fruits.css';
import Header from '../../StudentDashboard/Header';

function Card({ fruit, flipped, chooseCard }) {
  const cardClickHandle = () => {
    chooseCard(fruit);
  };

  return (
    <div className={`gamecard ${flipped ? 'matched' : ''}`} onClick={cardClickHandle}>
      <img style={{ transform: 'rotateY(180deg)' }} src={fruit.src} alt={fruit.name} />
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" />
        <line x1="12" y1="19" x2="12" y2="19.01" />
      </svg>
    </div>
  );
}

function Fruit() {
  const [fruits, setFruits] = useState([]);
  const [fruitOne, setFruitOne] = useState(null);
  const [fruitTwo, setFruitTwo] = useState(null);
  const [timer, setTimer] = useState(0);
  const [result, setResult] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const chooseCard = (fruit) => {
    fruitOne ? setFruitTwo(fruit) : setFruitOne(fruit);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (timer >= 0 && !result && !gameCompleted) {
        setTimer(timer + 1);
      } else if (timer === 0 && !result && !gameCompleted) {
        setResult(true);
      }
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timer, result, gameCompleted]);

  const initGame = () => {
    const allFruits = [...fruitItems, ...fruitItems]
      .sort(() => Math.random() - 0.5)
      .map((item) => ({ ...item, id: Math.random() }));
    setFruits(allFruits);
    setGameCompleted(false);
    setScore(0);
    setTimer(0);
  };

  const resetGame = () => {
    setFruits((prevFruits) =>
      prevFruits.map((item) => {
        if (item.matched) {
          return { ...item, matched: false };
        }
        return item;
      })
    );

    setFruitOne(null);
    setFruitTwo(null);

    setTimeout(() => {
      initGame();
    }, 500);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    if (fruitOne && fruitTwo) {
      if (fruitOne.src === fruitTwo.src) {
       
     
        const totalScore = score+1 ;

        setScore(totalScore);

        setFruits((prevFruits) =>
          prevFruits.map((item) => {
            if (item.src === fruitOne.src) {
              return { ...item, matched: true };
            } else {
              return item;
            }
          })
        );
      }

      setTimeout(() => {
        setFruitOne(null);
        setFruitTwo(null);

        const allMatched = fruits.every((fruit) => fruit.matched);
        if (allMatched) {
          setGameCompleted(true);
        }
      }, 500);
    }
  }, [fruitTwo, fruitOne, fruits, timer]);

  return (
    <>
      <Header />
      <h1 className="h1">Memory Game</h1>
      {fruits.length ? (
        <>
          <div className="timer">Time Elapsed: {formatTime(timer)}</div>
          <div className="score">Score: {score}</div>
          <hr />
          <button className="reset" onClick={resetGame}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1.002 7.935 1.007 9.425 4.747" />
              <path d="M20 4v5h-5" />
            </svg>
          </button>
          <div className="game-block">
            {fruits.map((fruit, key) => (
              <Card key={key} chooseCard={chooseCard} flipped={fruit === fruitOne || fruit === fruitTwo || fruit.matched} fruit={fruit} />
            ))}
          </div>
        </>
      ) : (
        <button className="start-game" onClick={initGame}>
          Start Game
        </button>
      )}
      {gameCompleted && (
        <div className="game-completed">
          <h2>Game Completed!</h2>
          <p>Final Time: {formatTime(timer)}</p>
          <p>Final Score: {score}</p>
        </div>
      )}
    </>
  );
}

export default Fruit;
