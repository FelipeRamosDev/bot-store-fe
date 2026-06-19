import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ColumnConfig from '@/models/TableColumnConfig';

/**
 * A header component for tables, used in `TableBase` to render the table headers.
 * It maps over header configurations to generate table header cells with labels and styles.
 *
 * @param {Object} props - The props passed to the TableBaseHeader component.
 * @param {Array} [props.headerConfigs=[]] - Configuration for table headers including labels, alignment, and styles.
 * @returns {React.Element} The rendered table header with columns based on the header configurations.
 */
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
