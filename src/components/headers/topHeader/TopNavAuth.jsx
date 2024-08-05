'use client';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import APIContext from '@/contexts/4HandsAPI';
import PageSpinner from '@/components/load/pageSpinner/PageSpinner';
import Link from 'next/link';
import CTAButton from '@/components/buttons/ctaButton/CTAButton';

export default function TopNavAuth() {
   const instance = useContext(APIContext);
   const [ spinner, setSpinner ] = useState(false);
   const router = useRouter();

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

   return <nav>
      <PageSpinner spinner={spinner} />

      <Link href="/dashboard/my-bots">My Bots</Link>
      <Link href="/dashboard/master-accounts">Master Accounts</Link>
      <Link href="/slots">Slots</Link>
      <Link href="/positions">Positions</Link>

      <CTAButton size="large" onClick={signOut}>
         SIGNOUT
      </CTAButton>
   </nav>;
}
