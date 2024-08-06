import './PNLTile.scss';
import Card from '@/components/common/card/Card';
import Percent from '@/components/displays/percent/Percent';
import Price from '@/components/displays/price/Price';

export default function PNLTile({ type = 'money', borderSide, label, value, fractional, size, props }) {
   let borderColor;
   let numberValue = Number(value);

   if (numberValue > 0) {
      borderColor = 'success';
   } else {
      borderColor = 'error';
   }

   return (
      <Card
         className="pnl-tile"
         border-color={borderColor}
         border-side={borderSide}
         padding="s"
         radius="s"
         elevation={30}
         {...props}
      >
         {label && <label>{label}</label>}

         {type === 'money' && <Price amount={value} size={size} fractional={fractional} />}
         {type === 'percent' && <Percent value={value} size={size} fractional={fractional} />}
      </Card>
   );
}
