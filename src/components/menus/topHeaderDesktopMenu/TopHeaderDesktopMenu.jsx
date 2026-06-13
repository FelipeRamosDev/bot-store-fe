import Link from 'next/link';
import AccountMenu from './accountMenu/AccountMenu';
import { AccountBalanceWallet, Dashboard, Monitor, Workspaces, PriceChange } from '@mui/icons-material';
import StoreIcon from '@mui/icons-material/Store';
import CTAButton from '@/components/buttons/ctaButton/CTAButton';
import { useId, useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';

/**
 * TopHeaderDesktopMenu component renders a desktop navigation menu with links
 * and an account menu. The menu includes a link to the dashboard and 
 * a dropdown for account-related actions.
 *
 * @param {object} props - The component properties.
 * @param {function} props.setSpinner - Callback function to display a loading spinner, passed down to the AccountMenu component.
 * 
 * @returns {JSX.Element} The rendered top header desktop navigation menu.
 */
export default function TopHeaderDesktopMenu({ setSpinner, type, user }) {
   const id = useId();
   const menuId = `${id}-menu`;
   const buttonId = `${id}-button`;
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   const router = useRouter();

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };


   return (
      <nav className="desktop-menu">
         {type === 'public' && <>
            <Link href="/how-it-works" onMouseEnter={handleClick}>
               <Workspaces />
               How It Works
            </Link>
            <Link href="/pricing">
               <PriceChange />
               Pricing
            </Link>
            <Link className="no-underline" href="/dashboard/">
               <CTAButton url="/dashboard" startIcon={<Dashboard />}>
                  Start
               </CTAButton>
            </Link>

            <Menu
               id={menuId}
               anchorEl={anchorEl}
               open={open}
               onClose={handleClose}
               slotProps={{
                  list: { 'aria-labelledby': buttonId },
               }}
            >
               <MenuItem onClick={() => router.push('/how-it-works/what-is-candlepilot')}>What is CandlePilot</MenuItem>
               <MenuItem onClick={() => router.push('/how-it-works/wallets')}>Wallets</MenuItem>
               <MenuItem onClick={() => router.push('/how-it-works/slots')}>Slots</MenuItem>
               <MenuItem onClick={() => router.push('/how-it-works/positions')}>Positions</MenuItem>
               <MenuItem onClick={() => router.push('/how-it-works/pilots')}>Pilots</MenuItem>
            </Menu>
         </>}

         {type === 'admin' && <>
            <Link href="/admin">
               <Monitor />
               Painel
            </Link>
            <Link className="no-underline" href="/dashboard/">
               <CTAButton startIcon={<Dashboard />}>
                  Dashboard
               </CTAButton>
            </Link>
         </>}

         {type === 'dashboard' && <>
            <Link href="/dashboard">
               <Dashboard />
               Dashboard
            </Link>
            <Link href="/dashboard/master-accounts">
               <AccountBalanceWallet />
               Master Accounts
            </Link>
            <Link className="no-underline" href="/dashboard/bots/pilot-store">
               <CTAButton startIcon={<StoreIcon />}>
                  Pilot Store
               </CTAButton>
            </Link>
         </>}

         {type !== 'public' && <AccountMenu setSpinner={setSpinner} user={user} />}
      </nav>
   );
}
