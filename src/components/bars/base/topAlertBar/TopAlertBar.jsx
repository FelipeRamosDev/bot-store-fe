import './TopAlertBar.scss';
import { Button } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

/**
 * `TopAlertBar` is a component that displays an alert bar at the top of the page.
 * It shows an alert message with an optional action button and a close button.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className=''] - Additional CSS classes to apply to the alert bar.
 * @param {boolean} [props.show=false] - Determines whether the alert bar is visible.
 * @param {string} [props.actionLabel='Confirm'] - The label for the action button.
 * @param {Function} [props.action] - The callback function to be called when the action button is clicked.
 * @param {Function} [props.close=() => {}] - The callback function to be called when the close button is clicked.
 * @param {React.ReactNode} [props.children] - The content to display inside the alert message.
 * 
 * @returns {JSX.Element} The rendered `TopAlertBar` component.
 */
export default function TopAlertBar({ className = '', show = false, actionLabel = 'Confirm', action, close = () => {}, children }) {
   if (!show) {
      return <></>;
   }

   return (
      <div className={`top-alert-bar ${className}`}>
         <div className="message">
            <ReportProblemIcon fontSize="small" />
            <p>{children}</p>
         </div>

         {action && (
            <div className="action-button">
               <Button
                  variant="text"
                  color="secondary"
                  onClick={action}
               >
                  {actionLabel}
               </Button>
            </div>
         )}

         <div className="close-button">
            <Button
               variant="text"
               color="secondary"
               onClick={close}
            >
               Close
            </Button>
         </div>
      </div>
   );
}
