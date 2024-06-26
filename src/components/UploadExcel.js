import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { baseUrl } from './Constants';
import { useNavigate } from "react-router-dom";

const UploadExcel = () => {
  const [data, setData] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.xlsx, .xls',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setData(jsonData);
      };

      reader.readAsBinaryString(file);
    },
  });

  const handleSubmit = async () => {
    try {
      for (const student of data) {
        const user = {
          username: student.firstName + student.lastName,
          password: student.DOB,
          first_name: student.firstName,
          last_name: student.lastName,
          email: student.email,
          groups: [3] // 3 for student
        };

        const userResponse = await axios.post(`${baseUrl}Ass2/users/`, user, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const userId = userResponse.data.id;
        const studentData = {
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          DOB: student.DOB,
          user: userId
        };

        await axios.post(`${baseUrl}Ass2/students/`, studentData, {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }

      alert('Students successfully created!');
      navigate("/Students");
      window.location.reload();
    } catch (error) {
      console.error('Error creating students:', error.response ? error.response.data : error.message);
      alert('Error creating students!');
    }
  };

  return (
    <div>
      <div {...getRootProps()} style={styles.dropzone}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop an Excel file here, or click to select one</p>
      </div>
      {data.length > 0 && (
        <div>
          <table style={styles.table}>
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key} style={styles.th}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((cell, i) => (
                    <td key={i} style={styles.td}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleSubmit} style={styles.button}>Create Students</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  dropzone: {
    border: '2px dashed #007bff',
    borderRadius: '5px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#007bff',
    color: 'white',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default UploadExcel;