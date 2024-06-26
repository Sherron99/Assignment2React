import React, { useEffect, useState } from 'react';
import axios from "axios";
import { baseUrl } from "./Constants";
import {useLocation} from "react-router-dom";

function Lecturer(props) {
    const [lecturerID] = useState(localStorage.getItem("id"));
    const [lecturerInfo, setLecturerInfo] = useState({});
    const [enrolledStudents, setEnrolledStudents] = useState([]);
    const [updatedGrades, setUpdatedGrades] = useState({});
    const [token] = useState(localStorage.getItem("token"));
    const location = useLocation();

    useEffect(() => {
        const fetchLecturerData = async () => {
            try {
                const lecturerResponse = await axios.get(`${baseUrl}Ass2/lecturers/${lecturerID}/`, {
                    headers: { 'Authorization': `Token ${token}` }
                });
                setLecturerInfo(lecturerResponse.data); //这一步咋们获取到老师的信息

                const enrollmentsResponse = await axios.get(`${baseUrl}Ass2/enrollments/`, {
                    headers: { 'Authorization': `Token ${token}` }
                });
                setEnrolledStudents(enrollmentsResponse.data);
            } catch (error) {
                handleError(error);
            }
        };

        fetchLecturerData();
    }, [lecturerID, token]);

    const handleGradeChange = (enrollmentId, newGrade) => {
        setUpdatedGrades(prevState => ({
            ...prevState,
            [enrollmentId]: newGrade
        }));
    };

    const handleSubmit = async () => {
        try {
            const promises = Object.entries(updatedGrades).map(([enrollmentId, newGrade]) =>
                axios.patch(`${baseUrl}Ass2/enrollments/${enrollmentId}/`,
                    { grade: newGrade },
                    { headers: { 'Authorization': `Token ${token}` } }
                )
            );
            await Promise.all(promises);

            setEnrolledStudents(enrolledStudents.map(enrollment =>
                updatedGrades[enrollment.id] ? { ...enrollment, grade: updatedGrades[enrollment.id] } : enrollment
            ));

            setUpdatedGrades({});
            alert("Grades saved successfully");
            window.location.reload(true);
        } catch (error) {
            handleError(error);
        }
    };

    const handleError = (error) => {
        if (error.response) {
            console.error("Error:", error.response.data);
        } else if (error.request) {
            console.error("Error:", error.request);
        } else {
            console.error("Error:", error.message);
        }
    };

    return (
        <div>
            <h3>Hello {lecturerInfo.firstName} {lecturerInfo.lastName};</h3>
            <p>Here are your students:</p>
            {enrolledStudents.length > 0 ? (
                <ul>
                    {enrolledStudents.map(enrollment => (
                        <li key={enrollment.id}>
                            {enrollment.firstName} {enrollment.lastName} -
                            Class: {enrollment.course.name} -
                            Grade:
                            <input
                                type="number"
                                value={updatedGrades[enrollment.id] || enrollment.grade || ''}
                                onChange={(e) => handleGradeChange(enrollment.id, e.target.value)}
                            />
                        </li>
                    ))}
                    <button onClick={handleSubmit}>Submit</button>
                </ul>
            ) : (
                <p>No students enrolled.</p>
            )}
        </div>
    );
}

export default Lecturer;
