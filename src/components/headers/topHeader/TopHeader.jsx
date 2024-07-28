import Logo from '@/components/common/Logo';
import TopNav from './TopNav';

export default function TopHeader() {
   return <header>
      <div className="container">
         <Logo />

         <TopNav />
      </div>
   </header>
}
