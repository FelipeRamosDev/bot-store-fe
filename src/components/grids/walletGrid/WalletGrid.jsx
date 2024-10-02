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
   const commonProps = {
      size: 'l',
      borderSide: 'left'
   };

   return <div className="wallet-grid pnl-grid" padding="s" elevation={25}>
      <PNLTile
         {...commonProps}
         label="Acumulated PNL"
         value={master.pnl}
      />

      <PNLTile
         {...commonProps}
         label="Unrealized PNL"
         value={master.futuresWallet?.totalUnrealizedProfit}
      />

      <PNLTile
         {...commonProps}
         label="Realized PNL"
         value={master.futuresWallet?.totalRealizedPnl}
      />

      <PNLTile
         label="Total Wallet"
         borderSide="bottom"
         size="l"
         noColor={true}
         value={master.futuresWallet?.totalWalletBalance}
      />
   </div>
}
