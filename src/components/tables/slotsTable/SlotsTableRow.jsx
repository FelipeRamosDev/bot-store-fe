import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import EdgeLight from '@/components/common/edgeLight/EdgeLight';
import Price from '@/components/displays/price/Price';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';

export default function SlotsTableRow({ slot }) {
   if (!slot) {
      return <></>;
   }

   return (
      <TableRow hover sx={{ position: 'relative' }} role="checkbox" tabIndex={-1}>
         <TableCell align="left">
            <EdgeLight colorValue={slot.pnl} />

            <p>{slot.name}</p>
            <small>{slot.master.name}</small>
         </TableCell>

         <TableCell align="right">
            <Price amount={slot.pnl} />
         </TableCell>
         
         <TableCell align="right">
            <StatusBadge type="account-type">{slot.type}</StatusBadge>
         </TableCell>
      </TableRow>
   );
}
