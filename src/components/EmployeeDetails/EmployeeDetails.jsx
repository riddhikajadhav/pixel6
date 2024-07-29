import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  TableSortLabel,
  Paper,
  Avatar,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Box,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

const EmployeeDetails = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPage, setRowsPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [filterbygender, setFilterByGender] = useState('');
  const [filterbycountry, setFilterByCountry] = useState('');

  async function fetchEmployeeData() {
    const response = await fetch('https://dummyjson.com/users');
    const empdata = await response.json();
    setData(empdata.users);
  }

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (orderBy === 'fullName') {
      return `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`);
    }
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const sortData = (array, comparator) => {
    const stabilizedArray = array.map((el, index) => [el, index]);
    stabilizedArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedArray.map((el) => el[0]);
  };

  const applyFilters = (data) => {
    return data.filter((item) => {
      return (
        (filterbygender ? item.gender === filterbygender : true) &&
        (filterbycountry ? item.address.country === filterbycountry : true)
      );
    });
  };

  const sortedData = sortData(applyFilters(data), getComparator(order, orderBy));

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, marginBottom: 2 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="gender-filter-label" sx={{ fontSize: '1rem' }}>Gender</InputLabel>
          <Select
            labelId="gender-filter-label"
            value={filterbygender}
            label="Gender"
            onChange={(e) => setFilterByGender(e.target.value)}
            sx={{ fontSize: '1rem' }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="country-filter-label" sx={{ fontSize: '1rem' }}>Country</InputLabel>
          <Select
            labelId="country-filter-label"
            value={filterbycountry}
            label="Country"
            onChange={(e) => setFilterByCountry(e.target.value)}
            sx={{ fontSize: '1rem' }}
          >
            <MenuItem value="">All</MenuItem>
            {Array.from(new Set(data.map((item) => item.address.country))).map((country) => (
              <MenuItem key={country} value={country}>{country}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sortDirection={orderBy === 'id' ? order : false}
                sx={{ fontWeight: 'bold' }}
              >
                <TableSortLabel
                  active={orderBy === 'id'}
                  direction={orderBy === 'id' ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, 'id')}
                  sx={{ 
                    '&.Mui-active': { 
                      color: 'text.primary' 
                    },
                    '&.MuiTableSortLabel-root': {
                      color: 'text.primary',
                      fontWeight: 'bold'
                    },
                    '& .MuiTableSortLabel-icon': {
                      opacity: 1
                    }
                  }}
                >
                  ID
                  {orderBy === 'id' ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
              <TableCell
                sortDirection={orderBy === 'fullName' ? order : false}
                sx={{ fontWeight: 'bold' }}
              >
                <TableSortLabel
                  active={orderBy === 'fullName'}
                  direction={orderBy === 'fullName' ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, 'fullName')}
                  sx={{ 
                    '&.Mui-active': { 
                      color: 'text.primary' 
                    },
                    '&.MuiTableSortLabel-root': {
                      color: 'text.primary',
                      fontWeight: 'bold'
                    },
                    '& .MuiTableSortLabel-icon': {
                      opacity: 1
                    }
                  }}
                >
                  Full Name
                  {orderBy === 'fullName' ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Gender</TableCell>
              <TableCell
                sortDirection={orderBy === 'age' ? order : false}
                sx={{ fontWeight: 'bold' }}
              >
                <TableSortLabel
                  active={orderBy === 'age'}
                  direction={orderBy === 'age' ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, 'age')}
                  sx={{ 
                    '&.Mui-active': { 
                      color: 'text.primary' 
                    },
                    '&.MuiTableSortLabel-root': {
                      color: 'text.primary',
                      fontWeight: 'bold'
                    },
                    '& .MuiTableSortLabel-icon': {
                      opacity: 1
                    }
                  }}
                >
                  Age
                  {orderBy === 'age' ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Designation</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.slice(page * rowsPage, page * rowsPage + rowsPage).map((item) => (
              <TableRow
                key={item.id}
                sx={{ '&:hover': { backgroundColor: '#f1f1f1' } }}
              >
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  <Avatar src={item.image} alt={`${item.firstName} ${item.lastName}`} />
                </TableCell>
                <TableCell>{`${item.firstName} ${item.maidenName} ${item.lastName}`}</TableCell>
                <TableCell>{item.gender}</TableCell>
                <TableCell>{item.age}</TableCell>
                <TableCell>{item.company.title}</TableCell>
                <TableCell>{`${item.address.state}, ${item.address.country}`}</TableCell>
                <TableCell>{item.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={8}
                count={data.length}
                rowsPerPage={rowsPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ '& .MuiTablePagination-select': { fontSize: '1rem' }, '& .MuiTablePagination-caption': { fontSize: '1rem' } }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}

export default EmployeeDetails;
