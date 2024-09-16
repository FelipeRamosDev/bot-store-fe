import { useContext, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import BotValueModal from '@/components/modals/botValueModal/BotValueModal';
import DeleteBotValueConfirmDialog from '@/components/modals/deleteBotValueConfirmDialog/DeleteBotValueConfirmDialog';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import APIContext from '@/contexts/4HandsAPI';
import DBQueryContext from '@/contexts/DBQuery';

/**
 * BotValuesMenu renders a menu for managing bot values, with options to edit, clone, unlink, or delete a bot value.
 * It interacts with the API to handle cloning and unlinking values from a parent thread or rule.
 * 
 * @component
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.botValue - The bot value object being managed.
 * @param {Object} props.parentThread - The parent thread object, if any.
 * @param {Object} props.parentRule - The parent rule object, if any.
 * 
 * @returns {JSX.Element} The BotValuesMenu component.
 */
export default function BotValuesMenu({ botValue = {}, parentThread, parentRule }) {
   const [ anchorEl, setAnchorEl ] = useState(null);
   const [ modal, setModal ] = useState(false);
   const [ deleteModal, setDeleteModal ] = useState(false);
   const API = useContext(APIContext);
   const { doc } = useContext(DBQueryContext);
   const open = Boolean(anchorEl);

   const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
   };

   /**
    * Clones the current bot value by sending a request to the backend API.
    * 
    * @throws {Error} If the cloning request fails.
    */
   async function handleClone() {
      try {
         const cloned = await API.ajax.authPut('/bot/clone', {
            botUID: doc._id,
            valueUID: botValue._id
         });

         if (cloned.error) {
            throw cloned;
         }
      } catch (err) {
         throw err;
      }
   }

   /**
    * Unlinks the current bot value from its parent thread or rule.
    * 
    * @throws {Error} If the unlink request fails.
    */
   async function handleUnlink() {
      let unlinkFrom = '';

      if (parentThread) {
         unlinkFrom = 'thread';
      }

      if (parentRule) {
         unlinkFrom = 'rule';
      }

      try {
         const unlinked = await API.ajax.authPost('/bot/unlink-value', {
            botUID: doc?._id,
            valueUID: botValue?._id,
            threadUID: parentThread?._id,
            ruleUID: parentRule?._id,
            unlinkFrom
         });

         if (unlinked.error) {
            throw unlinked;
         }
      } catch (err) {
         throw err;
      }
   }

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

            <MenuItem onClick={handleClone}>
               <ListItemIcon>
                  <FileCopyIcon fontSize="small" />
               </ListItemIcon>
               Clone
            </MenuItem>

            <MenuItem onClick={handleUnlink}>
               <ListItemIcon>
                  <LinkOffIcon fontSize="small" />
               </ListItemIcon>
               Unlink
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
