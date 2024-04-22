import React, { useEffect, useState } from 'react';
import WordDescription from './WordDescription';
import Header from '../../StudentDashboard/Header'
import Word from './WordGame/WordGame';

function App() {
  const [wordData, setWordData] = useState([]);

  useEffect(() => {
    const checkTimeAndExecute = () => {
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const seconds = currentTime.getSeconds();

      if (hours === 0 && minutes === 6 && seconds === 58) {
        localStorage.clear();
      }
      if (hours === 0 && minutes === 7 && seconds === 0) {
        fetchRandomWord();
      }
    };

    // Call the function initially to set the word for the day
    checkTimeAndExecute();

    // Set interval to check every second
    const interval = setInterval(() => {
      checkTimeAndExecute();
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const storedWordData = localStorage.getItem('wordData');
    if (storedWordData) {
      setWordData(JSON.parse(storedWordData));
    } else {
      fetchRandomWord();
    }
  }, []);

  const fetchRandomWord = async () => {
    try {
      const lastFetchedTimestamp = localStorage.getItem('lastFetchedTimestamp');
      const currentTime = new Date().getTime();
      const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      if (!lastFetchedTimestamp || currentTime - lastFetchedTimestamp > twentyFourHours) {
        const response = await fetch('https://random-word-api.herokuapp.com/word?number=1');
        const data = await response.json();
        const word = data[0];

        fetchWordMeaning(word);
        localStorage.setItem('lastFetchedTimestamp', currentTime.toString());
      }
    } catch (error) {
      console.error('Error fetching random word:', error);
    }
  };

  const fetchWordMeaning = async (word) => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`);
      const data = await response.json();
      const meaning = data[0]?.meanings[0]?.definitions[0]?.definition;
      const partOfSpeech = data[0]?.meanings[0]?.partOfSpeech || "N/A"; // Default to "N/A" if partOfSpeech is not available
      if (meaning) {
        const newWordData = [{ word, meaning, partOfSpeech }, ...wordData];
        setWordData(newWordData);
        localStorage.setItem('wordData', JSON.stringify(newWordData));
      }
    } catch (error) {
      console.error('Error fetching word meaning:', error);
    }
  };

  return (
    <>
      <Header />
      <div>
        <h1 className='flex justify-center text-4xl font-bold p-5'>Vocab Challenge</h1>
        {wordData.map((item, index) => (
          <div key={index} className="word-description flex justify-center" style={{
            backgroundColor: '#064B4D',
            color: '#fff',
            padding: '40px',
            margin: '150px',
            borderRadius: '8px',
            boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 14px, rgba(0, 0, 0, 0.3) 0px 13px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
            transition: 'all 0.3s ease',
            width: '1200px',
          }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = 'rgba(0, 0, 0, 0.8) 0px 2px 20px, rgba(0, 0, 0, 0.6) 0px 15px 15px -7px, rgba(0, 0, 0, 0.4) 0px -3px 0px inset';
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = 'rgba(0, 0, 0, 0.4) 0px 2px 14px, rgba(0, 0, 0, 0.3) 0px 13px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset';
            }}>
            {index === 0 ? <WordDescription word={item.word} meaning={item.meaning} partOfSpeech={item.partOfSpeech} /> : null}
          </div>
        ))}
        <Word/>
      </div>
    </>
  );
}

export default App;
