import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {baseUrl} from "../Constants";

function ClassDetail(props) {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const location = useLocation();
    const class_id = location.state?.class_id;

    const [number, setNumber] = useState('');
    const [course, setCourse] = useState('');
    const [semester, setSemester] = useState('');
    const [lecturer, setLecturer] = useState('');
    const [students, setStudents] = useState([]);

    useEffect(() => {
        if (!class_id) {
            alert("No class ID provided");
            navigate('/Classes');
            return;
        }

        if (!token) {
            alert("No token found, please log in");
            navigate('/Login');
            return;
        }

        axios.get(`${baseUrl}Ass2/classes/${class_id}/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then(response => {
            const classData = response.data;
            setNumber(classData.number);
            setCourse(classData.course.name);
            setSemester(`${classData.semester.year} ${classData.semester.semester}`);
            setLecturer(`${classData.lecturer.firstName} ${classData.lecturer.lastName}`);
            setStudents(classData.students);
        }).catch(error => {
            console.error('Error fetching class data:', error.response ? error.response.data : error.message);
            alert("Failed to fetch class data");
            navigate('/Classes');
        });
    }, [class_id, token, navigate]);

    function deleteClass() {
        if (window.confirm("Are you sure you want to delete this class?")) {
            axios.delete(`${baseUrl}Ass2/classes/${class_id}/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }).then(response => {
                alert("Class deleted successfully");
                navigate('/Classes');
            }).catch(error => {
                console.error('Error deleting class:', error.response ? error.response.data : error.message);
                alert("Failed to delete class");
            });
        }
    }

    return (
        <div>
            <h3>Class Detail: {class_id}</h3>
            <p>Number: {number}</p>
            <p>Course: {course}</p>
            <p>Semester: {semester}</p>
            <p>Lecturer: {lecturer}</p>
            <p>Students:</p>
            {students.map((student) => (
                <div key={student.id}>
                    <p>{student.firstName} {student.lastName}</p>
                </div>
            ))}
            <Link to={"/UpdateClass"} state={{class_id: class_id}} className={"btn btn-primary"}>Update</Link>
            <button onClick={deleteClass} className={"btn btn-danger"}>Delete</button>
        </div>
    );
}

export default ClassDetail;
