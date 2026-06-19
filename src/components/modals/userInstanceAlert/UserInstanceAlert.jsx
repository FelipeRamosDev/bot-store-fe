import { useState } from 'react';
import AlertModal from '../base/alertModal/AlertModal';

/**
 * A modal alert for when the user instance is offline.
 *
 * @param {Object} props - The properties to customize the user instance alert.
 * @param {boolean} props.alertState - Indicates whether the alert modal is open or closed.
 * @param {function} props.setAlertState - Function to control the alert modal's open state.
 *
 * @returns {React.Element} The rendered alert modal for user instance status.
 */
export default function UserInstanceAlert({ alertState, setAlertState }) {
   return (
      <AlertModal
         title="User Instance Offline"
         confirmLabel="OK"
         open={alertState}
         onClose={() => setAlertState(false)}
         handleOk={() => setAlertState(false)}
      >
         You need to start your user instance before using the slots!
      </AlertModal>
   );
}
