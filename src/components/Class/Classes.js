import React, {useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl} from "../Constants";
import {Link} from "react-router-dom";
import CourseName from "../CourseName";

function Classes() {
    const [token] = useState(localStorage.getItem("token"));
    const [classes, setClasses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(baseUrl + "Ass2/classes/", {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then((response) => {
                setClasses(response.data);
            })
            .catch((error) => {
                setError('Unauthorized Access');
            });
    }, [token]);

    return (
        <div>
            {error ? (
                <p>{error}</p>
            ) : (
                <>
                    <Link to="/CreateClass" className="btn btn-primary">Create a Class</Link>
                    {classes.map(theClass => (
                        <p key={theClass.id}>
                            <Link to="/ClassDetail" state={{ class_id: theClass.id }}>
                                {theClass.number} - <CourseName course_id={theClass.course}/>
                            </Link>
                            {theClass.course.name}
                        </p>
                    ))}
                </>
            )}
        </div>
    );
}

export default Classes;
