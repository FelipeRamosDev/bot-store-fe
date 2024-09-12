import { useContext, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Add from '@mui/icons-material/Add';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import APIContext from '@/contexts/4HandsAPI';
import DBQueryContext from '@/contexts/DBQuery';

export default function AddBotRuleMenu({ parentBlock = {} }) {
   const [ anchorEl, setAnchorEl ] = useState(null);
   const API = useContext(APIContext);
   const { doc } = useContext(DBQueryContext);
   const open = Boolean(anchorEl);

   const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
   };

   async function createBlockRule(type) {
      if (!doc?._id || !parentBlock._id) {
         throw new Error('The bot UID or the parent block UID is missing!');
      }

      try {
         const created = await API.ajax.authPut('/bot/add-block-rule', {
            type,
            botUID: doc._id,
            parentBlockUID: parentBlock._id
         });

         if (created.error) {
            throw created;
         }

         if (created.success) {
            handleMenuClose();
         }
      } catch (err) {
         throw err;
      }
   }

   return (
      <>
         <RoundIconButton Icon={Add} variant="contained" color="tertiary" onClick={handleMenuOpen} />

         <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
         >
            <MenuItem onClick={() => createBlockRule('rules')}>
               <ListItemIcon>
                  <Add fontSize="small" />
               </ListItemIcon>
               Add Evaluation Rule
            </MenuItem>

            <MenuItem onClick={() => createBlockRule('blocks')}>
               <ListItemIcon>
                  <Add fontSize="small" />
               </ListItemIcon>
               Add Block
            </MenuItem>
         </Menu>
      </>
   );
}
