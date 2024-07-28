import React from 'react'
import  { useEffect, useState } from 'react';

const EmployeeDetails = () => {
    const [data, setData] = useState([]);

    async function fetchEmployeeData() {
        const response = await fetch('https://dummyjson.com/users');
        const empdata = await response.json();
        console.log(empdata);
        setData(empdata.users);
      }

      useEffect(() => {
        fetchEmployeeData();
      }, []);



  return (
    <div>
       {data.map(item => (
        <div>
        <p>{item.id} </p>
        <p>{item.firstName} </p>
        <p>{item.lastName}</p>
        </div>
        ))}
    </div>
  )
}

export default EmployeeDetails