import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from "react-router-dom";
import LogIn from "./components/LogIn";
import NavigationBar from "./components/NavigationBar";
import Courses from "./components/Course/Courses";
import CreateCourse from "./components/Course/CreateCourse";
import Welcome from "./components/Welcome";
import Semesters from "./components/Semester/Semesters";
import Classes from "./components/Class/Classes";
import Lecturers from "./components/Lecturer/Lecturers";
import Students from "./components/Student/Students";
import CourseDetail from "./components/Course/CourseDetail";
import SemesterDetail from "./components/Semester/SemesterDetail";
import UpdateCourse from "./components/Course/UpdateCourse";
import UpdateSemester from "./components/Semester/UpdateSemester";
import CreateSemester from "./components/Semester/CreateSemester";
import LecturerDetail from "./components/Lecturer/LecturerDetail";
import StudentDetail from "./components/Student/StudentDetail";
import UpdateLecturer from "./components/Lecturer/UpdateLecturer";
import UpdateStudent from "./components/Student/UpdateStudent";
import CreateStudent from "./components/Student/CreateStudent";
import CreateLecturer from "./components/Lecturer/CreateLecturer";
import CreateClass from "./components/Class/CreateClass";
import UpdateClass from "./components/Class/UpdateClass";
import ClassDetail from "./components/Class/ClassDetail";
import Lecturer from "./components/Lecturer";
import Student from "./components/Student";
import Administor from "./components/Administor";
import UploadExcel from "./UploadExcel";


function App() {
    return (
        <div className="App">
            <NavigationBar/>
            <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/Login" element={<LogIn/>}/>
                <Route path="/Lecturer" element={<Lecturer/>}/>
                <Route path="/Student" element={<Student/>}/>
                <Route path="/Administor" element={<Administor/>}/>
                <Route path="/Courses" element={<Courses/>}/>
                <Route path="/CreateCourse" element={<CreateCourse/>}/>
                <Route path="/CourseDetail" element={<CourseDetail/>}/>
                <Route path="/UpdateCourse" element={<UpdateCourse/>}/>
                <Route path="/Semesters" element={<Semesters/>}/>
                <Route path="/Semester" element={<Semesters/>}/>
                <Route path="/SemesterDetail" element={<SemesterDetail/>}/>
                <Route path="/CreateSemester" element={<CreateSemester/>}/>
                <Route path="/UpdateSemester" element={<UpdateSemester/>}/>
                <Route path="/Classes" element={<Classes/>}/>
                <Route path="/CreateClass" element={<CreateClass/>}/>
                <Route path="/UpdateClass" element={<UpdateClass/>}/>
                <Route path="/ClassDetail" element={<ClassDetail/>}/>
                <Route path="/Lecturers" element={<Lecturers/>}/>
                <Route path="/CreateLecturer" element={<CreateLecturer/>}/>
                <Route path="/UpdateLecturer" element={<UpdateLecturer/>}/>
                <Route path="/LecturerDetail" element={<LecturerDetail/>}/>
                <Route path="/Students" element={<Students/>}/>
                <Route path="/CreateStudent" element={<CreateStudent/>}/>
                <Route path="/UpdateStudent" element={<UpdateStudent/>}/>
                <Route path="/StudentDetail" element={<StudentDetail/>}/>
                <Route path="/UploadExcel" element={<UploadExcel/>}/>
            </Routes>
        </div>
    );
}

export default App;
