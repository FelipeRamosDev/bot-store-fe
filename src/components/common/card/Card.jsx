import './Card.scss';

export default function Card({
   className = '',
   padding,
   radius = 'm',
   elevation = 20,
   shadowColor = '#111111DD',
   children,
   ...props
}) {
   let customPad = '';

   if (padding) {
      customPad = 'p-' + padding;
   }

   return <div
      className={`${className} card ${customPad} r-${radius}`}
      style={{
         boxShadow: elevation ? `0 0 ${elevation}px ${shadowColor}` : 'none'
      }}
      {...props}
   >
      {children}
   </div>;
}
