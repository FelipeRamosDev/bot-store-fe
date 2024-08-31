'use client';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import APIContext from '@/contexts/4HandsAPI';
import PageSpinner from '@/components/load/pageSpinner/PageSpinner';
import Link from 'next/link';
import CTAButton from '@/components/buttons/ctaButton/CTAButton';

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
   const instance = useContext(APIContext);
   const [spinner, setSpinner] = useState(false);
   const router = useRouter();

   /**
    * Signs out the user and redirects to the home page.
    *
    * Sets the spinner state to show a loading indicator while the sign-out process is in progress.
    * Upon successful sign-out, redirects the user to the home page.
    * If an error occurs, hides the spinner and throws the error.
    *
    * @async
    * @function
    * @returns {Promise<void>} A promise that resolves when the sign-out process is complete.
    */
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

   return (
      <nav>
         <PageSpinner spinner={spinner} />

         <Link href="/dashboard">Dashboard</Link>
         <Link href="/dashboard/my-bots">My Bots</Link>
         <Link href="/dashboard/master-accounts">Master Accounts</Link>
         <Link href="/slots">Slots</Link>
         <Link href="/positions">Positions</Link>

         <CTAButton size="large" onClick={signOut}>
            SIGNOUT
         </CTAButton>
      </nav>
   );
}
