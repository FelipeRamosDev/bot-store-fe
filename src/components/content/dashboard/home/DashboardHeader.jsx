import ContentModal from '@/components/modals/contentModal/ContentModal';
import CreateMasterForm from '@/components/forms/createMasterForm/CreateMasterForm';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import { Add } from '@mui/icons-material';

export default function DashboardHeader({ createMasterModal, setCreateMasterModal }) {
   return <>
      <div className="toolbar">
         <RoundIconButton
            variant="contained"
            Icon={Add}
            size="medium"
            color="tertiary"
            title="Create a new master account"
            onClick={() => setCreateMasterModal(true)}
         />
      </div>

      <ContentModal
         title="Create Master"
         padding="m"
         size="x-large"
         open={createMasterModal}
         onClose={() => setCreateMasterModal(false)}
      >
         <CreateMasterForm onSuccess={() => setCreateMasterModal(false)} />
      </ContentModal>
   </>;
}
