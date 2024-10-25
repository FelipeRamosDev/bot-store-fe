/**
 * `Card` is a customizable container component that supports various styling options, such as padding, border radius, elevation, and shadow color.
 * It is designed to be used as a card-like element in user interfaces.
 *
 * @param {Object} props - The props object.
 * @param {string} [props.className=''] - Additional CSS classes to apply to the card.
 * @param {number|'xs'|'s'|'m'|'l'|'xl'} [props.padding] - Padding size for the card. If specified, can be a predefined size like 's', 'm', 'l', etc.
 * @param {'xs'|'s'|'m'|'l'|'xl'} [props.radius='m'] - The border radius for the card. Can be a predefined size like 's', 'm', 'l', etc.
 * @param {number} [props.elevation=20] - The elevation of the card, which affects the shadow size. Higher values increase the shadow intensity.
 * @param {string} [props.shadowColor='#111111DD'] - The color of the shadow applied to the card.
 * @param {React.ReactNode} [props.children] - The content to be displayed inside the card.
 * @param {Object} [props] - Additional props to be applied to the card's outer `<div>`.
 *
 * @returns {JSX.Element} The rendered `Card` component.
 */
export default function Card({
   prevRef,
   className = '',
   padding,
   radius = 'm',
   elevation = 20,
   shadowColor = '#111111DD',
   children,
   style,
   ...props
}) {
   let customPad = '';

   if (padding) {
      customPad = 'p-' + padding;
   }

   return <div
      ref={prevRef}
      className={`${className} card ${customPad} r-${radius}`}
      style={{
         boxShadow: elevation ? `0 0 ${elevation}px ${shadowColor}` : 'none',
         ...style
      }}
      {...props}
   >
      {children}
   </div>;
}
