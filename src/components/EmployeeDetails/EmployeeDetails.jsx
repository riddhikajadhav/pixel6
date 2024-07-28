import React from 'react'
import  { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper,
  Avatar
} from '@mui/material';

const EmployeeDetails = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

    async function fetchEmployeeData() {
        const response = await fetch('https://dummyjson.com/users');
        const empdata = await response.json();
        console.log(empdata);
        setData(empdata.users);
      }

      useEffect(() => {
        fetchEmployeeData();
      }, []);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;


  return (
    <div>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Desiganation</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                <Avatar src={item.image} alt={`${item.firstName} ${item.lastName}`} />
              </TableCell>
              <TableCell>{`${item.firstName} ${item.maidenName} ${item.lastName}`}</TableCell>
              <TableCell>{item.gender}</TableCell>
              <TableCell>{item.company.title}</TableCell>
              <TableCell>{`${item.address.state}, ${item.address.country}`}</TableCell>
              <TableCell>{item.email}</TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={4}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </div>
  )
}

export default EmployeeDetails