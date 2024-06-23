import React, {useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl} from "../Constants";
import {Link} from "react-router-dom";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [token] = useState(localStorage.getItem("token"));
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(baseUrl + "Ass2/courses/", {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then((response) => {
                setCourses(response.data);
            })
            .catch((error) => {
                setError('Unauthorized Access');
            })
    }, [token]);

    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <Link to={"/CreateCourse"} className={"btn btn-primary"}>Create a Course</Link>
                    <p></p>
                    {courses.map(course =>
                        //在link中，为什么我们需要有state和key？
                    //key确保了展示的每一个course都会有一个unique的id // state是为了确保
                        <p><Link to={"/CourseDetail"} state={{course_id: course.id}}
                                 key={course.id}>{course.code} - {course.name}</Link></p>
                    )}
                </div>
            )}
        </>
    );
}

export default Courses;