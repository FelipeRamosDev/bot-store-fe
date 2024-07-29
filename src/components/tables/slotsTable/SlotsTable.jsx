'use client';
import './SlotsTable.scss';
import { useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import SlotsTableRow from './SlotsTableRow';

import SlotsTableHeader from './SlotsTableHeader';

export default function SlotsTable({ className = '', slots = [], elevate = true, borderLastRow = true, maxHeight = 440, ...props }) {
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(7);
   const slicedSlots = slots.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
   };

   return <div className={`slots-table ${className} ${elevate ? 'elevate' : ''} ${borderLastRow ? 'lastrow-noborder' : ''}`} {...props}>
      <TableContainer sx={{ maxHeight }}>
         <Table stickyHeader aria-label="sticky table">
            <SlotsTableHeader />

            <TableBody>
               {slicedSlots.map((slot) => <SlotsTableRow key={Math.random()} slot={slot} />)}
            </TableBody>
         </Table>
      </TableContainer>
      <TablePagination
         rowsPerPageOptions={[10, 25, 100]}
         component="div"
         count={slots.length}
         rowsPerPage={rowsPerPage}
         page={page}
         onPageChange={handleChangePage}
         onRowsPerPageChange={handleChangeRowsPerPage}
      />
   </div>;
}
