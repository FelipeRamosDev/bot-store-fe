import Logo from '@/components/common/Logo';
import TopNav from './TopNav';
import Link from 'next/link';

export default function TopHeader({ fullContainer = true }) {
   return <header>
      <div className={fullContainer ? 'full-container' : 'container'}>
         <Link href="/">
            <Logo />
         </Link>

         <TopNav />
      </div>
   </header>
}
