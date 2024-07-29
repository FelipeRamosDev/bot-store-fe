import './EdgeLight.scss';

export default function EdgeLight({ label = '', size = '1rem', side = 'left', color = 'disabled', className = '', ...props }) {
   const style = {
      position: 'absolute'
   };

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
