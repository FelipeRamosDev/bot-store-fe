import './TableBase.scss';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

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
