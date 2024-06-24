import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../Constants";

// 这里的update逻辑：1.这个class涉及到semester和course。
//我们要获取到所有的courses，和获取该semester已经选择了的course。
//在javascript里，遍历所有的courses，并且给每一个course都遍历一遍添加onChange，进行监测。如果用户有点击，我们就我们就将它保存至selectedCourses。最后当用户点击了create按钮后，我们再进行上传保存
function UpdateSemester(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const semester_id = location.state.semester_id;
    const [token] = useState(localStorage.getItem("token"));
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('1');
    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);

    useEffect(() => {
        axios.get(`${baseUrl}Ass2/semesters/${semester_id}`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then(response => {
                setYear(response.data.year);
                setSemester(response.data.semester);
                setSelectedCourses(response.data.courses.map(course => course.id)); // 提取课程ID
            })
            .catch(error => {
                console.log(error);
            });

        // 获取所有课程数据
        axios.get(`${baseUrl}Ass2/courses/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [semester_id, token]);

    function numberValue(e) {
        setYear(e.target.value);
    }

    function handleCourseChange(event) {
        const courseId = parseInt(event.target.value);
        if (event.target.checked) {
            setSelectedCourses([...selectedCourses, courseId]);
        } else {
            setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
        }
    }

    function btnUpdate() {
        if (!year || !semester || selectedCourses.length === 0) {
            alert('Please fill in all fields');
            return;
        } else {
            let data = {
                year: parseInt(year),
                semester: parseInt(semester),
                courses: selectedCourses
            }
            axios.put(`${baseUrl}Ass2/semesters/${semester_id}/`, data, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                alert('Semester updated successfully');
                navigate('/Semester');
                window.location.reload();
            }).catch((error) => {
                console.log(error);
                alert('Semester update failed');
            })
        }
    }

    return (
        <div>
            <h1>Update Semester</h1>
            <p>Year: </p>
            <input type="number" id="yearValue" value={year} onChange={numberValue} />
            <p>Semester: </p>
            <select id="semesterValue" value={semester} onChange={(e) => setSemester(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
            <p>Courses: </p>
            {courses.map(course => (
                <div key={course.id}>
                    <input
                        type="checkbox"
                        id={`course-${course.id}`}
                        value={course.id}
                        onChange={handleCourseChange}
                        checked={selectedCourses.includes(course.id)} // 确定复选框是否被勾选
                    />
                    <label htmlFor={`course-${course.id}`}>{course.name}</label>
                </div>
            ))}
            <button onClick={btnUpdate} className="btn btn-primary">Update</button>
        </div>
    );
}

export default UpdateSemester;
