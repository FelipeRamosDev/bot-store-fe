import { useRouter } from 'next/navigation';
import { useEffect, useState, useContext } from 'react';
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { AccountCircle, CurrencyExchange, Logout } from '@mui/icons-material';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import ExchangeModal from '@/components/modals/exchangeModal/ExchangeModal';
import APIContext from '@/contexts/4HandsAPI';

export default function AccountMenu({ setSpinner = () => {} }) {
   const [ anchorEl, setAnchorEl ] = useState(null);
   const [ nameLetters, setNameLetters ] = useState('');
   const [ exchangeModal, setExchangeModal ] = useState(false);
   const instance = useContext(APIContext);
   const router = useRouter();

   const avatarStyle = { fontSize: '1rem', width: 32, height: 32 };
   const open = Boolean(anchorEl);

   const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
   };

   async function signOut() {
      setSpinner('Signing Out');

      try {
         await instance.auth.signOut();
         router.push('/');
      } catch (error) {
         setSpinner(false);
         throw error;
      }
   }

   useEffect(() => {
      const letters = localStorage.getItem('userLetters');
      setNameLetters(letters);
   }, []);

   return (
      <>
         <RoundIconButton
            Icon={() => <Avatar sx={avatarStyle}>{nameLetters}</Avatar>}
            onClick={handleMenuOpen}
         />

         <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
         >
            <MenuItem onClick={handleMenuClose}>
               <ListItemIcon>
                  <AccountCircle />
               </ListItemIcon>
               My Profile
            </MenuItem>
            
            <MenuItem onClick={() => setExchangeModal(true)}>
               <ListItemIcon>
                  <CurrencyExchange fontSize="small" />
               </ListItemIcon>
               Exchange API
            </MenuItem>

            <Divider />

            <MenuItem onClick={signOut}>
               <ListItemIcon>
                  <Logout color="error" />
               </ListItemIcon>
               Signout
            </MenuItem>
         </Menu>

         <ExchangeModal open={exchangeModal} setOpen={setExchangeModal} />
      </>
   );
}
