'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CTAButton from '@/components/buttons/ctaButton/CTAButton';

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
export default function TopNav() {
   const router = useRouter();

   return (
      <nav>
         <Link href="/how-it-works">How It Works</Link>
         <Link href="/store">Store</Link>
         <Link href="/pricing">Pricing</Link>
         <Link href="/earn-commission">Earn Commissions</Link>

         <CTAButton size="large" onClick={() => router.push('/dashboard')}>
            START
         </CTAButton>
      </nav>
   );
}
