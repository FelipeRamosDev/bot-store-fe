'use client';
import { useState } from 'react';
import PageSpinner from '@/components/load/pageSpinner/PageSpinner';
import TopHeaderMobileMenu from '@/components/menus/topHeaderMobileMenu/TopHeaderMobileMenu';
import TopHeaderDesktopMenu from '@/components/menus/topHeaderDesktopMenu/TopHeaderDesktopMenu';

/**
 * TopNavAuth component renders the navigation menu for authenticated users.
 *
 * This component includes links to various user dashboard sections and a sign-out button.
 * When the sign-out button is clicked, a spinner is displayed while the user is being signed out.
 *
 * @component
 * @example
 * import React from 'react';
 * import TopNavAuth from './TopNavAuth';
 * 
 * function AuthenticatedPage() {
 *   return <TopNavAuth />;
 * }
 * 
 * @returns {JSX.Element} A navigation element containing links and a sign-out button.
 */
export default function TopNavAuth() {
   const [ spinner, setSpinner ] = useState(false);

   return (<>
      <PageSpinner spinner={spinner} />
      <TopHeaderDesktopMenu setSpinner={setSpinner} />
      <TopHeaderMobileMenu setSpinner={setSpinner} />
   </>);
}
