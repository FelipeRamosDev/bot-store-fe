import './SlotMenu.scss';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ArchiveIcon from '@mui/icons-material/Archive';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import { useMenu } from '@/contexts/MenuContext';

export default function SlotMenu({ slot = {}, noTrasition = false, setEditSlotModal, setDeleteConfirmDialog }) {
   const { anchorEl, handleMenuOpen, handleMenuClose } = useMenu();
   const open = Boolean (anchorEl?.id === slot.cod);

   return (
      <>
         <RoundIconButton size="small" Icon={MoreVertIcon} onClick={(ev) => handleMenuOpen(ev, slot.cod)} />

         <Menu
            anchorPosition={anchorEl}
            anchorReference='anchorPosition'
            open={open}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            transitionDuration={noTrasition ? 0 : undefined}
         >
            <MenuItem onClick={() => setEditSlotModal(slot)}>
               <ListItemIcon>
                  <ModeEditIcon fontSize="small" />
               </ListItemIcon>
               Edit
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
               <ListItemIcon>
                  <ArchiveIcon fontSize="small" />
               </ListItemIcon>
               Archive
            </MenuItem>

            <MenuItem onClick={() => setDeleteConfirmDialog(slot)}>
               <ListItemIcon>
                  <DeleteForeverIcon color="error" fontSize="small" />
               </ListItemIcon>
               Delete Slot
            </MenuItem>
         </Menu>
      </>
   );
}
