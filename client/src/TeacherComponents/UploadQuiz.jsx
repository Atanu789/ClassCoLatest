import { useState } from 'react';
import Header from './Header';
import Notification from './notificationSend';

const QuizUpload = () => {
    const [quiz, setQuiz] = useState({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: '',
    });

    const handleChange = (e) => {
        setQuiz({ ...quiz, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/v1/teachers/quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(quiz),
            });

            if (!response.ok) {
                throw new Error('Something went wrong with the request');
            }

            const result = await response.json();
            console.log(result);
            alert('Quiz question saved successfully!');

            setQuiz({
                question: '',
                option1: '',
                option2: '',
                option3: '',
                option4: '',
                answer: '',
            });
        } catch (error) {
            console.error('Failed to save the quiz question:', error);
            alert('Failed to save the quiz question.');
        }
    };

    return (
        <>
        <Header/>
        <div className="flex flex-col items-center justify-center mt-3" >
            <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 space-y-4 bg-[#096669] rounded shadow">
                <h2 className="text-xl font-bold">Upload Quiz Question</h2>
                <div>
                    <label className="block text-sm font-medium text-gray-100">Question</label>
                    <input
                        type="text"
                        name="question"
                        value={quiz.question}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                        placeholder="Quiz Question"
                        style={{ color: 'black' }}
                    />
                </div>
                {['option1', 'option2', 'option3', 'option4'].map((option, index) => (
                    <div key={option}>
                        <label className="block text-sm font-medium text-gray-100">{`Option ${index + 1}`}</label>
                        <input
                            type="text"
                            name={option}
                            value={quiz[option]}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                            placeholder={`Option ${index + 1}`}
                            style={{ color: 'black' }}
                        />
                    </div>
                ))}
                <div>
                    <label className="block text-sm font-medium text-gray-100">Answer</label>
                    <input
                        type="text"
                        name="answer"
                        value={quiz.answer}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                        placeholder="Answer"
                        style={{ color: 'black' }}
                    />
                </div>
                <button type="submit" className="px-4 py-2 font-bold text-green bg-blue-500 rounded hover:bg-green-700">
                    Submit
                </button>
                <Notification/>
            </form>
        </div>
        </>
    );
};

export default QuizUpload;
