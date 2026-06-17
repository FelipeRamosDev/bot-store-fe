'use client';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Folder from '@mui/icons-material/Folder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RubberButton from '@/components/buttons/rubberButton/RubberButton';
import DeleteBotConfirmDialog from '@/components/modals/dialogs/deleteBotConfirmDialog/DeleteBotConfirmDialog';
import { CopyAll, Edit } from '@mui/icons-material';
import CreateBotModal from '@/components/modals/createBotModal/CreateBotModal';
import usePilot from '@/hooks/usePilot';

/**
 * BotMenu renders a button that opens a menu with options to archive or delete a bot.
 * The delete option opens a confirmation dialog, and the archive option is currently disabled.
 * 
 * @component
 * 
 * @returns {JSX.Element} The BotMenu component.
 */
export default function BotMenu({ bot }) {
   const [ anchorEl, setAnchorEl ] = useState(null);
   const [ editModal, setEditModal ] = useState(false);
   const [ deleteModal, setDeleteModal ] = useState(false);
   const { getStategy } = usePilot();
   const open = Boolean(anchorEl);

   const copyTextWithFallback = async (text) => {
      if (document.hasFocus() && navigator?.clipboard?.writeText) {
         await navigator.clipboard.writeText(text);
         return true;
      }

      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.setAttribute('readonly', '');
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      let copied = false;
      try {
         copied = document.execCommand('copy');
      } finally {
         document.body.removeChild(textArea);
      }

      return copied;
   };

   const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
   };

   const copyBotJSON = async () => {
      try {
         const strategy = await getStategy(bot._id);
         const botJSON = JSON.stringify(strategy, null, 2);

         const copied = await copyTextWithFallback(botJSON);
         if (!copied) {
            alert('Could not copy JSON. Focus this tab and try again.');
         }
      } catch (error) {
         console.error('Error copying bot JSON:', error);
         alert('Failed to copy bot JSON. Please try again.');
      }
   };

   return (
      <>
         <RubberButton color="info" endIcon={<MoreHorizIcon />} onClick={handleMenuOpen}>
            MORE
         </RubberButton>

         <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
         >
            <MenuItem onClick={copyBotJSON}>
               <ListItemIcon>
                  <CopyAll fontSize="small" />
               </ListItemIcon>
               Copy JSON
            </MenuItem>

            <MenuItem onClick={() => setEditModal(true)}>
               <ListItemIcon>
                  <Edit fontSize="small" />
               </ListItemIcon>
               Edit Bot
            </MenuItem>

            <MenuItem onClick={handleMenuClose} disabled>
               <ListItemIcon>
                  <Folder fontSize="small" />
               </ListItemIcon>
               Archive
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
