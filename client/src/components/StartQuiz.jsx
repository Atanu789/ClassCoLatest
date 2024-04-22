import React from 'react';
import Header from '../StudentDashboard/Header';

const StartQuiz = () => {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-4xl p-6 border border-gray-300 rounded-lg text-black" style={{ backgroundColor: '#0EB0AB' }}>

        <h1 className="text-3xl font-bold mb-6">Attempt the Quiz</h1>
        <hr />
        <div className="my-4">
          <h2 className="font-bold">Objective:</h2>
          <p>The purpose of this quiz is to test your knowledge.</p>
        </div>
        <div className="my-4">
          <h2 className="font-bold">Duration:</h2>
          <p>
            You will have a limited amount of time to complete the quiz. The timer will start as soon as you click the "Start" button.
          </p>
        </div>
        <div className="my-4">
          <h2 className="font-bold">Questions:</h2>
          <p>
            There will be a series of multiple-choice questions. Read each question carefully before selecting your answer.
          </p>
        </div>
        <div className="my-4">
          <h2 className="font-bold">Scoring:</h2>
          <p>
            Each correct answer earns you two points. There is no penalty for incorrect answers, so it's in your best interest to attempt all questions.
          </p>
        </div>
        <div className="my-4">
          <h2 className="font-bold">Navigation:</h2>
          <p>
            You can navigate between questions using the "Next" button. Make sure to review your answers before submitting.
          </p>
        </div>
        <div className="my-4">
          <h2 className="font-bold">Submission:</h2>
          <p>
            Once you've answered all questions, click the "Submit" button to finalize your responses. You cannot make any changes after submission.
          </p>
        </div>
        <div className="my-4">
          <h2 className="font-bold">Results:</h2>
          <p>
            After submitting, you will receive your score along with feedback on your performance.
          </p>
        </div>
        <div className="my-4">
          <h2 className="font-bold">Enjoy:</h2>
          <p>
            Most importantly, enjoy the quiz! It's a fun way to test your knowledge and learn something new.
          </p>
        </div>

        <div className="instructions my-4">
          <h2 className="font-bold">Instructions for Starting the Quiz:</h2>
          <ol className="list-decimal pl-6">
            <li>Click the "Start" button below to initiate the quiz and start the timer.</li>
            <li>Once started, you'll be presented with the first question. Read the question carefully and select your answer.</li>
            <li>Continue answering questions until you've completed the quiz.</li>
            <li>After answering all questions, click the "Submit" button to view your results.</li>
          </ol>
          <p className="my-4">Note: Ensure that you have a stable internet connection and are in a distraction-free environment before starting the quiz.</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a href="/quiz" className="start-button inline-block bg-green-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ fontSize: '1.5rem' }}>
            Start
          </a>
        </div>

      </div>
    </>
  );
}

export default StartQuiz;
