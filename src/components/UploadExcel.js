import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { baseUrl } from './Constants';

const UploadExcel = () => {
  const [data, setData] = useState([]);
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
      // 发送Excel数据到后端API
      const response = await axios.post(`${baseUrl}students/batch`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Data successfully submitted!');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error submitting data!');
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
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((cell, i) => (
                    <td key={i}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleSubmit} style={styles.button}>Submit</button>
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
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
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
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default UploadExcel;
