import './TableBase.scss';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

/**
 * A table row component used in `TableBase` for rendering data items.
 * It maps over header configurations to render cells based on provided formatting functions.
 *
 * @param {Object} props - The props passed to the TableBaseRow component.
 * @param {Object} props.item - The data item to be rendered in the row.
 * @param {Array} [props.headerConfigs=[]] - Configuration for table headers including format functions.
 * @returns {React.Element} The rendered table row with cells based on header configurations.
 */
export default function TableBaseRow({ item, headerConfigs = [], ...props }) {
   if (!item) {
      return <></>;
   }

   return (
      <TableRow hover sx={{ position: 'relative' }} role="checkbox" tabIndex={-1} {...props}>
         {headerConfigs.map(config => (
            <TableCell key={Math.random()} align={config.align} style={config.style}>
               {config.format(item[config.propKey], item, config)}
            </TableCell>
         ))}
      </TableRow>
   );
}
