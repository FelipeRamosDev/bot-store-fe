import './MasterMenu.scss';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ArchiveIcon from '@mui/icons-material/Archive';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StopIcon from '@mui/icons-material/Stop';
import Divider from '@mui/material/Divider';
import DemoDepositModal from '@/components/modals/demoDepositModal/DemoDepositModal';
import ConfirmationDialog from '@/components/modals/confirmationDialog/ConfirmationDialog';
import DeleteMasterConfirmDialog from '@/components/modals/deleteMasterConfirmDialog/DeleteMasterCofirmDialog';

export default function MasterMenu({ isDemo = false, master = {} }) {
   const [ demoDepositModal, setDemoDepositModal ] = useState();
   const [ deleteConfirmDialog, setDeleteConfirmDialog ] = useState();
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
         <RoundIconButton Icon={MoreVertIcon} onClick={handleClick} />

         <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
         >
            {isDemo && <MenuItem onClick={() => setDemoDepositModal(true)}>
               <ListItemIcon>
                  <AttachMoneyIcon fontSize="small" />
               </ListItemIcon>
               Demo Deposit
            </MenuItem>}

            <MenuItem onClick={handleClose} disabled>
               <ListItemIcon>
                  <PlayArrowIcon fontSize="small" />
               </ListItemIcon>
               Start All
            </MenuItem>

            <MenuItem onClick={handleClose} disabled>
               <ListItemIcon>
                  <StopIcon fontSize="small" />
               </ListItemIcon>
               Stop All
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleClose}>
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
               Delete Master
            </MenuItem>
         </Menu>

         <DemoDepositModal open={demoDepositModal} setOpen={setDemoDepositModal} master={master} />

         <DeleteMasterConfirmDialog
            master={master}
            open={deleteConfirmDialog}
            setOpen={setDeleteConfirmDialog}
         />
      </>
   );
}
