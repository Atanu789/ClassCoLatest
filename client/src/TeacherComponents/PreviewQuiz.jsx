import React, { useEffect, useState } from 'react';

const QuizPreview = () => {
  const [quizzesGroupedByDate, setQuizzesGroupedByDate] = useState({});

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await fetch('http://localhost:8000/api/v1/teachers/previewQuiz');
      const data = await response.json();
      setQuizzesGroupedByDate(data.data);
    };

    fetchQuizzes();
  }, []);

  return (
    <div>
      {Object.keys(quizzesGroupedByDate).map((date) => (
        <div key={date}>
          <h2>Quizzes for {date}</h2>
          {quizzesGroupedByDate[date].map((quiz) => (
            <div key={quiz._id}>
              <h3>{quiz.question}</h3>
              <p>{quiz.option1}</p>
              <p>{quiz.option2}</p>
              <p>{quiz.option3}</p>
              <p>{quiz.option4}</p>
              <p>{quiz.answer}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default QuizPreview;
