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
            <MenuItem
               onClick={() => setModalState({
                  evantName: 'stopLossLong',
                  valueType: 'function'
               })}
               disabled={bot.values.find(item => item.slug === 'stopLossLong')}
            >
               Stoploss (Long)
            </MenuItem>

            <MenuItem
               onClick={() => setModalState({
                  evantName: 'stopLossShort',
                  valueType: 'function' 
               })}
               disabled={bot.values.find(item => item.slug === 'stopLossShort')}
            >
               Stoploss (Short)
            </MenuItem>

            <MenuItem
               onClick={() => setModalState({
                  evantName: 'takeProfitLong',
                  valueType: 'function'
               })}
               disabled={bot.values.find(item => item.slug === 'takeProfitLong')}
            >
               Takeprofit (Long)
            </MenuItem>

            <MenuItem
               onClick={() => setModalState({
                  evantName: 'takeProfitShort',
                  valueType: 'function'
               })}
               disabled={bot.values.find(item => item.slug === 'takeProfitShort')}
            >
               Takeprofit (Short)
            </MenuItem>
         </Menu>
      </>
   );
}
