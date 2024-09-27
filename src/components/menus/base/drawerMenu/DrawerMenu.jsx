'use client';
import { Drawer } from '@mui/material';

/**
 * DrawerMenu component that renders a sidebar menu using MUI's Drawer component.
 *
 * @param {object} props - The component properties.
 * @param {string} props.className - Additional CSS class for custom styling. Defaults to an empty string.
 * @param {boolean} props.open - A boolean that determines if the drawer is open or closed.
 * @param {function} props.setOpen - Function to toggle the open state of the drawer.
 * @param {boolean} props.fitContent - If true, the drawer adjusts its size to fit the content. Defaults to false.
 * @param {JSX.Element | JSX.Element[]} children - The content to be rendered inside the drawer.
 * 
 * @returns {JSX.Element} A Drawer component that slides in from the right side of the screen.
 */
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
