import { parseClassName } from '@/helpers/parser';
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';

export default function FloatButton({
   className,
   label,
   marginTop,
   marginLeft,
   marginRight,
   marginBottom,
   styleProps,
   iconSize,
   position = 'bottom-right',
   screenMargin = '2rem',
   variant = 'extended',
   ...props
}) {
   const style = { ...styleProps };

   switch (position) {
      case 'top-left':
         style.top = marginTop || screenMargin;
         style.left = marginLeft || screenMargin;
         break;
      case 'bottom-left':
         style.bottom = marginBottom || screenMargin;
         style.left = marginLeft || screenMargin;
         break;
      case 'top-right':
         style.top = marginTop || screenMargin;
         style.right = marginRight || screenMargin;
         break;
      case 'bottom-right':
         style.bottom = marginBottom || screenMargin;
         style.right = marginRight || screenMargin;
         break;
   }

   return (
      <Fab
         className={parseClassName(className, [ 'float-button' ])}
         sx={style}
         variant={variant}
         {...props}
      >
         <AddIcon className="icon" fontSize={iconSize} />
         {label}
      </Fab>
   );
}
