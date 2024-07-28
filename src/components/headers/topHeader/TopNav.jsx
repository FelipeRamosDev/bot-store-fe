'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CTAButton from '@/components/common/CTAButton/CTAButton';

export default function TopNav() {
   const router = useRouter();

   return <nav>
      <Link href="/how-it-works">How It Works</Link>
      <Link href="/open-store">Open Store</Link>
      <Link href="/earn-commission">Earn Commissions</Link>

      <CTAButton size="large" onClick={() => router.push('/dashboard')}>
         START
      </CTAButton>
   </nav>;
}
