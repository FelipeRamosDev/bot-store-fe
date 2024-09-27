/**
 * Determines the color class based on the number value.
 *
 * @param {number} number - The number to determine the color class.
 * @returns {string} The color class ('success', 'error', 'disabled').
 * @throws {string} Throws an error if the input is not a number.
 */
function numberColor(number) {
   if (typeof number !== 'number') {
      throw 'The "number" param should be a valid number!';
   }

   if (number > 0) {
      return 'success';
   }

   if (number < 0) {
      return 'error';
   }

   if (number === 0) {
      return 'disabled';
   }
}

/**
 * `EdgeLight` is a component that displays a colored edge on one side of its container.
 * The color can be determined based on a numeric value and the edge can be positioned on any side.
 *
 * @param {Object} props - The props object.
 * @param {string} [props.label=''] - The label text to display inside the edge light.
 * @param {string} [props.size='1.1rem'] - The size of the edge light, used for its width or height.
 * @param {string} [props.side='left'] - The side of the container where the edge light should be displayed ('left', 'top', 'right', 'bottom').
 * @param {number} [props.colorValue] - A number used to determine the color class ('success', 'error', 'disabled').
 * @param {string} [props.color='disabled'] - The color class to apply if `colorValue` is not provided.
 * @param {string} [props.className=''] - Additional CSS classes to apply to the edge light.
 * @param {React.HTMLProps<HTMLSpanElement>} [props... ] - Other props to pass to the `span` element.
 *
 * @returns {JSX.Element} The rendered `span` element with edge light styling.
 */
export default function EdgeLight({ label = '', size = '1.1rem', side = 'left', colorValue, color = 'disabled', className = '', ...props }) {
   const style = {
      position: 'absolute'
   };

   if (colorValue) {
      color = numberColor(colorValue);
   }

   switch (side) {
      case 'left':
         style.left = '0';
         style.top = '0';
         style.bottom = '0';
         style.width = label ? size : '0.5rem';
         break;
      case 'top':
         style.top = '0';
         style.left = '0';
         style.right = '0';
         style.height = label ? size : '0.5rem';
         break;
      case 'right':
         style.right = '0';
         style.top = '0';
         style.bottom = '0';
         style.width = label ? size : '0.5rem';
         break;
      case 'bottom':
         style.bottom = '0';
         style.left = '0';
         style.right = '0';
         style.height = label ? size : '0.5rem';
         break;
   }

   return <span
      className={`edge-light ${className}`}
      color={color}
      style={style}
      {...props}
   >
      <label>{label}</label>
   </span>;
}
