import React, {useState} from 'react';
import {Link} from "react-router-dom";

function Administor(props) {
    return (
        <div>
            <p>Hello LuoLuo!</p>
            <p></p>
            {/*<Link to={"Classes"}>Manage Classes</Link> 在这里有遇到一个问题，administor一直在前面不消失，这种写法每进入下一个页面，网址会一直往后累加。
绝对路径就是：从头到尾 从根目录的完整路径 相对路径就是：从当前目录的完整路径*/}
            <Link to="/Classes">Manage Classes</Link>{/*但是这种写法，它会直接跳转到新的界面*/}
            <p></p>
            <Link to="/Students">Manage Students</Link>
            <p></p>
            <Link to="/Lecturers">Manage Lecturers</Link>
            <p></p>
            <Link to="/Semesters">Manage Semesters</Link>
            <p></p>
            <Link to="/Courses">Manage Courses</Link>
            <p></p>
            <Link to="/UploadExcel">UploadExcel</Link>
        </div>
    );
}

export default Administor;