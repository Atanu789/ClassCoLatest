import React, { useRef, useState, useEffect, createRef } from 'react';
import './Quiz.css';
import correctSound from "../assets/correct.mp3";
import wrongSound from "../assets/wrong.mp3";
import bgmSound from "../assets/bgm.mp3"; 
import Header from '../StudentDashboard/Header'
import { PieChart, Pie, Cell, Tooltip } from "recharts"; 

function Quiz() {

  const [quizData, setQuizData] = useState([]);
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(null);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [totalquestions, settotalQuestions] = useState([]);
  const [timer, setTimer] = useState(30); 

  const correctAudio = useRef(null);
  const wrongAudio = useRef(null);
  const bgmAudio = useRef(null); // Ref for the background sound
  const optionRefs = useRef([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/students/getQuiz')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setQuizData(data.data);
        } else {
          console.error('Error fetching quiz data:', data.message);
        }
      })
      .catch((error) => console.error('Error fetching quiz data:', error));
  }, []);
  
  const NumberOfquestions = quizData.length;

  const correctAnswers = correct;
  const incorrectAnswers = wrong;
  const  AttemptedQuestions = correctAnswers + incorrectAnswers;

  const pieChartData = [
    { name: 'Attempted', value: AttemptedQuestions },
    { name: "Total Number of Questions", value: NumberOfquestions },
    { name: "Correct Answers", value: correctAnswers },
    { name: "Incorrect Answers", value: incorrectAnswers},   
  ];

  // Calculate the percentage of correct answers
  const percent = ((correctAnswers / NumberOfquestions) * 100).toFixed(2) + "%";
  const percent_val = ((correctAnswers / NumberOfquestions) * 100).toFixed(2) ;

  // Determine the comment based on the percentage
  const comment =
    percent_val >= 90.00
      ? "Excellent: Congratulations! You've completed almost all of the quiz. Keep up the great work!"
      : percent_val >= 70.00
      ? "Good: You've done a solid job! Just a few more questions to go. Keep pushing!"
      : percent_val >= 50.00
      ? "Fair: You're making progress, but there's still room for improvement. Keep studying and give it another shot!"
      : percent_val >= 30.00
      ? "Needs Improvement: You're halfway there! Don't give up. Focus on areas where you struggled and try again."
      : "Poor: It seems like you've just started. Don't worry, everyone has to begin somewhere. Keep practicing and you'll get there!";

      // Save percentage in local storage
      useEffect(() => {
        localStorage.setItem('quizPercentage', percent_val);
      }, [percent_val]);


  useEffect(() => {
    bgmAudio.current.volume = 1; // Adjust the volume of the background sound if needed
    bgmAudio.current.loop = true; // Make the background sound loop continuously
    bgmAudio.current.play(); // Start playing the background sound
    return () => {
      bgmAudio.current.pause(); // Pause the background sound when the component unmounts
    };
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (timer > 0 && !result) {
        setTimer(timer - 1);
      } else if (timer === 0 && !result) {
        setResult(true);
      }
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timer, result]);

  useEffect(() => {
    if (quizData.length > 0) {
      setQuestion(quizData[index]);
      optionRefs.current = Array(4).fill().map((_, i) => optionRefs.current[i] || createRef());
    }
  }, [quizData, index]);

  const checkAnswer = (e, ans) => {
    settotalQuestions(index);
  
    if (!lock) {
     
      if (question.answer === ans.toString()) {
       
        e.target.classList.add('correct');
        setLock(true);
        setScore((prevScore) => prevScore + 2);
        correctAudio.current.play();
        setCorrect(correct + 1);
      } else {
        e.target.classList.add('incorrect');
        setLock(true);
        optionRefs.current[parseInt(question.answer) - 1].current.classList.add('correct');
        wrongAudio.current.play();
        setWrong(wrong + 1);
      }
    }
  };

  const nextQuestion = () => {
    if (lock && index < quizData.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
      setQuestion(quizData[index + 1]);
      setLock(false);
      optionRefs.current.forEach((option) => {
        option.current.classList.remove('incorrect');
        option.current.classList.remove('correct');
      });
    } else if (lock && index === quizData.length - 1) {
      setResult(true);
    }
  };

  const resetQuiz = () => {
    setIndex(0);
    setQuestion(quizData[0]);
    setLock(false);
    setScore(0);
    setResult(false);
    setTimer(10); 
    settotalQuestions(0);
    setWrong(0);
    setCorrect(0);
  };
 
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
    
    <div className="container w-[650px] mt-2">

      <h1>Attempt the Quiz</h1>
      <div className='timer'>Time Remaining: {formatTime(timer)}</div>
      <hr />
      {result ? (
        <>
       <h2>Analyse your Performance</h2>
       <h3>You scored {percent} out of {NumberOfquestions } Questions</h3>
      <p>{comment}</p>
      <PieChart width={300} height={300} style={{ margin: 'auto' }}>
 
 

  <Pie
    data={pieChartData}
    cx="50%"
    cy="50%"
    outerRadius={120}
    fill="#8884d8"
    dataKey="value"
    label
  >
    {pieChartData.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={`rgba(${index * 17}, ${index * 130}, ${index * 140}, 0.2)`} />
    ))}
  </Pie>
  <Tooltip contentStyle={{ color: '#ffffff' }} fill="white" /> {/* Use Tooltip instead of PieTooltip */}
</PieChart>

          <button onClick={resetQuiz}>Reset</button>
        </>
      ) : (
        <>
          {question && (
            <>
              <h2>{index + 1}.{question.question}</h2>
              
              <ul>
                {['option1', 'option2', 'option3', 'option4'].map((optionKey, i) => (
                  <li
                    key={i}
                    ref={optionRefs.current[i]}
                    onClick={(e) => checkAnswer(e, i + 1)}
                  >
                    {question[optionKey]}
                  </li>
                ))}
              </ul>
              <button onClick={nextQuestion}>Next</button>
              <div className='index'>{index + 1} of {quizData.length}</div>
            </>
          )}
          <audio ref={correctAudio} src={correctSound} />
          <audio ref={wrongAudio} src={wrongSound} />
          <audio ref={bgmAudio} src={bgmSound} autoPlay loop /> {/* Add background sound */}
        </>
      )}
    </div>
    </>
  );
}

export default Quiz;
