import Quiz from "./Quiz"
import "./QuizPage.css"
import Header from '../StudentDashboard/Header'
const QuizPage = () => {
  return (
    <>
    <Header/>
    <div className="quiz">
        <Quiz/>
    </div>
    </>
  )
}

export default QuizPage