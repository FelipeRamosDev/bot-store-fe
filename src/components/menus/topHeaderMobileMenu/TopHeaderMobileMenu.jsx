'use client';
import CTAButton from '@/components/buttons/ctaButton/CTAButton';
import DrawerMenu from '@/components/menus/base/drawerMenu/DrawerMenu';
import { AccountBalanceWallet, Storefront, Dashboard, Logout } from '@mui/icons-material';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Button } from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AccountMenuMobile from './accountMenu/AccountMenuMobile';
import { useRouter } from 'next/navigation';

/**
 * TopHeaderMobileMenu component renders a mobile navigation menu with links to
 * various sections and a sign-out option. It uses a drawer for the menu and handles
 * signing out via the API context.
 *
 * @param {object} props - The component properties.
 * @param {boolean} props.open - Determines whether the drawer menu is open or closed.
 * @param {function} props.setOpen - A function to toggle the drawer menu open/close state.
 * @param {function} props.setSpinner - A function to display a loading spinner during sign-out.
 * 
 * @returns {JSX.Element} The rendered mobile navigation menu inside a drawer.
 */
export default function TopHeaderMobileMenu({ setSpinner }) {
   const router = useRouter();
   const [ open, setOpen ] = useState(false);

   return (
      <nav className="mobile-menu">
         <Button className="menu-button" color="info" onClick={() => setOpen(true)}>
            <MenuIcon />
         </Button>

         <DrawerMenu fitContent={true} open={open} setOpen={setOpen}>
            <CTAButton className="menu-cta" onClick={() => router.push('/dashboard/bots/pilot-store')}>
               <Storefront />
               Go To Store
            </CTAButton>

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

               <AccountMenuMobile setSpinner={setSpinner} />
            </List>
         </DrawerMenu>
      </nav>
   );
}
