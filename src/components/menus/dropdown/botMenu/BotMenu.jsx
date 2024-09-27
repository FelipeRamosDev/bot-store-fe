import { useContext, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Folder from '@mui/icons-material/Folder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RubberButton from '@/components/buttons/rubberButton/RubberButton';
import DeleteBotConfirmDialog from '@/components/modals/deleteBotConfirmDialog/DeleteBotConfirmDialog';
import { Edit } from '@mui/icons-material';
import CreateBotModal from '@/components/modals/createBotModal/CreateBotModal';

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
   const open = Boolean(anchorEl);

   const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
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
