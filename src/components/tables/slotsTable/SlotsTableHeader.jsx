import ColumnConfig from '@/models/TableColumnConfig';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const HEADER = [
   new ColumnConfig({ label: 'Symbol / Master' }),
   new ColumnConfig({ label: 'PNL / ROI', align: 'right' }),
   new ColumnConfig({ label: 'Type', align: 'right' })
];

export default function SlotsTableHeader() {
   return <TableHead>
      <TableRow>
         {HEADER.map((column) => (
            <TableCell
               key={column.id}
               align={column.align}
               style={column.style}
            >
               {column.label}
            </TableCell>
         ))}
      </TableRow>
   </TableHead>;
}
