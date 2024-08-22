import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);

   const handleMenuOpen = (event) => {
      setAnchorEl({ left: event.clientX, top: event.clientY });
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
   };

   return (
      <MenuContext.Provider value={{ anchorEl, open, handleMenuOpen, handleMenuClose }}>
         {children}
      </MenuContext.Provider>
   );
};

export const useMenu = () => useContext(MenuContext);
