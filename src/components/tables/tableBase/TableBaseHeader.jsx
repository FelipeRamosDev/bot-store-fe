import './TableBase.scss';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ColumnConfig from '@/models/TableColumnConfig';

export default function TableBaseHeader({ headerConfigs = [] }) {
   return <TableHead>
      <TableRow>
         {headerConfigs.map((column) => {
            const config = new ColumnConfig(column);

            return <TableCell
               key={config.id}
               align={config.align}
               style={config.style}
            >
               {config.label}
            </TableCell>
         })}
      </TableRow>
   </TableHead>;
}
