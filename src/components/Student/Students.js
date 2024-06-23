import React, {useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl} from "../Constants";
import {Link} from "react-router-dom";

function Students(props) {
    const [students, setStudents] = useState([]);
    const [token] = useState(localStorage.getItem("token"));
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(baseUrl + "Ass2/students/", {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then((response) => {
                setStudents(response.data);
            })
            .catch((error) => {
                setError('Unauthorized Access');
            })
    }, [token]);

    return (
        <div>
            {error ? (
                <p>{error}</p>
            ) : (
                <>
                    <Link to="/CreateStudent" className="btn btn-primary">Create a Student</Link>
                    {students.map(student => (
                        <p key={student.id}>
                            <Link to="/StudentDetail" state={{ student_id: student.id }}>
                                {student.firstName}{student.lastName}
                            </Link>
                        </p>
                    ))}
                </>
            )}
        </div>
    );
}

export default Students;