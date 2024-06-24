import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from "../Constants";
import { useNavigate } from "react-router-dom";

function CreateStudent(props) {
    const [token] = useState(localStorage.getItem("token"));
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [DOB, setDOB] = useState("");
    const navigate = useNavigate();

    function createStudent() {
        if (firstName === "") {
            alert("Please enter a first name");
            return;
        }
        if (lastName === "") {
            alert("Please enter a last name");
            return;
        }
        if (email === "") {
            alert("Please enter an email");
            return;
        }
        if (DOB === "") {
            alert("Please enter a DOB");
            return;
        }

        const user = {
            username: firstName + lastName,
            password: DOB,
            first_name: firstName,
            last_name: lastName,
            email: email,
            groups: [3] // 3 for student, 2 for teacher
        };

        axios.post(`${baseUrl}Ass2/users/`, user, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            const userId = response.data.id;
            const student = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                DOB: DOB,
                user: userId
            };

            return axios.post(`${baseUrl}Ass2/students/`, student, {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        }).then(response => {
            alert("Student created successfully");
            navigate("/Student");
            window.location.reload();
        }).catch(error => {
            console.error('Error creating student:', error.response ? error.response.data : error.message);
            alert("Student creation failed");
        });
    }

    return (
        <div>
            <p>
                First Name: <input type="text" id="firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </p>
            <p>
                Last Name: <input type="text" id="lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </p>
            <p>
                Email: <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </p>
            <p>
                DOB: <input type="date" id="DOB" value={DOB} onChange={(e) => setDOB(e.target.value)} />
            </p>
            <p>
                <button onClick={createStudent}>Create</button>
            </p>
        </div>
    );
}

export default CreateStudent;
