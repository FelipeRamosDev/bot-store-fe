import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { parseClassName } from '@/helpers/parser';

/**
 * A customizable Speed Dial button component with configurable position, edge distance,
 * and actions. Displays a floating button with actions that can be expanded upon interaction.
 * 
 * @param {Object} props - Component's properties.
 * @param {string} props.className - Additional class names to style the Speed Dial button.
 * @param {Array} props.options - Array of action objects for the Speed Dial. Each action should 
 *                          include `tooltipTitle` and `Icon` properties.
 * @param {'top-left'|'bottom-left'|'top-right'|'bottom-right'} [props.position='bottom-right'] - The position of the Speed Dial button on the screen.
 *                          Options include: 'top-left', 'bottom-left', 'top-right', 'bottom-right'.
 * @param {'top'|'left'|'right'|'bottom'} [props.direction='up'] - The direction the menu options.
 *                          Options include: 'up', 'left', 'right', 'down'.
 * @param {number} [props.edgeDistance=20] - Distance of the button from the edges of the screen, 
 *                                     depending on the chosen position.
 * @param {string} [props.ariaLabel='Speed Dial Button'] - Accessibility label for the Speed Dial button.
 * 
 * @returns {JSX.Element} Rendered Speed Dial button with specified actions and styles.
 */
export default function SpeedDialButton({
   className,
   options,
   position = 'bottom-right',
   direction = 'up',
   color = 'tertiary',
   edgeDistance = 20,
   ariaLabel = 'Speed Dial Button',
   ...props
}) {
   const style = {};

   switch (position) {
      case 'top-left':
         style.top = edgeDistance;
         style.left = edgeDistance;
         break;
      case 'bottom-left':
         style.bottom = edgeDistance;
         style.left = edgeDistance;
         break;
      case 'top-right':
         style.top = edgeDistance;
         style.right = edgeDistance;
         break;
      case 'bottom-right':
         style.bottom = edgeDistance;
         style.right = edgeDistance;
         break;
   }

   return (
      <SpeedDial
         className={parseClassName(className, [ 'speed-dial-button', position ])}
         FabProps={{ color }}
         icon={<SpeedDialIcon />}
         ariaLabel={ariaLabel}
         direction={direction}
         sx={style}
         {...props}
      >
         {options.map((action) => (
            <SpeedDialAction
               PopperProps={{ color }}
               sx={{ color }}
               key={action.tooltipTitle}
               icon={action.Icon}
               color={color}
               tooltipTitle={action.tooltipTitle}
               tooltipOpen
               onClick={action.onClick}
            />
         ))}
      </SpeedDial>
   );
}
