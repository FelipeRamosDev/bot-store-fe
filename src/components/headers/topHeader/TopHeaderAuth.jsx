
import Logo from '@/components/common/Logo';
import TopNavAuth from './TopNavAuth';
import Link from 'next/link';

export default function TopHeaderAuth({ type = 'public', fullContainer = true }) {
   return <header className="top-header">
      <div className={fullContainer ? 'full-container' : 'container'}>
         <Link className="logo-wrap" href="/">
            <Logo />
            <h1 className="logotype">Candle<span className="grad-txt">Pilot</span></h1>
         </Link>

         <TopNavAuth />
      </div>
   </header>
}
