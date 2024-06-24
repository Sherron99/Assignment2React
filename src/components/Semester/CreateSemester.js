import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../Constants';
import { useNavigate } from 'react-router-dom';

function CreateSemester(props) {
    const [token, setToken] = useState('');
    const [hasToken, setHasToken] = useState(false);
    const navigate = useNavigate();
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('1');
    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            setHasToken(true);
        }
    }, [token]);

    useEffect(() => {
        axios.get(baseUrl + 'Ass2/courses/', {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }).then(response => {
            setCourses(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    function handleCourseChange(event) {
        const courseId = parseInt(event.target.value);
        if (event.target.checked) {
            //...selectedCourses表示展开当前的selectedCourses数组，将其转换为一个个独立的元素。 并将courseId塞进去
            setSelectedCourses([...selectedCourses, courseId]);
        } else {
            //filter是过滤筛选出所有符合条件的数据从而组成一个新的数组。
            //这里的id是我们自定义的，表示selectedCourses的元素
            setSelectedCourses(selectedCourses.filter(id => id !== courseId));
        }
    }

    function numberValue(event) {
        setYear(event.target.value);
    }

    function btnCreate() {
        if (!year || !semester || selectedCourses.length === 0) {
            alert('Please fill in all fields');
            return;
        }

        let data = {
            year: parseInt(year),
            semester: parseInt(semester),
            courses: selectedCourses
        }

        axios.post(baseUrl + 'Ass2/semesters/', data, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            alert('Semester created successfully');
            navigate('/Semester');
            window.location.reload();
        }).catch((error) => {
            console.log(error);
            alert('Semester creation failed');
        })
    }

    return (
        <div>
            <h1>Create a Semester</h1>
            <p>Year: </p>
            <input type="number" id="yearValue" onChange={numberValue} />
            <p>Semester: </p>
            <select id="semesterValue" value={semester} onChange={(e) => setSemester(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
            <p>Courses: </p>
            {courses.map(course => (//有map就要用到key
                <div key={course.id}>
                    <input
                        type="checkbox"
                        id={`course-${course.id}`}
                        value={course.id}
                        onChange={handleCourseChange}
                    />
                    <label htmlFor={`course-${course.id}`}>{course.name}</label>
                </div>
            ))}
            <button onClick={btnCreate} className="btn btn-primary">Create</button>
        </div>
    );
}

export default CreateSemester;
