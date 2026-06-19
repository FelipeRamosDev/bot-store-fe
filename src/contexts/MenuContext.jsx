import React, { createContext, useContext, useState } from 'react';

// Create a context for managing menu state
const MenuContext = createContext();

/**
 * MenuProvider Component
 *
 * This component provides menu-related state and functions to the component tree via context.
 * It manages the anchor position of the menu and its open/close state.
 *
 * @param {Object} props - The properties passed to this component.
 * @param {React.ReactNode} props.children - The child components to be rendered within this provider.
 *
 * @returns {JSX.Element} The context provider component wrapping the children.
 */
export const MenuProvider = ({ children }) => {
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);

   /**
    * Opens the menu at the specified position.
    *
    * @param {React.MouseEvent} event - The mouse event that triggered the menu to open.
    * @param {string} id - The ID of the menu.
    */
   const handleMenuOpen = (event, id) => {
      setAnchorEl({ id, left: event.clientX, top: event.clientY });
   };

   /**
    * Closes the menu.
    */
   const handleMenuClose = () => {
      setAnchorEl(null);
   };

   return (
      <MenuContext.Provider value={{ anchorEl, open, handleMenuOpen, handleMenuClose }}>
         {children}
      </MenuContext.Provider>
   );
};

/**
 * useMenu Hook
 *
 * This custom hook provides access to the menu context values.
 *
 * @returns {Object} The context values for managing menu state.
 */
export const useMenu = () => useContext(MenuContext);
