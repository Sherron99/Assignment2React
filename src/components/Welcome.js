import {useEffect, useState} from "react";
import {baseUrl} from "./Constants";
import axios from "axios";

function Welcome(props) {
    const [loggedin, setLoggedin] = useState(false);
    const [token] = useState(localStorage.getItem("token"));
    const [id] = useState(localStorage.getItem("id"));

    useEffect(() => {
        if (token) {
            setLoggedin(true);
        }
    }, [token]);

    useEffect(() => {
        if (loggedin) {
            axios.get(`${baseUrl}Ass2/`)
        }
    }, [id]);

    return (
<div>
    <p>Welcome to This Page</p>
</div>
    );
}

export default Welcome;