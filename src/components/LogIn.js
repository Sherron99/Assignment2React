import {Fragment, useEffect, useState} from "react";
import axios from "axios"; // 用于发出http请求的库
import {baseUrl} from "./Constants";
import {useNavigate} from "react-router-dom";
import Lecturers from "./Lecturer/Lecturers";
//这里的"../Constants"表示的是从Constants文件夹里获取到这个baseUrl
//我们这样使用{baseUrl}的好处是，易于维护：如果 API 的基础 URL 发生变化，只需要修改一个地方，而不是修改代码中的每一个请求。避免重复代码：将基础 URL 提取出来，可以避免在每个请求中重复写 URL 的公共部分。

//遇到的问题：
//1.为什么[]里第二个用的是usernameChanged而不是usernameChange；但是onChange里用的确实usernameChange而不是usernameChanged。
//解答：useState Hook 返回一个数组，其中第一个元素是当前状态值，第二个元素只适用于更新该状态的函数(只能是状态更新函数)
//对于usernameChanged，passwordChanged属于状态更新函数。
//对于usernameChange，passwordChange属于事件处理函数。用于处理用户输入事件，并在这些函数中调用状态更新函数


//这里的props是什么？ 父组件给子组件传递的内容，但是子组件无权修改内容
// 父组件
// function ParentComponent() {
//     return (
//         <ChildComponent name="John" age={30} />
//     );
// }
//
// // 子组件
// function ChildComponent(props) {
//     return (
//         <div>
//             <p>Name: {props.name}</p>
//             <p>Age: {props.age}</p>
//         </div>
//     );
// }
function LogIn(props) {
    const [token, setToken] = useState("");
    const [username, usernameChanged] = useState("");
    const [password, passwordChanged] = useState("");
    const [hasToken, setHasToken] = useState(false);
    const navigate = useNavigate(); //useNavigate用于在应用程序中进行编程导航
    const [students, setStudents] = useState([]);
    const [lecturers, setLecturers] = useState([]);

    //useEffect(() => { ... }, [token]); 这是useEffect的语法结构
    //敲重点，在[]里面的东西就是我们需要实时跟踪的东西，如果[]的东西发生变化时，例如token发生变化时，我们就会调用useEffect里面的回调函数。
    useEffect(() => {
        if (localStorage.getItem("token")) {
            setHasToken(localStorage.getItem("token"));
            setHasToken(true);
        }
    }, [token]);

//敲重点：使用 useState 的第二个返回值（即状态更新函数）可以直接调用来更新状态。不过，当你需要在某个特定事件（例如按钮点击）之后更新状态时，
//通常会在事件处理函数中调用状态更新函数。
    function usernameChange(event) {
        usernameChanged(event.target.value);
    }

    function passwordChange(event) {
        passwordChanged(event.target.value);
    }

// 遇到的问题是，为什么method用的是post而不是get。
// GET：用于请求数据。例如，获取一个网页或从服务器获取一些数据。
// POST：用于发送数据到服务器。例如，提交表单数据或上传文件。
// 实际上，登录验证不应该通过获取所有用户并在客户端进行匹配来实现。这样做不仅效率低下，而且存在严重的安全隐患（例如，暴露所有用户数据）。
// 正确的做法是服务器进行验证：客户端发送用户凭证（用户名和密码）到服务器，服务器在后台进行验证。如果验证成功，服务器会返回一个表示用户已认证的响应（如 JWT 令牌或会话 ID）。

    function btnLogin() {
        const loginPayload = {
            username: username,
            password: password,
        };
        //这里的loginPayload就相当于postman我们写的那一步骤，把他们传递到数据库检查。

        console.log("Sending login request with payload:", loginPayload);

        axios.post(baseUrl + 'auth/', loginPayload)
            .then(response => {
                console.log("Login response:", response.data); // response will give us token
                //为什么我们下面这行代码，我有加（response.data.）token。取决于服务器返回的数据格式例如有什么。它有返回token，我们才可以使用token
                const newToken = response.data.token;
                setToken(newToken);
                setHasToken(true);
                localStorage.setItem("token", newToken); // save token to localStorage
                //现在我就开始根据id来跳转到不同的页面。
                return Promise.all([
                    axios.get(`${baseUrl}Ass2/lecturers/`, {
                        headers: {'Authorization': `Token ${newToken}`}
                    }),
                    axios.get(`${baseUrl}Ass2/students/`, {
                        headers: {'Authorization': `Token ${newToken}`}
                    })
                ]);
            })
            .then(([lecturersResponse, studentsResponse]) => {
                setLecturers(lecturersResponse.data);
                setStudents(studentsResponse.data);

                // 统一进行用户角色判断
                if (username === "luoluo") {
                    localStorage.setItem("userRole", "administor");
                    navigate("/Administor");
                    return;
                }

                const lecturer = lecturersResponse.data.find(l =>
                    username === (l.firstName + l.lastName).toLowerCase()
                );
                if (lecturer) {
                    localStorage.setItem("id", lecturer.id.toString());
                    localStorage.setItem("userRole", "lecturer");
                    navigate('/Lecturer');
                    window.location.reload();
                    return;
                }

                const student = studentsResponse.data.find(s =>
                    username === (s.firstName + s.lastName).toLowerCase()
                );
                if (student) {
                    localStorage.setItem("id", student.id.toString());
                    localStorage.setItem("userRole", "student");
                    navigate('/Student');
                    window.location.reload();
                    return;
                }

                // 如果没有匹配到任何角色
                alert("User role not found. Please contact administrator.");
            })
            .catch(error => {
                if (error.response) {
                    console.error('Error response:', error.response);
                    if (error.response.status === 400) {
                        alert("Bad request. Please check your input.");
                    } else if (error.response.status === 401) {
                        alert("Invalid username or password. Please try again.");
                    } else {
                        alert("An error occurred. Please try again.");
                    }
                } else {
                    console.error('Error message:', error.message);
                    alert("An error occurred. Please try again.");
                }
            });
    }


    function logout() {
        let login_token = localStorage.getItem("token");
        axios.get(
            baseUrl + 'auth/logout/',
            {
                headers: {
                    "Authorization": "Token " + login_token
                }
            }
        ).then(response => {
            console.log(response);
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            setToken("");
            setHasToken(false);
            navigate("/");
            window.location.reload();
        }).catch(error => {
            console.log(error);
        });
    }

    //下面的return就是react一种特殊用法，它允许我们在javascript中直接写html代码
    //我们使用div就会多一个DOM节点，但是fragment不会。
    return (
        <div>
            {hasToken ?
                <Fragment>
                    <button className={"btn btn-warning"} onClick={logout}>Logout</button>
                </Fragment>
                :
                <Fragment>
                    <p>username : <input type="text" name={"username"} onChange={usernameChange}/></p>
                    <p>password : <input type="password" name={"password"} onChange={passwordChange}/></p>
                    <button onClick={btnLogin}>Login</button>
                </Fragment>
            }
        </div>
    );
}

// export 关键字用于导出组件，以便在其他文件中导入和使用它。
export default LogIn;