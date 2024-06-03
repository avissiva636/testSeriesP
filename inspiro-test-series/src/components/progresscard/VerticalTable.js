import React from 'react';
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const VerticalTable = ({ data }) => {
  return (
    <Stack sx={{ margin: "0px 40px 0px 40px" }}>
      <TableContainer sx={{ border: '1px solid rgba(0, 0, 0, 0.12)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Q No</TableCell>
              <TableCell>Result</TableCell>
              <TableCell>Difficulty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.sno}</TableCell>
                <TableCell>
                  {row.status === 'correct' ? <DoneIcon color="success" /> : <CloseIcon color="error" />}
                </TableCell>
                <TableCell>{row.difficulty}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer></Stack>
  );
};

export default VerticalTable;
