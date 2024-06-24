import React, {Fragment, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {baseUrl} from "../Constants";
import axios from "axios";

function UpdateCourse(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const course_id = location.state.course_id;
    const [token] = useState(localStorage.getItem("token"));
    const [code, setCode] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        axios.get(`${baseUrl}Ass2/courses/${course_id}`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then(response => {
                setCode(response.data.code);
                setName(response.data.name);
            })
            .catch(error => {
                alert("Course not found");
            });
    }, [course_id, token]);

    const getCode = (event) => {
        setCode(event.target.value);
    }
    const getName = (event) => {
        setName(event.target.value);
    }

    const updateCourse = () => {
        const course = {
            code: code,
            name: name
        }
        axios.patch(`${baseUrl}Ass2/courses/${course_id}/`, course, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                alert("Course updated successfully");
                navigate('/Courses');
                window.location.reload();
            })
            .catch(error => {
                alert("Course updated failed");
            })
    }
    return (
        <Fragment>
            <h1>Update Course ID: {course_id}</h1>
            <p>Code</p>
            <input type={"text"} id={"code"} value={code} onChange={getCode}/>
            <p>Name</p>
            <input type={"text"} value={name} onChange={getName}/>
            <p></p>
            <button type="submit" onClick={updateCourse}>Update</button>
        </Fragment>
    );
}

export default UpdateCourse;