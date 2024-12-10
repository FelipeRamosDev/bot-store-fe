import AlertModal from '../../base/alertModal/AlertModal';

export default function SlotRunningAlert({ open, setOpen = () => {}}) {
   return (
      <AlertModal
         title="Slot Running"
         open={open}
         onClose={() => setOpen(false)}
      >
         <p style={{ marginBottom: 0 }}>You can not edit the slot without have it stopped!</p>
      </AlertModal>
   );
}
