import React, { Fragment, useEffect, useState } from 'react';
import axios from "axios";
import { baseUrl } from "./Constants";

function CourseName(props) {
    const [name, setName] = useState("");
    const [token] = useState(localStorage.getItem("token"));

    useEffect(() => {
        axios.get(baseUrl + "Ass2/courses" + props.course_id, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then((response) => {
            setName(response.data.name);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [props.course_id, token]);

    return (
        <Fragment>
            {name}
        </Fragment>
    );
}

export default CourseName;
