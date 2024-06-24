import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {baseUrl} from "../Constants";

function CourseDetail() {
    const location = useLocation(); //敲重点，这里我们使用了location = useLocation是因为上一个网页给我们传递了数据，course_id，我们需要获取。
    const navigate = useNavigate();
    const [courseInstance, setCourseInstance] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!location.state || !location.state.course_id) {
            navigate('/Courses');  // 这里的location.state就是查看有没有传递过来数据 ； 这里的location.state.course_id就是查看有没有传递这个数字过来
            return;
        }

        const course_id = location.state.course_id;
        const token = localStorage.getItem("token");

        axios.get(`${baseUrl}Ass2/courses/${course_id}`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then((response) => {
                setCourseInstance(response.data);
            })
            .catch((error) => {
                console.error("Error fetching course details:", error);
                setError('Failed to load course details');
            })
    }, [location.state, navigate]);

    if (error) return <div>{error}</div>;
    if (!courseInstance) return <div>No course data available</div>;


    function btnDelete() {
        if (window.confirm("Are you sure you want to delete this course?")) {
            const token = localStorage.getItem("token");
            axios.delete(`${baseUrl}Ass2/courses/${courseInstance.id}`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
                .then((response) => {
                    alert("Course deleted successfully");
                    navigate('/Courses');
                    window.location.reload();
                })
                .catch((error) => {
                    alert("Course deleted failed");
                    setError('Failed to delete course');
                })
        }
    }

    return (
        <div>
            <h1>Course ID: {courseInstance.id}</h1>
            <h5>Code: {courseInstance.code}</h5>
            <h5>Name: {courseInstance.name}</h5>
            <Link to={`/UpdateCourse`} state={{course_id: courseInstance.id}}
                  className={"btn btn-primary"}>Update</Link>
            <button onClick={btnDelete} className={"btn btn-danger"}>Delete</button>
        </div>
    );
}

export default CourseDetail;