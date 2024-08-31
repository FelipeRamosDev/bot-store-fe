import './PNLTile.scss';
import Card from '@/components/common/card/Card';
import Percent from '@/components/displays/percent/Percent';
import Price from '@/components/displays/price/Price';

/**
 * A component that displays a tile with either a monetary value or a percentage.
 * 
 * This component is used to show performance metrics, such as profit and loss, with optional styling and formatting.
 * 
 * @param {Object} props - The props for the component.
 * @param {string} [props.type='money'] - The type of value to display, either 'money' or 'percent'.
 * @param {boolean} [props.noColor=false] - Whether to disable color styling for positive or negative values.
 * @param {string} [props.borderSide] - The side of the border to apply. Can be 'top', 'bottom', 'left', 'right'.
 * @param {string} [props.label] - An optional label to display above the value.
 * @param {number} [props.elevation=30] - The elevation of the card, controlling its shadow depth.
 * @param {number} [props.value] - The numeric value to display. Can be a monetary amount or a percentage.
 * @param {number} [props.fractional] - The number of decimal places to display for the value.
 * @param {string} [props.size] - The size of the text for the value.
 * 
 * @returns {React.Element} The rendered PNL tile component with the specified value and formatting.
 */
export default function PNLTile({ type = 'money', noColor = false, borderSide, label, elevation = 30, value, fractional, size, props }) {
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
         radius={window.innerWidth < 768 ? 'xs' : 's'}
         elevation={window.innerWidth < 768 ? elevation * 0.35 : elevation}
         {...props}
      >
         {label && <label>{label}</label>}

         {type === 'money' && <Price noColor={noColor} amount={value} size={size} fractional={fractional} />}
         {type === 'percent' && <Percent noColor={noColor} value={value} size={size} fractional={fractional} />}
      </Card>
   );
}
