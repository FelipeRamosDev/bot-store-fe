import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Add from '@mui/icons-material/Add';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';

/**
 * AddBotValuesStopsMenu renders a button to add stop loss or take profit values for a bot.
 * It opens a menu with options to select which value type (long or short, stop loss or take profit)
 * to add. Each menu item is disabled if the respective value already exists in the bot's values.
 * 
 * @component
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.bot - The bot object containing current values to determine which menu items should be disabled.
 * @param {boolean} [props.noTrasition=false] - If true, disables the transition animation for the menu.
 * @param {Function} props.setModalState - Function to set the state of the modal for adding a new value.
 * 
 * @returns {JSX.Element} The AddBotValuesStopsMenu component.
 */
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
