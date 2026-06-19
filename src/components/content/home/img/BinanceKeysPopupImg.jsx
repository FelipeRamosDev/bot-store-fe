'use client';
import { useEffect, useRef } from 'react';
import Card from '@/components/common/card/Card';
import LockIcon from '@mui/icons-material/Lock';
import { isElementOnScreen } from '@/helpers/scroll';

export default function BinanceKeysPopupImg({ className = '' }) {
   const cardElm = useRef();

   function handleScroll() {
      if (!cardElm.current) return;
      const isAnimated = cardElm.current.classList.contains('animated');
      const isOnScreen = isElementOnScreen(cardElm, 0.6);

      if (!isAnimated && isOnScreen) {
         cardElm.current.classList.add('animated');
      } else if (isAnimated && !isOnScreen) {
         cardElm.current.classList.remove('animated');
      }
   }

   useEffect(() => {
      window.removeEventListener('scroll', handleScroll);
      window.addEventListener('scroll', handleScroll);
   }, []);

   return (
      <Card
         prevRef={cardElm}
         className={`binance-keys-popup ${className}`}
         radius="m"
         elevation={40}
      >
         <div className="card-header">
            <LockIcon className="lock-icon" />
            <span className="header-title">Binance Keys</span>
         </div>

         <div className="input-wraps">
            <div className="dummy-input">
               <label>API Key</label>
               <span className="key">UnuE8zjxxiFbnuExiFohfggnuy3fSogSucT0UdyxiFbsxiF9QwL6</span>
            </div>

            <div className="dummy-input">
               <label>Secret Key</label>
               <span className="key">by3SWrF9QwUnuExiFogSuczjx4DQxixiFL6T0UdyT0UdybWb8</span>
            </div>
         </div>
      </Card>
   );
}
