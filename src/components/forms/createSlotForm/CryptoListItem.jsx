import Price from '@/components/displays/price/Price';
import Percent from '@/components/displays/percent/Percent';
import { ListItem } from '@mui/material';
import { shortNum } from '@/helpers/format';

export default function CryptoListItem({ option, itemProps }) {
   const forceColor = option.priceChangePercent >= 0 ? 'success' : 'error';
   const priceFractional = String(option.lastPrice).split('.')[1]?.length;
   const smallNumberStyle = { fontSize: '0.8rem' };

   const MinNotional = () => <Price amount={option.minNotional} noColor fontSize="0.8rem" fractional={0} />;
   const MaxLeverage = () => <span style={smallNumberStyle}>{option.maxLeverage}x</span>;
   const PriceColumn = () => (<>
      <Price amount={option.lastPrice} fractional={priceFractional} forceColor={forceColor} />
      <Percent value={option.priceChangePercent} forceColor={forceColor} prefix="(" posfix=")" size="xs" />
   </>);

   return (
      <ListItem value={option.value} {...itemProps} sx={{ gap: '1rem' }}>
         <div className="option-column" style={{ marginRight: 'auto' }}>
            <span className="symbol">{option.label}</span>

            <label>Min. Notional: <MinNotional /></label>
            <label>Max. Leverage: <MaxLeverage /></label>
         </div>

         <div className="option-column text-right">
            <label>Price / 24h %</label>
            <PriceColumn />
         </div>

         <div className="option-column text-center">
            <label>Volume 24h</label>
            <span>{shortNum(option.quoteVolume)}</span>
         </div>
      </ListItem>
   );
}
