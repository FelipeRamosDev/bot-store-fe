import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Add from '@mui/icons-material/Add';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';

export default function AddBotValuesStopsMenu({ bot = {}, noTrasition = false, setModalState }) {
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
            <MenuItem onClick={() => setModalState({
               slug: 'stoploss_long',
               valueType: 'function' })}
               disabled={bot.values.find(item => item.slug === 'stoploss_long')}
            >
               Stoploss (Long)
            </MenuItem>

            <MenuItem onClick={() => setModalState({
               slug: 'stoploss_short',
               valueType: 'function' })}
               disabled={bot.values.find(item => item.slug === 'stoploss_short')}
            >
               Stoploss (Short)
            </MenuItem>

            <MenuItem onClick={() => setModalState({
               slug: 'takeprofit_long',
               valueType: 'function' })}
               disabled={bot.values.find(item => item.slug === 'takeprofit_long')}
            >
               Takeprofit (Long)
            </MenuItem>

            <MenuItem onClick={() => setModalState({
               slug: 'takeprofit_short',
               valueType: 'function' })}
               disabled={bot.values.find(item => item.slug === 'takeprofit_short')}
            >
               Takeprofit (Short)
            </MenuItem>
         </Menu>
      </>
   );
}
