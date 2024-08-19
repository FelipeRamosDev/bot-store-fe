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
import DeleteMasterConfirmDialog from '@/components/modals/deleteMasterConfirmDialog/DeleteMasterCofirmDialog';
import CreateMasterModal from '@/components/modals/createMasterModal/CreateMasterModal';

export default function SlotMenu({ slot = {} }) {
   const [ deleteConfirmDialog, setDeleteConfirmDialog ] = useState(false);
   const [ editSlotModal, setEditSlotModal ] = useState(false);
   const [ anchorEl, setAnchorEl ] = useState(null);
   const open = Boolean(anchorEl);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <>
         <RoundIconButton size="small" Icon={MoreVertIcon} onClick={handleClick} />

         <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
         >
            <MenuItem onClick={() => setEditSlotModal(true)}>
               <ListItemIcon>
                  <ModeEditIcon fontSize="small" />
               </ListItemIcon>
               Edit
            </MenuItem>

            <MenuItem onClick={handleClose}>
               <ListItemIcon>
                  <ArchiveIcon fontSize="small" />
               </ListItemIcon>
               Archive
            </MenuItem>

            <MenuItem onClick={() => setDeleteConfirmDialog(true)}>
               <ListItemIcon>
                  <DeleteForeverIcon color="error" fontSize="small" />
               </ListItemIcon>
               Delete Slot
            </MenuItem>
         </Menu>

         <CreateMasterModal editMode={true} open={editSlotModal} setOpen={setEditSlotModal} slot={slot} />
         <DeleteMasterConfirmDialog
            slot={slot}
            open={deleteConfirmDialog}
            setOpen={setDeleteConfirmDialog}
         />
      </>
   );
}
