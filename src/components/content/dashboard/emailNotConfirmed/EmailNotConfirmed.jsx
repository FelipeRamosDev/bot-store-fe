import Card from '@/components/common/card/Card';
import APIContext from '@/contexts/4HandsAPI';
import { LoadingButton } from '@mui/lab';
import { useContext, useState } from 'react';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';

export default function EmailNotConfirmed({ error, confirmationSent }) {
   const instance = useContext(APIContext);
   const [ loading, setLoading ] = useState(false);
   const [ isResent, setIsResent ] = useState(null);
   const userEmail = error?.userName || '';

   async function handleResendEmail() {
      setLoading(true);

      try {
         const resent = await instance.ajax.authPost('/auth/send-email-confirm', { userEmail });

         if (resent?.success) {
            setIsResent('success');
         } else {
            setIsResent('fail');
         }
      } catch (err) {
         setIsResent('fail');
         throw err;
      } finally {
         setLoading(false);
      }
   }

   const ConfirmationSent = () => {
      return <>
         <div className="title-wrap">
            <MarkEmailReadIcon className="icon" color="success" />
            <h1 className="card-title">Confirmation e-mail sent</h1>
         </div>

         <p>A confirmation e-mail was sent to <b>{userEmail}</b>! Didn&apos;t receive the email?</p>
      </>;
   }

   const NotConfirmed = () => {
      return <>
         <div className="title-wrap">
            <UnsubscribeIcon className="icon" color="error" />
            <h1 className="card-title">Email Not Confirmed</h1>
         </div>

         <p>Your email address has not been confirmed yet. Please check your inbox for a confirmation e-mail.</p>
         <p className="resend-message">Didn&apos;t receive the confirmation email sent to <b>{userEmail}</b>?</p>
      </>;
   }

   return <div className="email-not-confirmed">
      <Card className="info-card">
         {confirmationSent && <ConfirmationSent />}
         {!confirmationSent && <NotConfirmed />}
         
         {isResent === 'success' && (
            <div className="callback success">
               <p className="callback-text">
                  E-mail re-sent with success!
               </p>
            </div>
         )}

         {isResent === 'fail' && (
            <div className="callback fail">
               <p className="callback-text">
                  Something went wrong while re-sending the e-mail. Please try again in a few minutes.
               </p>
            </div>
         )}

         {!isResent && (
            <LoadingButton
               className="resent-button"
               fullWidth
               color="error"
               loading={loading}
               onClick={handleResendEmail}
            >Re-Send the confirmation e-mail</LoadingButton>
         )}
      </Card>
   </div>;
}