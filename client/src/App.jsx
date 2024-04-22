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

import Login2 from './Login2';



function App() {
 

  return (
    <Router>
      <Routes>
      <Route path="/Teach" element={<Teacher/>} />
      <Route path="/uploadAssign" element={<AssignmentUpload/>}/>
      <Route path="/Voca" element={<Vocab/>}/>
      <Route path="/teachquiz" element={<QuestionUpload/>}/>
<Route path="/login" element={<Login2/>}/>

    
        <Route path="/" element={<Component/>}/>
       
        <Route path="/Stud/${id}" element={<Student/>} />
        <Route path="/notes" element={<NoteSection/>}/>
        <Route path="/Startquiz" element={<StartQuiz/>}/>
        <Route path='/quiz' element={<QuizPage/>}/>
       
        <Route path='/assignment' element={<Assignments/>}/>
         <Route path='/todo' element={<Todo/>}/>
        <Route path="/QRCodegenerator" element={<QR/>}/>
        <Route path='/fruitGame' element={<Fruit/>}/>
        <Route path="/Manage" element={<ManageStud/>}/>
        <Route/>
        </Routes>
     
      
    </Router>
  );
}

export default App;