import React, { Fragment, useEffect, useState } from 'react';
import axios from "axios";
import { baseUrl } from "./Constants";

// lei说如果我们使用map，必须要有key. 时刻记着我们要用authorization token
function Course(props) {
    const [courses, setCourses] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get(`${baseUrl}Ass2/courses/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then((response) => {
            setCourses(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [token]);

    return (
        <Fragment>
            {courses.map(course =>
                <option value={course.id} key={course.id}>{course.name}</option>
            )}
        </Fragment>
    );
}

export default Course;
