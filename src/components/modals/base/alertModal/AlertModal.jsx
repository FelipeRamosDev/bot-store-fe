import { LoadingButton } from '@mui/lab';
import './AlertModal.scss';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertModal({ confirmLabel = 'CONFIRM', isConfirmation = false, loading = false, className = '', open = false, onClose = () => {}, handleOk, title = '', children, ...props }) {
   let okAction = onClose;

   if (typeof handleOk === 'function') {
      okAction = handleOk;
   }

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
            {!isConfirmation && <Button color="primary-light" onClick={okAction} autoFocus>
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
