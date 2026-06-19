import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Add from '@mui/icons-material/Add';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import { darkTheme } from '@/style/darkTheme';
import { Divider } from '@mui/material';

/**
 * AddThreadsMenu renders a button to open a menu for creating threads (open/close long or short).
 * Each menu item is styled with a badge indicating whether it is a "Long" or "Short" action.
 * 
 * @component
 * 
 * @param {Object} props - The component props.
 * @param {Function} props.createThread - Function to handle creating a thread. 
 * It takes a string indicating the thread type (e.g., 'openLong', 'openShort').
 * 
 * @returns {JSX.Element} The AddThreadsMenu component.
 */
export default function AddThreadsMenu({ createThread }) {
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);

   const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
   };

   const badgeStyle = {
      display: 'inline-block',
      marginRight: '0.5rem',
      padding: '0.4rem',
      textTransform: 'uppercase',
      fontSize: '0.75rem',
      fontWeight: 700,
      borderRadius: 3
   };

   const greenBadgeStyle = {
      ...badgeStyle,
      backgroundColor: darkTheme.palette.success.light,
      color: darkTheme.palette.text.success
   };

   const redBadgeStyle = { 
      ...badgeStyle,
      backgroundColor: darkTheme.palette.error.main,
      color: darkTheme.palette.text.error
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
            <MenuItem onClick={() => createThread('openLong')}>
               <span style={greenBadgeStyle}>Long</span> OPEN
            </MenuItem>

            <MenuItem onClick={() => createThread('openShort')}>
               <span style={redBadgeStyle}>Short</span> OPEN
            </MenuItem>

            <Divider />

            <MenuItem onClick={() => createThread('closeLong')}>
               <span style={greenBadgeStyle}>Long</span> CLOSE
            </MenuItem>

            <MenuItem onClick={() => createThread('closeShort')}>
               <span style={redBadgeStyle}>Short</span> CLOSE
            </MenuItem>
         </Menu>
      </>
   );
}
