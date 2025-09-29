import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import DBPage from './dbpage.jsx';
import DBPage2 from "./dbpage2";
import ButtonUsage from "./button_test";


export default function BasicTable() 
{
    function clickHandler()
    {
        alert("click")
    }
  return (
    <TableContainer component={Paper} sx={{margin:'10px'}}>
      <Table sx={{ margin:'50px', width:'90%' }} aria-label="simple table">
        <TableBody>
            <TableRow >
                <TableCell className='borderRow'><DBPage></DBPage></TableCell>
                <TableCell className='borderRow'><DBPage2></DBPage2></TableCell>
            </TableRow>
        </TableBody>
    </Table>
    <Table>
        <TableBody>
            <TableRow className='borderRow'>
               <TableCell xs={12}><ButtonUsage></ButtonUsage></TableCell> 
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
