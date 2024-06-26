import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../Constants";

function LecturerDetail(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const lecturer_id = location.state.lecturer_id;
    const [lecturer, setLecturer] = useState([]);
    const [token] = useState(localStorage.getItem("token"));

    useEffect(() => {
        if (!location.state || !location.state.lecturer_id) {
            navigate('/Lecturers');
            return;
        }

        axios.get(`${baseUrl}Ass2/lecturers/${lecturer_id}/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then((response) => {
            setLecturer(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [navigate, location.state, lecturer_id, token]);

    function deleteLecturer() {
        if (window.confirm("Are you sure you want to delete this lecturer?")) {
            axios.delete(`${baseUrl}Ass2/lecturers/${lecturer_id}/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }).then((response) => {
                const user_id = lecturer.user; // 获取关联的用户ID
                axios.delete(`${baseUrl}Ass2/users/${user_id}/`, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }).then((response) => {
                    alert("Lecturer and user deleted successfully");
                    navigate('/Lecturers');
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
            <h1>Lecturer Detail</h1>
            <p>Lecturer ID: {lecturer.id}</p>
            <p>Lecturer Name: {lecturer.firstName} {lecturer.lastName}</p>
            <p>Lecturer Email: {lecturer.email}</p>
            <p>Lecturer DOB: {lecturer.DOB}</p>
            <Link to="/UpdateLecturer" className="btn btn-primary" state={{ lecturer_id: lecturer.id }}>Update</Link>
            <button className="btn btn-danger" onClick={deleteLecturer}>Delete</button>
        </div>
    );
}

export default LecturerDetail;
