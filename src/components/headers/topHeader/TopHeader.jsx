import Logo from '@/components/common/Logo';
import TopNavPublic from './TopNavPublic';
import TopNavAuth from './TopNavAuth';
import Link from 'next/link';

export default function TopHeader({ type = 'public', fullContainer = true }) {
   return <header>
      <div className={fullContainer ? 'full-container' : 'container'}>
         <Link href="/">
            <Logo />
         </Link>

         {type === 'public' && <TopNavPublic />}
         {type === 'auth' && <TopNavAuth />}
      </div>
   </header>
}
