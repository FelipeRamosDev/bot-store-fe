'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import Link from 'next/link';

export default function TopNav() {
   const router = useRouter();

   return <nav>
      <Link href="/how-it-works">How It Works</Link>
      <Link href="/open-store">Open Store</Link>
      <Link href="/earn-commission">Earn Commissions</Link>

      <Button variant="contained" color="tertiary" onClick={() => router.push('/dashboard')}>
         Dashboard
      </Button>
   </nav>;
}
