import Logo from '@/components/common/Logo';
import TopNavPublic from './TopNavPublic';
import TopNavAuth from './TopNavAuth';
import Link from 'next/link';

/**
 * TopHeader component renders the top section of the page, including a logo and navigation based on the type.
 *
 * The component can render either a public or authenticated navigation menu based on the `type` prop.
 * It also includes a logo that links to the home page.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.type='public'] - Determines the type of navigation menu to display. Can be 'public' or 'auth'.
 * @param {boolean} [props.fullContainer=true] - Determines if the container should span the full width of the page.
 *
 * @example
 * import React from 'react';
 * import TopHeader from './TopHeader';
 * 
 * function MyPage() {
 *   return (
 *     <TopHeader type="auth" fullContainer={false} />
 *   );
 * }
 * 
 * @returns {JSX.Element} A header element containing the logo and the appropriate navigation menu.
 */
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
