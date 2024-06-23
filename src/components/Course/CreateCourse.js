import React, {Fragment, useState} from 'react';
import axios, {create} from "axios";
import {baseUrl} from "../Constants";

function CreateCourse(props) {
    const [code, setCode] = useState("");
    const [name, setName] = useState("");

    function getCode(event) {
        setCode(event.target.value);
    }

    function getName(event) {
        setName(event.target.value);
    }

    function createCourse() {
        
        axios.post(baseUrl + "Ass2/courses/", {

        })
    }

    return (
        <div>
            <Fragment>
                <h1>Create a Course</h1>
                <p>Code</p>
                <input type="text" placeholder="Course Code" onChange={getCode}/>
                <p>Name</p>
                <input type="text" placeholder="Course Name" onChange={getName}/>
                <p></p>
                <button type="submit" onClick={createCourse}>Create</button>
            </Fragment>
        </div>
    );
}

export default CreateCourse;