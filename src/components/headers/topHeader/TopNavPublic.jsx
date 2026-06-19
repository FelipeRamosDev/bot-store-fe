import CTAButton from '@/components/buttons/ctaButton/CTAButton';
import TopHeaderDesktopMenu from '@/components/menus/topHeaderDesktopMenu/TopHeaderDesktopMenu';
import TopHeaderMobileMenu from '@/components/menus/topHeaderMobileMenu/TopHeaderMobileMenu';
import { useState } from 'react';

/**
 * TopNav component renders the navigation menu for public users.
 *
 * This component includes links to various public sections of the site and a call-to-action button.
 * The "START" button redirects the user to the dashboard.
 *
 * @component
 * @example
 * import React from 'react';
 * import TopNav from './TopNav';
 * 
 * function PublicPage() {
 *   return <TopNav />;
 * }
 * 
 * @returns {JSX.Element} A navigation element containing public links and a call-to-action button.
 */
export default function TopNav({ mobileOpen, setMobileOpen, type }) {
   const [ spinner, setSpinner ] = useState(false);

   return (
      <nav>
         <TopHeaderDesktopMenu type={type} setSpinner={setSpinner} />
         <TopHeaderMobileMenu type={type} open={mobileOpen} setOpen={setMobileOpen} setSpinner={setSpinner} />
      </nav>
   );
}
