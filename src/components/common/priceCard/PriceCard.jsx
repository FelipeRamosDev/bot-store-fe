import './PriceCard.scss';
import Card from '@/components/common/card/Card';

export default function PriceCard({ noColor = false, className = '', borderSide = 'left', value, children, ...props }) {
   let borderColor;
   let numberValue = Number(value);

   if (!noColor && numberValue > 0) {
      borderColor = 'success';
   } else if (!noColor && numberValue < 0) {
      borderColor = 'error';
   } else {
      borderColor = 'disabled';
   }

   return (
      <Card
         className={`price-card ${className}`}
         border-color={borderColor}
         border-side={borderSide}
         {...props}
      >
         {children}
      </Card>
   );
}
