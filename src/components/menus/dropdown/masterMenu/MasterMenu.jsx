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
import DeleteMasterConfirmDialog from '@/components/modals/deleteMasterConfirmDialog/DeleteMasterCofirmDialog';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ExchangeModal from '@/components/modals/exchangeModal/ExchangeModal';
import CreateMasterModal from '@/components/modals/createMasterModal/CreateMasterModal';
import { useMenu } from '@/contexts/MenuContext';

/**
 * MasterMenu component that provides various actions for managing a master entity.
 *
 * This component displays a menu with options to start/stop all instances, perform actions specific
 * to demo or master, and manage the master entity (e.g., edit, archive, delete). It also controls the
 * visibility of related modals such as Demo Deposit, Exchange API, and Create/Edit Master.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} [props.isDemo=false] - Flag indicating if demo-specific actions should be shown.
 * @param {Object} [props.master={}] - The master object which is used in modals.
 * @param {boolean} [props.noTrasition=false] - Flag to disable menu transition animation.
 *
 * @example
 * return <MasterMenu isDemo={true} master={masterObject} />;
 *
 * @returns {JSX.Element} A menu with action items and modals for managing a master entity.
 */
export default function MasterMenu({ isDemo = false, master = {}, noTrasition = false }) {
   const [ demoDepositModal, setDemoDepositModal ] = useState(false);
   const [ deleteConfirmDialog, setDeleteConfirmDialog ] = useState(false);
   const [ exchangeModal, setExchangeModal ] = useState(false);
   const [ editMasterModal, setEditMasterModal ] = useState(false);
   const { anchorEl, open, handleMenuOpen, handleMenuClose } = useMenu();

   return (
      <>
         <RoundIconButton Icon={MoreVertIcon} onClick={handleMenuOpen} />

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
            <MenuItem onClick={handleMenuClose} disabled>
               <ListItemIcon>
                  <PlayArrowIcon fontSize="small" />
               </ListItemIcon>
               Start All
            </MenuItem>

            <MenuItem onClick={handleMenuClose} disabled>
               <ListItemIcon>
                  <StopIcon fontSize="small" />
               </ListItemIcon>
               Stop All
            </MenuItem>

            {isDemo && <MenuItem onClick={() => setDemoDepositModal(true)}>
               <ListItemIcon>
                  <AttachMoneyIcon fontSize="small" />
               </ListItemIcon>
               Demo Deposit
            </MenuItem>}

            <Divider />

            <MenuItem onClick={() => setExchangeModal(true)}>
               <ListItemIcon>
                  <CurrencyExchangeIcon fontSize="small" />
               </ListItemIcon>
               Binance API
            </MenuItem>

            <Divider />

            <MenuItem onClick={() => setEditMasterModal(true)}>
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

            <MenuItem onClick={() => setDeleteConfirmDialog(true)}>
               <ListItemIcon>
                  <DeleteForeverIcon color="error" fontSize="small" />
               </ListItemIcon>
               Delete Master
            </MenuItem>
         </Menu>

         <DemoDepositModal open={demoDepositModal} setOpen={setDemoDepositModal} master={master} />
         <ExchangeModal open={exchangeModal} setOpen={setExchangeModal} />
         <CreateMasterModal editMode={true} open={editMasterModal} setOpen={setEditMasterModal} master={master} />

         <DeleteMasterConfirmDialog
            master={master}
            open={deleteConfirmDialog}
            setOpen={setDeleteConfirmDialog}
         />
      </>
   );
}
