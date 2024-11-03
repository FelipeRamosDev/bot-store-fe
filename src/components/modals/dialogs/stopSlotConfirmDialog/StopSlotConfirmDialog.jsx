import ConfirmationDialog from '@/components/modals/dialogs/confirmationDialog/ConfirmationDialog';
import { stopSlot } from '@/components/tiles/slotTile/SlotTile.helper';

export default function StopSlotConfirmDialog({ slot = {}, open = false, setOpen = () => {}, API, disabled, setDisabled, setUiAlertState }) {
   const handleConfirm = async () => {
      try {
         await stopSlot(API, slot, disabled, setDisabled, setUiAlertState);
         setOpen(false);
      } catch (err) {
         throw err;
      }
   }

   return (
      <ConfirmationDialog
         title="Stop Confirm"
         open={open}
         handleConfirm={handleConfirm}
         onClose={() => setOpen(false)}
         confirmLabel="STOP"
      >
         <p style={{ marginBottom: 0 }}>{`Are you sure you want to stop the "${slot.name}" slot?`}</p>
      </ConfirmationDialog>
   );
}
