import './WalletGrid.scss';
import PNLTile from '@/components/tiles/pnlTile/PNLTile';

export default function WalletGrid({ master = {} }) {
   return <div className="wallet-grid" padding="s" elevation={25}>
      <PNLTile
         borderSide="left"
         label="Acumulated PNL"
         size="l"
         value={master.pnl}
      />

      <PNLTile
         borderSide="left"
         label="Unrealized PNL"
         size="l"
         value={master.futuresWallet?.totalUnrealizedProfit}
      />

      <PNLTile
         borderSide="left"
         label="Realized PNL"
         size="l"
         value={master.futuresWallet?.totalRealizedPnl}
      />

      <PNLTile
         borderSide="bottom"
         label="Total Wallet"
         size="l"
         noColor={true}
         value={master.futuresWallet?.totalWalletBalance}
      />
   </div>
}
