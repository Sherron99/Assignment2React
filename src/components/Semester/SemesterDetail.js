import React, {useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl} from "../Constants";
import {Link, useLocation, useNavigate} from "react-router-dom";

function SemesterDetail(props) {
    const [token] = useState(localStorage.getItem("token"));
    const [semester, setSemester] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const location = useLocation();
    const semester_id = location.state.semester_id;
    const navigate = useNavigate();

    useEffect(() => {
        if(!location.state || !location.state.semester_id){
            navigate("/Semesters");
            return;
        }

        setLoading(true);
        axios.get(`${baseUrl}Ass2/semesters/${semester_id}`, {
          headers: {
              'Authorization': `Token ${token}`
          }
        })
            .then((response) => {
                setSemester(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError('Unauthorized Access');
                setLoading(false);
            })
    }, [location.state, navigate, token]);

    function deleteSemester() {
        if(window.confirm("Are you sure you want to delete this semester?")){
            axios.delete(`${baseUrl}Ass2/semesters/${semester_id}`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then((response) => {
                alert("Semester deleted successfully");
                navigate("/Semester");
                window.location.reload();
            })
            .catch((error) => {
                alert("Semester deletion failed");
                setError('Unauthorized Access');
            })
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!semester) {
        return <div>No semester data available</div>;
    }

    //下面这里遇到的问题是，因为一个semester会有好几个courses，它是一个数组。所以说，我们需要遍历把这些数据都显示出来。
    return (
        <div>
            <h1>Semester Detail</h1>
            <h3>Year: {semester.year}</h3>
            <h3>Semester: {semester.semester}</h3>
            <h3>Courses:</h3>
            {semester.courses && semester.courses.length > 0 ? (
                <ul>
                    {semester.courses.map(course => (
                        <li key={course.id}>
                            {course.code} - {course.name}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No courses available for this semester.</p>
            )}
            <Link to={"/UpdateSemester"} className="btn btn-primary" state={{ semester_id: semester.id }}>Update</Link>
            <button onClick={deleteSemester} className="btn btn-danger">Delete</button>
        </div>
    );
}

export default SemesterDetail
