import Card from '@/components/common/card/Card';
import LockIcon from '@mui/icons-material/Lock';

export default function BinanceKeysPopupImg({ className = '' }) {
   return (
      <Card
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
