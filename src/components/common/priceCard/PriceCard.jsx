import './PriceCard.scss';
import Card from '@/components/common/card/Card';

/**
 * `PriceCard` is a component that displays a card with a price indicator.
 * The card can have different border colors based on the value passed.
 *
 * @param {Object} props - The props object.
 * @param {boolean} [props.noColor=false] - Whether to disable the color coding based on the value.
 * @param {string} [props.className=''] - Additional CSS classes to apply to the card.
 * @param {string} [props.borderSide='left'] - The side of the card where the border should be applied (e.g., 'left', 'right').
 * @param {number|string} [props.value] - The value to determine the border color. The border color will be 'success' for positive values, 'error' for negative values, and 'disabled' otherwise.
 * @param {React.ReactNode} [props.children] - The content to display inside the card.
 *
 * @returns {JSX.Element} The rendered `Card` component with appropriate styling.
 */
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
