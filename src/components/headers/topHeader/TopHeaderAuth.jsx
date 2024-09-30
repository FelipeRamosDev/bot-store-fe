
import Logo from '@/components/common/Logo';
import TopNavAuth from './TopNavAuth';
import Link from 'next/link';

export default function TopHeaderAuth({ type = 'public', fullContainer = true }) {
   return <header className="top-header">
      <div className={fullContainer ? 'full-container' : 'container'}>
         <Link href="/">
            <Logo />
         </Link>

         <TopNavAuth />
      </div>
   </header>
}
