import React from 'react'
import Login from './Login'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from './Signup'
import Home from './Home'
import Student_info from './Student_info'
import Semester_info from './Semester_info'
import Marks_info from './Marks_info'
import Grades_info from './Grades_info'
import Behaviour_info from './Behaviour_info'
import Update_info from './Update_info'
import Update_grades from './Update_grades'
import Analysis from './Analysis.js'
import Transcript from './Transcript.js'
import FinalPrediction from './FinalPrediction.js'
import BehaviourAnalysis from './BehaviourAnalysis'
import UpdateMarks from './UpdateMarks'
import Delete_grade from './Delete_grade'
import Delete_marks from './Delete_marks'
import Delete_login from './Delete_login'
import Delete_student from './Delete_student'


function App() {
  return (
    <Router>
    <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup1' element={<Signup />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/student_info' element={<Student_info />}></Route>
        <Route path='/semester_info' element={<Semester_info />}></Route>
        <Route path='/marks_info' element={<Marks_info />}></Route>
        <Route path='/grades_info' element={<Grades_info />}></Route>
        <Route path='/behaviour_info' element={<Behaviour_info />}></Route>
        <Route path='/update_info' element={<Update_info />}></Route>
        <Route path='/update_grades' element={<Update_grades />}></Route>
        <Route path='/Analysis' element={<Analysis />}></Route>
        <Route path='/transcript' element={<Transcript />}></Route>
        <Route path='/finalprediction' element={<FinalPrediction />}></Route>
        <Route path='/behaviouranalysis' element={<BehaviourAnalysis />}></Route>
        <Route path='/updatemarks' element={<UpdateMarks />}></Route>
        <Route path='/delete_grade' element={<Delete_grade />}></Route>
        <Route path='/delete_marks' element={<Delete_marks />}></Route>
        <Route path='/delete_login' element={<Delete_login />}></Route>
        <Route path='/delete_student' element={<Delete_student />}></Route>
    </Routes>
    </Router>
  )
}
export default App