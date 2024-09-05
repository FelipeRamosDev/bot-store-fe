import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import BotValueModal from '@/components/modals/botValueModal/BotValueModal';
import DeleteBotValueConfirmDialog from '@/components/modals/deleteBotValueConfirmDialog/DeleteBotValueConfirmDialog';

export default function BotValuesMenu({ botValue = {} }) {
   const [ anchorEl, setAnchorEl ] = useState(null);
   const [ modal, setModal ] = useState(false);
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
         <RoundIconButton size="small" Icon={MoreVertIcon} onClick={handleMenuOpen} />

         <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
         >
            <MenuItem onClick={() => setModal(botValue)}>
               <ListItemIcon>
                  <ModeEditIcon fontSize="small" />
               </ListItemIcon>
               Edit
            </MenuItem>

            <MenuItem onClick={() => setDeleteModal(true)}>
               <ListItemIcon>
                  <DeleteForeverIcon color="error" fontSize="small" />
               </ListItemIcon>
               Delete
            </MenuItem>
         </Menu>

         <BotValueModal initView="create" open={modal} setModal={setModal} botValue={botValue} editMode={true} />
         <DeleteBotValueConfirmDialog botValue={botValue} open={deleteModal} setOpen={setDeleteModal} />
      </>
   );
}
