import React, {Fragment, useEffect, useState} from 'react';
import {baseUrl} from "../Constants";
import axios from "axios";
import {Link} from "react-router-dom";

function Lecturers(props) {
    const [lecturers, setLecturers] = useState([]);
    const [token] = useState(localStorage.getItem("token"));
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(baseUrl + "Ass2/lecturers/", {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then((response) => {
                setLecturers(response.data);
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
                    <Link to="/CreateLecturer" className="btn btn-primary">Create a Lecturer</Link>
                    {lecturers.map(laoshi =>
                        <p key={laoshi.id}>
                            <Link to="/LecturerDetail" state={{lecturer_id: laoshi.id}}>
                                {laoshi.firstName}{laoshi.lastName}
                            </Link>
                        </p>
                    )}
                </>
            )}
        </div>
    );
}

export default Lecturers;