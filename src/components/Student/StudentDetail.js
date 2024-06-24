import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {baseUrl} from "../Constants";

function StudentDetail(props) {
    const [token] = useState(localStorage.getItem("token"));
    const [student, setStudent] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const student_id = location.state.student_id;

    useEffect(() => {
        if(!location.state || !location.state.student_id){
            navigate('/Students');
            return;
        }

        axios.get(`${baseUrl}Ass2/students/${student_id}`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then((response) => {
            setStudent(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    function deleteStudent() {
        if (window.confirm("Are you sure you want to delete this student?")) {
        axios.delete(`${baseUrl}Ass2/students/${student_id}`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then((response) => {
            const user_id = student.user; // 获取关联的用户ID
            axios.delete(`${baseUrl}Ass2/users/${user_id}`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
                }).then((response) => {
                    alert("Lecturer and user deleted successfully");
                    navigate('/Student');
                    window.location.reload();
                }).catch((error) => {
                    alert("Failed to delete user");
                    console.log(error);
                });
            }).catch((error) => {
                alert("Failed to delete lecturer");
                console.log(error);
            });
        }
    }

    return (
        <div>
            <h1>Student Detail</h1>
            <p>Student ID: {student.id}</p>
            <p>Student Name: {student.firstName} {student.lastName}</p>
            <p>Student Email: {student.email}</p>
            <p>Student DOB: {student.DOB}</p>
            <Link to="/UpdateStudent" className="btn btn-primary" state={{student_id: student.id}}>Update</Link>
            <button className="btn btn-danger" onClick={deleteStudent}>Delete</button>
        </div>
    );
}

export default StudentDetail;