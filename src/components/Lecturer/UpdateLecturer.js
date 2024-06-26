import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {baseUrl} from "../Constants";

function UpdateLecturer(props) {
    const [token] = useState(localStorage.getItem("token"));
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [DOB, setDOB] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const lecturer_id = location.state.lecturer_id;


    useEffect(() => {
        axios.get(`${baseUrl}Ass2/lecturers/${lecturer_id}/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then((response) => {
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmail(response.data.email);
            setDOB(response.data.DOB);
        })
    }, [token, lecturer_id]);

    function updateLecturer() {
        const lecturer = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            DOB: DOB
        };
        axios.put(`${baseUrl}Ass2/lecturers/${lecturer_id}/`, lecturer, {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then((response) => {
            const userID = response.data.user;
            const user = {
                username : firstName + lastName,
                first_name: firstName,
                last_name: lastName,
                email: email,
            }
            axios.patch(`${baseUrl}Ass2/users/${userID}/`,user,{
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            .then((response) => {
                console.log(response.data);
                alert("Lecturer updated successfully");
                navigate('/Lecturers');
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            alert("Failed to update");
            console.log(error);
        });
    }
    return (
        <div>
            <p>
                First Name: <input type="text" id="firstname" value={firstName}
                                   onChange={(e) => setFirstName(e.target.value)}/>
            </p>
            <p>
                Last Name: <input type="text" id="lastname" value={lastName}
                                  onChange={(e) => setLastName(e.target.value)}/>
            </p>
            <p>
                Email: <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </p>
            <p>
                DOB: <input type="date" id="DOB" value={DOB} onChange={(e) => setDOB(e.target.value)}/>
            </p>
            <p>
                <button onClick={updateLecturer}>Update</button>
            </p>
        </div>
    );
}

export default UpdateLecturer;