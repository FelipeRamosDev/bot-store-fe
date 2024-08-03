'use client';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import APIContext from '@/contexts/4HandsAPI';
import Link from 'next/link';
import CTAButton from '@/components/buttons/ctaButton/CTAButton';

export default function TopNav() {
   const instance = useContext(APIContext);
   const router = useRouter();

   async function signOut() {
      try {
         await instance.auth.signOut();
         router.push('/');
      } catch (error) {
         throw error;
      }
   }

   return <nav>
      <Link href="/dashboard/my-bots">My Bots</Link>
      <Link href="/dashboard/master-accounts">Master Accounts</Link>
      <Link href="/slots">Slots</Link>
      <Link href="/positions">Positions</Link>

      <CTAButton size="large" onClick={signOut}>
         SIGNOUT
      </CTAButton>
   </nav>;
}
