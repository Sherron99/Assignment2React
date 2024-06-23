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

function App() {
    return (
        <div className="App">
            <NavigationBar/>
            <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/Login" element={<LogIn/>}/>
                <Route path="/Courses" element={<Courses/>}/>
                <Route path="/CreateCourse" element={<CreateCourse/>}/>
                <Route path="/Semester" element={<Semesters/>}/>
                <Route path="/Class" element={<Classes/>}/>
                <Route path="/Lecturer" element={<Lecturers/>}/>
                <Route path="/Student" element={<Students/>}/>
            </Routes>
        </div>
    );
}

export default App;
