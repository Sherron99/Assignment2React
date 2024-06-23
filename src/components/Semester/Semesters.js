import React, {useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl} from "../Constants";
import {Link} from "react-router-dom";

function Semesters(props) {
    const [token] = useState(localStorage.getItem("token"));
    const [semesters, setSemesters] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(baseUrl + "Ass2/semesters/", {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then((response) => {
                setSemesters(response.data);
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
                <Link to="/CreateSemester" className="btn btn-primary">Create a Semester</Link>
                {semesters.map(semester => (
                    <p key={semester.id}>
                        <Link to="/SemesterDetail" state={{ semester_id: semester.id }}>
                            {semester.year} - {semester.semester}
                        </Link>
                    </p>
                ))}
            </>
        )}
    </div>
    );
}

export default Semesters;