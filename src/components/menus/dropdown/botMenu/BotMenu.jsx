import { useContext, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Folder from '@mui/icons-material/Folder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RubberButton from '@/components/buttons/rubberButton/RubberButton';
import APIContext from '@/contexts/4HandsAPI';
import { useRouter } from 'next/navigation';
import DeleteBotConfirmDialog from '@/components/modals/deleteBotConfirmDialog/DeleteBotConfirmDialog';

/**
 * BotMenu renders a button that opens a menu with options to archive or delete a bot.
 * The delete option opens a confirmation dialog, and the archive option is currently disabled.
 * 
 * @component
 * 
 * @returns {JSX.Element} The BotMenu component.
 */
export default function BotMenu() {
   const [ anchorEl, setAnchorEl ] = useState(null);
   const [ deleteModal, setDeleteModal ] = useState(false);
   const API = useContext(APIContext);
   const router = useRouter();
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

         <DeleteBotConfirmDialog open={deleteModal} setOpen={setDeleteModal} />
      </>
   );
}
