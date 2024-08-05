'use client';
import './TableBase.scss';
import { useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import TableBaseRow from './TableBaseRow';
import TableBaseHeader from './TableBaseHeader';
import ColumnConfig from '@/models/TableColumnConfig';
import FitSpinner from '@/components/load/fitSpinner/FitSpinner';
import NoDocumentsTile from '@/components/tiles/noDocumentsTile/NoDocumentsTile';

export default function TableBase({
   className = '',
   items = [],
   elevate = true,
   borderLastRow = true,
   maxHeight = 440,
   hideHeader = false,
   loading = true,
   pagination,
   headerConfigs,
   CustomTableItem,
   ...props
}) {
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const slicedSlots = items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
   const TableItem = CustomTableItem || TableBaseRow;

   const {
      rowsPerPageOptions = [10, 25, 100],
      handleChangePage = (event, newPage) => {
         setPage(newPage);
      },
      handleChangeRowsPerPage = (event) => {
         setRowsPerPage(+event.target.value);
         setPage(0);
      }
   } = Object(pagination);

   headerConfigs = headerConfigs.map(item => new ColumnConfig(item));

   return <div className={`table-base ${className} ${elevate ? 'elevate' : ''} ${borderLastRow ? 'lastrow-noborder' : ''}`} {...props}>
      {loading && <FitSpinner color="tertiary-dark" spinner="Loading" />}

      {!loading && <TableContainer sx={{ maxHeight }}>
         <Table stickyHeader>
            {!hideHeader && <TableBaseHeader headerConfigs={headerConfigs} />}

            <TableBody>
               {(slicedSlots.length > 0) && (
                  slicedSlots.map((item) => (
                     <TableItem key={Math.random()} item={item} headerConfigs={headerConfigs} />
                  )
               ))}
            </TableBody>
         </Table>
      </TableContainer>}

      
      {(!loading && slicedSlots.length === 0) && (
         <NoDocumentsTile noBorder={true} Icon={false} message={`There is no documents to list!`} />
      )}

      {pagination && <TablePagination
         rowsPerPageOptions={rowsPerPageOptions}
         component="div"
         count={items.length}
         rowsPerPage={rowsPerPage}
         page={page}
         onPageChange={handleChangePage}
         onRowsPerPageChange={handleChangeRowsPerPage}
      />}
   </div>;
}
