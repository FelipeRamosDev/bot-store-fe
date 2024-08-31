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

/**
 * A reusable table component that handles pagination, loading states, and customizable rows and headers.
 *
 * @param {Object} props - The props passed to the TableBase component.
 * @param {string} [props.className=''] - Optional class names for styling.
 * @param {Array} [props.items=[]] - The data to be displayed in the table.
 * @param {boolean} [props.elevate=true] - Whether to apply elevation styles.
 * @param {boolean} [props.borderLastRow=true] - Whether to apply border styles to the last row.
 * @param {number} [props.maxHeight=440] - Maximum height of the table container.
 * @param {boolean} [props.hideHeader=false] - Whether to hide the table header.
 * @param {boolean} [props.loading=true] - Whether the table is in a loading state.
 * @param {Function} [props.onClickRow=()=>{}] - Function to handle the row's click event. It receives the current item as the first argument.
 * @param {Object} [props.pagination] - Pagination settings including options and handlers.
 * @param {Array} [props.headerConfigs] - Configuration for table headers.
 * @param {React.Component} [props.CustomTableItem] - Custom component for rendering table rows.
 * @param {Array} [props.include] - Optional array of column keys to include.
 * @param {Array} [props.exclude] - Optional array of column keys to exclude.
 * @returns {React.Element} The rendered table component.
 */
export default function TableBase({
   className = '',
   items = [],
   elevate = true,
   borderLastRow = true,
   maxHeight = 440,
   hideHeader = false,
   loading = true,
   onClickRow = () => {},
   pagination,
   headerConfigs,
   CustomTableItem,
   include,
   exclude, 
   ...props
}) {
   const [ page, setPage ] = useState(0);
   const [ rowsPerPage, setRowsPerPage ] = useState(10);
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

   if (Array.isArray(include)) {
      headerConfigs = headerConfigs.filter(item => include.some(inc => inc === item.propKey))
   }

   if (Array.isArray(exclude)) {
      headerConfigs = headerConfigs.filter(item => !exclude.some(exc => exc === item.propKey));
   }

   headerConfigs = headerConfigs.map(item => new ColumnConfig(item));

   return <div className={`table-base ${className} ${elevate ? 'elevate' : ''} ${borderLastRow ? 'lastrow-noborder' : ''}`} {...props}>
      {loading && <FitSpinner color="tertiary-dark" spinner="Loading" />}

      {!loading && <TableContainer sx={{ maxHeight }}>
         <Table stickyHeader>
            {!hideHeader && <TableBaseHeader headerConfigs={headerConfigs} />}

            <TableBody>
               {(slicedSlots.length > 0) && (
                  slicedSlots.map((item) => (
                     <TableItem
                        key={Math.random()}
                        item={item}
                        headerConfigs={headerConfigs}
                        onClick={() => onClickRow(item)}
                     />
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
