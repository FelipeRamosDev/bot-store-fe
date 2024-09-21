import Link from 'next/link';
import AccountMenu from '../dropdown/accountMenu/AccountMenu';

export default function TopHeaderDesktopMenu({ setSpinner }) {
   return (
      <nav className="desktop-menu">
         <Link href="/dashboard">Dashboard</Link>
         {/* <Link href="/dashboard/master-accounts">Master Accounts</Link> */}
         {/* <Link href="/slots">Slots</Link> */}
         {/* <Link href="/positions">Positions</Link> */}

         <AccountMenu setSpinner={setSpinner} />
      </nav>
   );
}
