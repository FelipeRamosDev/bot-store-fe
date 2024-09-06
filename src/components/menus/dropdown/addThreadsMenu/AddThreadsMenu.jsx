import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Add from '@mui/icons-material/Add';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';

export default function AddThreadsMenu({ setModalState }) {
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
         >
            <MenuItem onClick={handleMenuClose}>
               OPEN (Long)
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
               OPEN (Short)
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
               CLOSE (Long)
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
               CLOSE (Short)
            </MenuItem>
         </Menu>
      </>
   );
}
