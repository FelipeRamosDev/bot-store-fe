import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Add from '@mui/icons-material/Add';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import { ListItemIcon } from '@mui/material';

/**
 * AddBotValuesMenu renders a button to add different types of values (dynamic or primitive)
 * for a bot. It opens a menu with options to select the type of value to add.
 *
 * @component
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.bot - The bot object to which values will be added (not currently used in this component).
 * @param {boolean} [props.noTrasition=false] - If true, disables the transition animation for the menu.
 * @param {Function} props.setModalState - Function to set the state of the modal, which determines the type of value being added.
 * 
 * @returns {JSX.Element} The AddBotValuesMenu component.
 */
export default function AddBotValuesMenu({ bot = {}, noTrasition = false, setModalState }) {
   const [ anchorEl, setAnchorEl ] = useState(null);
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
               valueType: 'function' })}
            >
               <ListItemIcon>
                  <Add fontSize="small" />
               </ListItemIcon>
               Dynamic Value
            </MenuItem>

            <MenuItem onClick={() => setModalState({
               valueType: 'primitive' })}
            >
               <ListItemIcon>
                  <Add fontSize="small" />
               </ListItemIcon>
               Primitive Value
            </MenuItem>
         </Menu>
      </>
   );
}
