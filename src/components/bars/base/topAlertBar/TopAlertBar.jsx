import './TopAlertBar.scss';
import { Button } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

export default function TopAlertBar({ className = '', show = false, actionLabel = 'Confirm', action, close = () => {}, children }) {
   if (!show) {
      return <></>;
   }

   return <div className={`top-alert-bar ${className}`}>
      <div className="message">
         <ReportProblemIcon fontSize="small" />
         <p>{children}</p>
      </div>

      {action && <div className="action-button">
         <Button
            variant="text"
            color="secondary"
            onClick={action}
         >{actionLabel}</Button>
      </div>}

      <div className="close-button">
         <Button
            variant="text"
            color="secondary"
            onClick={close}
         >Close</Button>
      </div>
   </div>
}
