import { LoadingButton } from '@mui/lab';
import './AlertModal.scss';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

/**
 * A modal dialog component used for displaying alerts or confirmation prompts.
 *
 * @param {Object} props - The properties to customize the modal.
 * @param {string} [props.confirmLabel='CONFIRM'] - The label for the confirmation button. Used only if `isConfirmation` is true.
 * @param {boolean} [props.isConfirmation=false] - If true, the modal is rendered as a confirmation dialog with Cancel and Confirm buttons.
 * @param {boolean} [props.loading=false] - If true, shows a loading spinner on the confirmation button.
 * @param {string} [props.className=''] - Additional CSS class names for the modal.
 * @param {boolean} [props.open=false] - Controls the open state of the modal.
 * @param {function} [props.onClose=() => {}] - Callback function invoked when the modal is closed.
 * @param {function} [props.handleOk] - Callback function invoked when the OK or Confirm button is clicked. Overrides `onClose` if provided.
 * @param {string} [props.title=''] - Title of the modal dialog.
 * @param {React.ReactNode} [props.children] - Content to display inside the modal.
 * @param {Object} [props.props] - Additional props passed to the `Dialog` component.
 *
 * @returns {React.Element} The rendered modal dialog.
 */
export default function AlertModal({
   confirmLabel = 'CONFIRM',
   isConfirmation = false,
   loading = false,
   className = '',
   open = false,
   onClose = () => {},
   handleOk,
   title = '',
   children,
   ...props
}) {
   // Determine the action function for the OK/Confirm button
   const okAction = typeof handleOk === 'function' ? handleOk : onClose;

   return (
      <Dialog
         className={`alert-dialog ${className}`}
         onClose={onClose}
         open={open}
         {...props}
      >
         <DialogTitle>
            {title}
         </DialogTitle>

         <DialogContent>
            {children}
         </DialogContent>

         <DialogActions>
            {!isConfirmation && <Button color="info" onClick={okAction} autoFocus>
               OK
            </Button>}
            {isConfirmation && <Button color="info" onClick={onClose} autoFocus>
               CANCEL
            </Button>}
            {isConfirmation && <LoadingButton 
               autoFocus
               color="error"
               onClick={okAction}
               loading={loading}
            >
               {confirmLabel}
            </LoadingButton>}
         </DialogActions>
      </Dialog>
   );
}
