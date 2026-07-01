'use client';

import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteBotConfirmDialog from '@/components/modals/dialogs/deleteBotConfirmDialog/DeleteBotConfirmDialog';
import { Edit } from '@mui/icons-material';
import CreateBotModal from '@/components/modals/createBotModal/CreateBotModal';
import usePilot from '@/hooks/usePilot';
import DataObjectIcon from '@mui/icons-material/DataObject';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';

/**
 * BotMenu renders a button that opens a menu with options to archive or delete a bot.
 * The delete option opens a confirmation dialog, and the archive option is currently disabled.
 * 
 * @component
 * 
 * @returns {JSX.Element} The BotMenu component.
 */
export default function BotMenu({ bot }) {
   const [anchorEl, setAnchorEl] = useState(null);
   const [editModal, setEditModal] = useState(false);
   const [deleteModal, setDeleteModal] = useState(false);
   const { exportJSON } = usePilot();
   const open = Boolean(anchorEl);

   const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
   };

   const exportBotJSON = async () => {
      try {
         const strategy = await exportJSON(bot._id);
         const botJSON = JSON.stringify(strategy, null, 2);

         const blob = new Blob([botJSON], { type: 'application/json' });
         const url = URL.createObjectURL(blob);
         const link = document.createElement('a');

         link.href = url;
         link.download = `${bot.name}_Pilot.json`;

         document.body.appendChild(link);
         link.click();

         document.body.removeChild(link);
         URL.revokeObjectURL(url);
      } catch (error) {
         console.error('Error exporting bot JSON:', error);
         alert('Failed to export bot JSON. Please try again.');
      }
   };

   return (
      <>
         <RoundIconButton color="secondary" variant="contained" Icon={MoreVertIcon} onClick={handleMenuOpen} />

         <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
         >
            <MenuItem onClick={() => setEditModal(true)}>
               <ListItemIcon>
                  <Edit fontSize="small" />
               </ListItemIcon>
               Edit Pilot
            </MenuItem>

            <MenuItem onClick={exportBotJSON}>
               <ListItemIcon>
                  <DataObjectIcon fontSize="small" />
               </ListItemIcon>
               Export JSON
            </MenuItem>

            <MenuItem onClick={() => setDeleteModal(true)}>
               <ListItemIcon>
                  <DeleteForeverIcon color="error" fontSize="small" />
               </ListItemIcon>
               Delete
            </MenuItem>
         </Menu>

         <CreateBotModal bot={bot} open={editModal} setModal={setEditModal} />
         <DeleteBotConfirmDialog open={deleteModal} setOpen={setDeleteModal} />
      </>
   );
}
