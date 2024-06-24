import React, {useState} from 'react';
import axios from "axios";
import {baseUrl} from "../Constants";
import {useNavigate} from "react-router-dom";

function CreateLecturer(props) {
    const [token] = useState(localStorage.getItem("token"));
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [DOB, setDOB] = useState("");
    const navigate = useNavigate();

    function createLecturer() {
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
        const createUser = {
            username: firstName + lastName,
            password: DOB,
            first_name: firstName,
            last_name: lastName,
            email: email,
            groups: [2]
        }

        axios.post(`${baseUrl}/Ass2/users/`, createUser, { //这里忘记在baseurl和Ass2之间加/
            headers: {
                    'Content-Type': 'application/json'
            }
        })
            .then(response => {
                const userID = response.data.id;
                const lecturer = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    DOB: DOB,
                    user: userID
                };

                return axios.post(`${baseUrl}Ass2/lecturers/`, lecturer, {
                    headers: {
                        Authorization: `Token ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        alert("Lecturer created");
                        navigate("/Lecturer");
                        window.location.reload();
                    })
                    .catch(error => {
                        alert("Error creating user");
                    });
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
                <button onClick={createLecturer}>Create</button>
            </p>
        </div>
    );
}

export default CreateLecturer;