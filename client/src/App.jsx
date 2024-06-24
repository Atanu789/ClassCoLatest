import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Teacher from './Teacher'

import Component from "./upload"
import Student from "./Student"
import NoteSection from './components/Notes';
import QuizSection from './components/QuizPage';
import Assignments from './StudentDashboard/Assignment';
import AssignmentUpload from './TeacherComponents/AssignmentUpload';
import Vocab from './components/VocabChallenge/Vocab';
import QuestionUpload from './TeacherComponents/UploadQuiz';
import QR from './TeacherComponents/QRCodeGenerator';
import Todo from './components/Todo/Todo';
import StartQuiz from './components/StartQuiz';
import QuizPage from './components/QuizPage';
import Fruit from './components/Memorygames/fruits';
import ManageStud from './TeacherComponents/Manage_Stud';
import Reward from './TeacherComponents/RewardSection/Reward'


import Login from './Login';
import Logout from './Logout';
import QuizPreview from './TeacherComponents/PreviewQuiz';



function App() {
 

  return (
    <Router>
      <Routes>
      <Route path="/Teach" element={<Teacher/>} />
      <Route path="/uploadAssign" element={<AssignmentUpload/>}/>
      <Route path="/Stud/:studentId/Voca" element={<Vocab/>}/>
      <Route path="/teachquiz" element={<QuestionUpload/>}/>
      <Route path="/previewquiz" element={<QuizPreview/>}/>
      <Route path="/rewards" element={<Reward/>}/>


    
        <Route path="/" element={<Login/>}/>
         <Route path="/sign-up" element={<Component/>}/>
       
        <Route path="/Stud/:studentId" element={<Student/>} />
        <Route path="/Stud/:studentId/notes" element={<NoteSection/>}/>
        <Route path="/Stud/:studentId/Startquiz" element={<StartQuiz/>}/>
        <Route path='/Stud/:studentId/quiz' element={<QuizPage/>}/>
       
        <Route path='/Stud/:studentId/assignment' element={<Assignments/>}/>
         <Route path='/Stud/:studentId/todo' element={<Todo/>}/>
        <Route path="/QRCodegenerator" element={<QR/>}/>
        <Route path='/Stud/:studentId/fruitGame' element={<Fruit/>}/>
        <Route path="/Manage" element={<ManageStud/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route/>
        </Routes>
     
      
    </Router>
  );
}

export default App;