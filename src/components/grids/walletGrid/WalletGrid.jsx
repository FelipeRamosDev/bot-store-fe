import PNLTile from '@/components/tiles/pnlTile/PNLTile';

/**
 * WalletGrid component displays a grid of wallet-related financial metrics.
 *
 * This component presents various metrics related to a wallet, including accumulated PNL (Profit and Loss), 
 * unrealized PNL, realized PNL, and total wallet balance. Each metric is displayed in a tile layout, with 
 * optional formatting based on the data type.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} [props.master={}] - The master entity containing wallet and PNL data.
 *
 * @example
 * const master = {
 *   pnl: 567.89,
 *   futuresWallet: {
 *     totalUnrealizedProfit: 123.45,
 *     totalRealizedPnl: 678.90,
 *     totalWalletBalance: 2345.67
 *   }
 * };
 *
 * return <WalletGrid master={master} />;
 *
 * @returns {JSX.Element} A grid layout displaying various wallet and PNL metrics.
 */
export default function WalletGrid({ master = {} }) {
   return <div className="wallet-grid pnl-grid" padding="s" elevation={25}>
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
