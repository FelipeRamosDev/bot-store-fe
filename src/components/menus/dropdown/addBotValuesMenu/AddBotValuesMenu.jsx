import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Add from '@mui/icons-material/Add';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';

export default function AddBotValuesMenu({ bot = {}, noTrasition = false, setModalState }) {
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);

   const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
   };

   return (
      <>
         <RoundIconButton Icon={Add} variant="contained" color="tertiary" onClick={handleMenuOpen} />

         <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            transitionDuration={noTrasition ? 0 : undefined}
         >
            <MenuItem onClick={() => setModalState({ slug: 'stoploss_long', valueType: 'function' })}>
               Stoploss (Long)
            </MenuItem>

            <MenuItem onClick={() => setModalState({ slug: 'stoploss_short', valueType: 'function' })}>
               Stoploss (Short)
            </MenuItem>

            <MenuItem onClick={() => setModalState({ slug: 'takeprofit_long', valueType: 'function' })}>
               Takeprofit (Long)
            </MenuItem>

            <MenuItem onClick={() => setModalState({ slug: 'takeprofit_short', valueType: 'function' })}>
               Takeprofit (Short)
            </MenuItem>
         </Menu>
      </>
   );
}
