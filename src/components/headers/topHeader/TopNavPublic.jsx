'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CTAButton from '@/components/common/ctaButton/CTAButton';

export default function TopNav() {
   const router = useRouter();

   return <nav>
      <Link href="/how-it-works">How It Works</Link>
      <Link href="/store">Store</Link>
      <Link href="/pricing">Pricing</Link>
      <Link href="/earn-commission">Earn Commissions</Link>

      <CTAButton size="large" onClick={() => router.push('/dashboard/login')}>
         START
      </CTAButton>
   </nav>;
}
