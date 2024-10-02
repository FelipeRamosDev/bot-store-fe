'use client';
import { useState, useRef } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import TableBaseRow from './TableBaseRow';
import TableBaseHeader from './TableBaseHeader';
import ColumnConfig from '@/models/TableColumnConfig';
import FitSpinner from '@/components/load/fitSpinner/FitSpinner';
import NoDocumentsTile from '@/components/tiles/noDocumentsTile/NoDocumentsTile';
import { Button } from '@mui/material';

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
 * @param {number} [props.itemsPerPage] - The number of items to list per page.
 * @param {boolean} [props.usePagination=false] - Set to true if you need the pagination footer.
 * @param {boolean} [props.useSeeMorePage=false] - Set to true if you need the "see more" button to paginate.
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
   maxHeight = 886,
   hideHeader = false,
   loading = true,
   onClickRow = () => {},
   onPageNav = async () => {},
   onRowsPerPageChange = async () => {},
   itemsPerPage = 10,
   usePagination = false,
   useSeeMorePage = false,
   headerConfigs,
   CustomTableItem,
   include,
   exclude, 
   ...props
}) {
   const [ page, setPage ] = useState(0);
   const [ rowsPerPage, setRowsPerPage ] = useState(itemsPerPage);
   const slicedSlots = useSeeMorePage ? items : items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
   const TableItem = CustomTableItem || TableBaseRow;
   const rowsPerPageCount = useRef();
   const tableContainer = useRef();
   let tableHeight;
   let disableSeeMore = false;

   if (!rowsPerPageCount.current) {
      rowsPerPageCount.current = rowsPerPage;
   }

   if (items.length < ((page + 1) * itemsPerPage)) {
      disableSeeMore = true
   }

   const rowsPerPageOptions = [1,2,3,4,5,6].map((_, index) => rowsPerPageCount.current * (index + 1));
   const handleChangePage = async (event, newPage) => {
      await onPageNav(newPage);
      setPage(newPage);
   }

   const handleChangeRowsPerPage = async (event) => {
      const newValue = +event.target.value;

      await onRowsPerPageChange(newValue);
      setRowsPerPage(newValue);
   }

   if (tableContainer.current) {
      tableHeight = tableContainer.current.clientHeight;
   }

   if (Array.isArray(include)) {
      headerConfigs = headerConfigs.filter(item => include.some(inc => inc === item.propKey))
   }

   if (Array.isArray(exclude)) {
      headerConfigs = headerConfigs.filter(item => !exclude.some(exc => exc === item.propKey));
   }

   headerConfigs = headerConfigs.map(item => new ColumnConfig(item));

   return <div className={`table-base ${className} ${elevate ? 'elevate' : ''} ${borderLastRow ? 'lastrow-noborder' : ''}`} {...props}>
      {loading && <FitSpinner color="tertiary-dark" spinner="Loading" style={{ minHeight: tableHeight }} />}

      {!loading && <TableContainer ref={tableContainer} sx={{ maxHeight }}>
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

      {usePagination && (
         <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={items.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
         />
      )}

      {useSeeMorePage && !disableSeeMore && (
         <Button
            className="seemore-button"
            color="rubber"
            variant="contained"
            fullWidth={true}
            onClick={(ev) => handleChangePage(ev, page + 1)}
         >
            See More
         </Button>
      )}
   </div>;
}
