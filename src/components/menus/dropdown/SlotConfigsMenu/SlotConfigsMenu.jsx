'use client';

import { useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


/**
 * MasterMenu component that provides various actions for managing a master entity.
 *
 * This component displays a menu with options to start/stop all instances, perform actions specific
 * to demo or master, and manage the master entity (e.g., edit, archive, delete). It also controls the
 * visibility of related modals such as Demo Deposit, Exchange API, and Create/Edit Master.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} [props.isDemo=false] - Flag indicating if demo-specific actions should be shown.
 * @param {Object} [props.master={}] - The master object which is used in modals.
 * @param {boolean} [props.noTrasition=false] - Flag to disable menu transition animation.
 *
 * @example
 * return <MasterMenu isDemo={true} master={masterObject} />;
 *
 * @returns {JSX.Element} A menu with action items and modals for managing a master entity.
 */
export default function SlotConfigsMenu({ chartsDisplay, setChartsDisplay }) {
   const [ anchorEl, setAnchorEl ] = useState(null);
   const open = Boolean(anchorEl);

   /**
    * Opens the menu at the specified position.
    *
    * @param {React.MouseEvent} event - The mouse event that triggered the menu to open.
    * @param {string} id - The ID of the menu.
    */
   const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
   };

   /**
    * Closes the menu.
    */
   const handleMenuClose = () => {
      setAnchorEl(null);
   };

   const handleDisplayCharts = () => {
      const newValue = !chartsDisplay;

      window.localStorage.setItem('slot_configs:charts_display', newValue);
      setChartsDisplay(newValue);
   }

   if (window.localStorage.getItem('slot_configs:charts_display') === null) {
      setChartsDisplay(true);
   }

   return (
      <>
         <RoundIconButton Icon={Settings} size="small" onClick={handleMenuOpen} />

         <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
         >
            <MenuItem onClick={handleDisplayCharts}>
               <ListItemIcon>
                  {!chartsDisplay ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
               </ListItemIcon>

               {!chartsDisplay ? 'Display Charts' : 'Hide Charts'}
            </MenuItem>
         </Menu>
      </>
   );
}
