
import Logo from '@/components/common/logo/Logo';
import TopNavAuth from './TopNavAuth';
import Link from 'next/link';

export default function TopHeaderAuth({ type = 'public', fullContainer = true }) {
   return <header className="top-header auth-header">
      <div className={fullContainer ? 'full-container' : 'container'}>
         <Link className="logo-wrap" href="/">
            <Logo width={40} height={40} />
            <span className="logotype">Candle<span className="grad-txt">Pilot</span></span>
         </Link>

         <TopNavAuth />
      </div>
   </header>
}
