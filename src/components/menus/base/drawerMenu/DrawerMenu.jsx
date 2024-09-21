'use client';
import './DrawerMenu.scss';
import { Drawer } from '@mui/material';

export default function DrawerMenu({ className = '', open, setOpen, fitContent = false, children }) {
   const toggleDrawer = (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
         return;
      }

      setOpen(prev => !prev);
   };

   return (
      <Drawer
         className={`drawer-menu ${fitContent ? 'fit-content' : ''} ${className}`}
         anchor="right"
         open={open}
         onClose={toggleDrawer}
      >
         {children}
      </Drawer>
   );
}
