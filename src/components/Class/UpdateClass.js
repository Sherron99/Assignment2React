import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {baseUrl} from "../Constants";

//在这个表格里遇到了一个问题，就是我的serializer和前段发送的数据不匹配。后段期待嵌套的对象结构，但是前段只发送了id。
//解决办法：在反序列化时使用 PrimaryKeyRelatedField，在序列化时使用嵌套的序列化器。以后再说。没有弄懂。

function UpdateClass(props) {
    const [token] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();
    const location = useLocation();
    const class_id = location.state.class_id;

    const [number, setNumber] = useState('');
    const [courses, setCourses] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [lecturers, setLecturers] = useState([]);
    const [students, setStudents] = useState([]);

    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedLecturer, setSelectedLecturer] = useState('');

    useEffect(() => {
        if (!class_id) {
            alert("No class ID provided");
            navigate('/Class');
            return;
        }

        if (!token) {
            alert("No token found, please log in");
            navigate('/Login');
            return;
        }


        //获取class的数据显示到页面上
        axios.get(`${baseUrl}Ass2/classes/${class_id}/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then(response => {
            setNumber(response.data.number);
            setSelectedCourse(response.data.course.id);
            setSelectedSemester(response.data.semester.id);
            setSelectedLecturer(response.data.lecturer.id);
            setSelectedStudents(response.data.students.map(student => student.id));//这里是把students里的每一个都以student实例遍历一遍，将他们的id保存到那个里面
        }).catch(error => {
            console.error('Error fetching class data:', error.response ? error.response.data : error.message);
            alert("Failed to fetch class data");
            navigate('/Class');
        });

        // 下面这几个都是为了让用户修改的时候供选择
        axios.get(`${baseUrl}Ass2/courses/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then(response => {
            setCourses(response.data);
        }).catch(error => {
            console.error('Error fetching courses:', error.response ? error.response.data : error.message);
        });


        axios.get(`${baseUrl}Ass2/semesters/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then(response => {
            setSemesters(response.data);
        }).catch(error => {
            console.error('Error fetching semesters:', error.response ? error.response.data : error.message);
        });


        axios.get(`${baseUrl}Ass2/lecturers/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then(response => {
            setLecturers(response.data);
        }).catch(error => {
            console.error('Error fetching lecturers:', error.response ? error.response.data : error.message);
        });


        axios.get(`${baseUrl}Ass2/students/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then(response => {
            setStudents(response.data);
        }).catch(error => {
            console.error('Error fetching students:', error.response ? error.response.data : error.message);
        });
    }, [class_id, token, navigate]);

    function numberValue(e) {
        setNumber(e.target.value);
    }

    //这里有点点绕：在下面的代码中，我们会先将student整个遍历一遍，并将他们和selectedStudents进行比对，看有没有勾选。
    //如果本身就有勾选，checked 就是true。当点击触发后，checked就变成了false。如果就没有勾选，checked是false，当onchange的时候，就变成了true。
    function handleStudentChange(event) {
        const studentId = parseInt(event.target.value);
        if (event.target.checked) {
            setSelectedStudents([...selectedStudents, studentId]);
        } else {
            setSelectedStudents(selectedStudents.filter(id => id !== studentId));
        }
    }

    //chatgpt给我的updateClass
    function updateClass() {
        if (!selectedLecturer) {
            alert("Please assign a lecturer to the class");
            return;
        }
        const updatedClass = {
            number: number.trim(),
            course: parseInt(selectedCourse),
            semester: parseInt(selectedSemester),
            lecturer: parseInt(selectedLecturer),
            students: selectedStudents.map(id => parseInt(id))//这里为什么用students？那是因为students是一个list，里面是student实例
        };

        console.log('Updating class with data:', updatedClass);

        axios.patch(`${baseUrl}Ass2/classes/${class_id}/`, updatedClass, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            alert("Class updated successfully");
            navigate('/Class');
        }).catch(error => {
            console.error('Error updating class:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                alert(`Failed to update class: ${JSON.stringify(error.response.data)}`);
            } else if (error.request) {
                console.error('No response received:', error.request);
                alert("No response received from server");
            } else {
                console.error('Error', error.message);
                alert(`Error: ${error.message}`);
            }
        });
    }


    return (
        <div>
            <p>Class Detail: {class_id}</p>
            <p>Number: <input type="text" value={number} onChange={numberValue}/></p>
            <p>Course:
                <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                </select>
            </p>
            <p>Semester:
                <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
                    {semesters.map((semester) => (
                        <option key={semester.id} value={semester.id}>{semester.year} {semester.code}</option>
                    ))}
                </select>
            </p>
            <p>Lecturer:
                <select value={selectedLecturer} onChange={(e) => setSelectedLecturer(e.target.value)}>
                    <option value="">Select a Lecturer</option>
                    {lecturers.map((lecturer) => (
                        <option key={lecturer.id} value={lecturer.id}>{lecturer.firstName} {lecturer.lastName}</option>
                    ))}
                </select>
            </p>
            <p>Students:</p>
            {students.map((student) => (
                <div key={student.id}>
                    <input
                        type="checkbox"
                        id={`${student.id}`}
                        value={student.id}
                        onChange={handleStudentChange}
                        checked={selectedStudents.includes(student.id)}//这里的checked适用于radio和checkbox，如果有包含那就说明被选中了
                    />
                    <label htmlFor={`student-${student.id}`}>{student.firstName} {student.lastName}</label>
                </div>
            ))}
            <button onClick={updateClass} className={"btn btn-primary"}>Update</button>
        </div>
    );
}

export default UpdateClass;