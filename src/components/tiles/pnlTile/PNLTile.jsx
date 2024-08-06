import './PNLTile.scss';
import Card from '@/components/common/card/Card';
import Percent from '@/components/displays/percent/Percent';
import Price from '@/components/displays/price/Price';

export default function PNLTile({ type = 'money', noColor = false, borderSide, label, elevation = 20, value, fractional, size, props }) {
   let borderColor;
   let numberValue = Number(value);

   if (!noColor && numberValue > 0) {
      borderColor = 'success';
   } else if (!noColor && numberValue < 0) {
      borderColor = 'error';
   }

   return (
      <Card
         className="pnl-tile"
         border-color={borderColor}
         border-side={borderSide}
         padding="s"
         radius="s"
         elevation={elevation}
         {...props}
      >
         {label && <label>{label}</label>}

         {type === 'money' && <Price amount={value} size={size} fractional={fractional} />}
         {type === 'percent' && <Percent value={value} size={size} fractional={fractional} />}
      </Card>
   );
}
