import React, {Fragment, useState} from 'react';
import axios, {create} from "axios";
import {baseUrl} from "../Constants";
import {useNavigate} from "react-router-dom";

function CreateCourse(props) {
    const navigate = useNavigate();
    const [code, setCode] = useState("");
    const [name, setName] = useState("");

    function getCode(event) {
        setCode(event.target.value);
    }

    function getName(event) {
        setName(event.target.value);
    }

    function createCourse() {
        let data = {
            code: code,
            name: name
        }

        axios.post(baseUrl + "Ass2/courses/", data,{
            headers: {
                'Authorization': `Token ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            alert("Course created successfully");
            navigate('/Courses');
            window.location.reload();
        }).catch((error) => {
            console.log(error);
            alert("Course created failed");
        })
    }

    return (
        <div>
            <Fragment>
                <h1>Create a Course</h1>
                <p>Code</p>
                <input type={"text"} id={"code"} placeholder="Course Code" onChange={getCode}/>
                <p>Name</p>
                <input type={"text"} placeholder="Course Name" onChange={getName}/>
                <p></p>
                <button type="submit" onClick={createCourse}>Create</button>
            </Fragment>
        </div>
    );
}

export default CreateCourse;