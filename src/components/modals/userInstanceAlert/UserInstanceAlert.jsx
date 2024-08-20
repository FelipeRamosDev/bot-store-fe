import { useState } from 'react';
import AlertModal from '../base/alertModal/AlertModal';


export default function UserInstanceAlert({ alertState, setAlertState }) {
   return <AlertModal
      title="User Instance Offline"
      confirmLabel="OK"
      open={alertState}
      onClose={() => setAlertState(false)}
      handleOk={() => setAlertState(false)}
   >
      You need to start your user instance before to use the slots!
   </AlertModal>
}
