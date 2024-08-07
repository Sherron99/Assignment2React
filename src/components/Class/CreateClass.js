import React, {useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl} from "../Constants";
import {useNavigate} from "react-router-dom";

function CreateClass(props) {
    const [token] = useState(localStorage.getItem("token"));
    const [number, setNumber] = useState('');
    const [courses, setCourses] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [lecturers, setLecturers] = useState([]);
    const [students, setStudents] = useState([]);

    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedLecturer, setSelectedLecturer] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`${baseUrl}Ass2/courses/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then(response => {
            setCourses(response.data);
        });
        axios.get(`${baseUrl}Ass2/semesters/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then(response => {
            setSemesters(response.data);
        });
        axios.get(`${baseUrl}Ass2/lecturers/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then(response => {
            setLecturers(response.data);
        });
        axios.get(`${baseUrl}Ass2/students/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then(response => {
            setStudents(response.data);
        });
    }, [token]);

    function handleStudentChange(event) {
        const studentId = parseInt(event.target.value);
        if (event.target.checked) {
            setSelectedStudents([...selectedStudents, studentId]);
        } else {
            setSelectedStudents(selectedStudents.filter(id => id !== studentId));
        }
    }

    function numberValue(e) {
        setNumber(e.target.value);
    }

    //下面遇到了一个问题，就是如果用户什么都不做选择，直接用的是跳出来的默认值，就会显示那个地方的value是空。
    function createClass() {
        if (!selectedLecturer) {
            alert("Please assign a lecturer to the class");
            return;
        }
        if (!selectedSemester) {
            alert("Please assign a lecturer to the class");
            return;
        }
        if (!selectedCourse) {
            alert("Please assign a lecturer to the class");
            return;
        }
        const classData = {
            number: number,
            course: selectedCourse,
            semester: selectedSemester,
            lecturer: selectedLecturer,
            students: selectedStudents
        };

        axios.post(`${baseUrl}Ass2/classes/`, classData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        }).then(response => {
            alert("Class created successfully");
            navigate("/Classes");
            window.location.reload();
            console.log(response.data);
        }).catch(error => {
            console.error("Error creating class:", error.response?.data || error.message);
            alert("Failed to create class. Please check the console for details.");
        });
    }

    return (
        <div>
            <p>Create a Class</p>
            <p>Number: <input type="text" value={number} onChange={numberValue}/></p>
            <p>Course:
                {/*e在下面这行代码中，表示的是event。*/}
                <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                    <option value="">Please select a course</option>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                </select>
            </p>
            <p>Semester:
                <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
                    <option value="">Please select a semester</option>
                    {semesters.map((semester) => (
                        <option key={semester.id} value={semester.id}>{semester.year} {semester.semester}</option>
                    ))}
                </select>
            </p>
            <p>Lecturer:
                <select value={selectedLecturer} onChange={(e) => setSelectedLecturer(e.target.value)}>
                    <option value="">Please select a Lecturer</option>
                    {lecturers.map((lecturer) => (
                        <option key={lecturer.id} value={lecturer.id}>{lecturer.firstName} {lecturer.lastName}</option>
                    ))}
                </select>
            </p>
            <p>Students:</p>
            {students.map((student) => (
                <div key={student.id}>
                    <input
                        type="checkbox"
                        id={`${student.id}`}
                        value={student.id}
                        onChange={handleStudentChange}
                        checked={selectedStudents.includes(student.id)}//这里的checked适用于radio和checkbox，如果有包含那就说明被选中了
                    />
                    <label htmlFor={`student-${student.id}`}>{student.firstName} {student.lastName}</label>
                </div>
            ))}
            <button onClick={createClass} className={"btn btn-primary"}>Create</button>
        </div>
    );
}

export default CreateClass;