import Link from 'next/link';
import AccountMenu from '../dropdown/accountMenu/AccountMenu';
import { AccountBalanceWallet, Dashboard } from '@mui/icons-material';
import StoreIcon from '@mui/icons-material/Store';

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
export default function TopHeaderDesktopMenu({ setSpinner }) {
   return (
      <nav className="desktop-menu">
         <Link href="/dashboard">
            <Dashboard />
            Dashboard
         </Link>
         <Link href="/dashboard/bots/pilot-store">
            <StoreIcon />
            Pilot Store
         </Link>
         <Link href="/dashboard/master-accounts">
            <AccountBalanceWallet />
            Master Accounts
         </Link>

         <AccountMenu setSpinner={setSpinner} />
      </nav>
   );
}
