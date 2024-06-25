import React, {useEffect, useState} from 'react';
import {baseUrl} from "./Constants";
import axios from "axios";

function Student(props) {
    const [studentID] = useState(localStorage.getItem("id"));
    const [token] = useState(localStorage.getItem("token"));
    const [studentInstance, setStudentInstance] = useState(null);
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const studentResponse = await axios.get(`${baseUrl}Ass2/students/${studentID}/`, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                setStudentInstance(studentResponse.data);
            } catch (error) {
                handleError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, [studentID, token]);

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const enrollmentsResponse = await axios.get(`${baseUrl}Ass2/enrollments/`, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });

                // 假设后端已经过滤了当前学生的enrollment
                setEnrollments(enrollmentsResponse.data);
            } catch (error) {
                handleError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEnrollments();
    }, [token]);

    const handleError = (error) => {
        if (error.response) {
            console.error("Error:", error.response.data);
        } else if (error.request) {
            console.error("Error:", error.request);
        } else {
            console.error("Error:", error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Hello {studentInstance ? `${studentInstance.firstName} ${studentInstance.lastName}` : "Student"}!</h1>
            <div>
                <h2>Your Classes:</h2>
                {enrollments.length > 0 ? (
                    <ul>
                        {enrollments.map(enrollment => (
                            <li key={enrollment.id}>
                                {enrollment.course.name} - Grade: {enrollment.grade} -
                                Semester: {enrollment.semester.year} {enrollment.semester.semester}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No classes enrolled yet!</p>
                )}
            </div>
        </div>
    );
}

export default Student;