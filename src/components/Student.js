import React, { useEffect, useState } from 'react';
import { baseUrl } from "./Constants";
import axios from "axios";

function Student(props) {
    const [studentID] = useState(localStorage.getItem("id"));
    const [token] = useState(localStorage.getItem("token"));
    const [studentInstance, setStudentInstance] = useState({});
    const [classes, setClasses] = useState([])

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const studentResponse = await axios.get(`${baseUrl}Ass2/students/${studentID}/`, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                setStudentInstance(studentResponse.data);

                const enrollmentsResponse = await axios.get(`${baseUrl}Ass2/enrollments/`, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });

                const enrolledClasses = enrollmentsResponse.data.filter(classInstance =>
                    (classInstance.firstName + classInstance.lastName) === (studentInstance.firstName + studentInstance.lastName)
                );
                setClasses(enrolledClasses);

            } catch (error) {
                if (error.response) {
                    // 服务器返回了状态码，不在2xx范围内
                    console.error("Response data:", error.response.data);
                    console.error("Response status:", error.response.status);
                    console.error("Response headers:", error.response.headers);
                } else if (error.request) {
                    // 请求已经发出，但是没有收到响应
                    console.error("Request data:", error.request);
                } else {
                    // 其他错误
                    console.error("Error message:", error.message);
                }
                console.error("Error config:", error.config);
            }
        };

        fetchStudentData();
    }, [studentID, token]);

    return (
        <div>
            <h1>Hello {studentInstance.firstName} {studentInstance.lastName}!</h1>
            <div>
                <h2>Your Classes:</h2>
                <ul>
                    {classes.map(classInstance => (
                        <li key={classInstance.id}>{classInstance.Class}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Student;
