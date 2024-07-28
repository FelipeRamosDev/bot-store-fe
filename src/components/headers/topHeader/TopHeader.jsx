import Logo from '@/components/common/Logo';
import TopNav from './TopNav';
import Link from 'next/link';

export default function TopHeader() {
   return <header>
      <div className="container">
         <Link href="/">
            <Logo />
         </Link>

         <TopNav />
      </div>
   </header>
}
