import CTAButton from '@/components/buttons/ctaButton/CTAButton';
import DrawerMenu from '@/components/menus/base/drawerMenu/DrawerMenu';
import APIContext from '@/contexts/4HandsAPI';
import { AccountBalanceWallet, Storefront, Dashboard, Logout } from '@mui/icons-material';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

export default function TopHeaderMobileMenu({ open, setOpen, setSpinner }) {
   const router = useRouter();
   const API = useContext(APIContext);

   async function signOut() {
      setSpinner('Signing Out');

      try {
         await API.auth.signOut();
         router.push('/');
      } catch (error) {
         setSpinner(false);
         throw error;
      }
   }

   return (
      <nav className="mobile-menu">
         <DrawerMenu fitContent={true} open={open} setOpen={setOpen}>
            <List>
               <ListItem disablePadding>
                  <ListItemButton onClick={() => router.push('/dashboard')}>
                     <ListItemIcon>
                        <Dashboard />
                     </ListItemIcon>

                     <ListItemText primary="Dashboard" />
                  </ListItemButton>
               </ListItem>

               <ListItem disablePadding>
                  <ListItemButton onClick={() => router.push('/dashboard/master-accounts')}>
                     <ListItemIcon>
                        <AccountBalanceWallet />
                     </ListItemIcon>

                     <ListItemText primary="Master Accounts" />
                  </ListItemButton>
               </ListItem>

               <Divider />

               <ListItem disablePadding>
                  <ListItemButton onClick={signOut}>
                     <ListItemIcon>
                        <Logout />
                     </ListItemIcon>

                     <ListItemText primary="Sign-out" />
                  </ListItemButton>
               </ListItem>
            </List>

            <CTAButton className="menu-cta" onClick={() => router.push('/dashboard')}>
               <Storefront />
               Go To Store
            </CTAButton>
         </DrawerMenu>
      </nav>
   );
}
