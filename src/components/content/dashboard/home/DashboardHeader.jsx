import ContentModal from '@/components/modals/base/contentModal/ContentModal';
import CreateMasterForm from '@/components/forms/createMasterForm/CreateMasterForm';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import AddIcon from '@mui/icons-material/Add';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

/**
 * DashboardHeader component provides the header functionality for the dashboard.
 * 
 * It includes a toolbar with a button to create a new master account and a modal 
 * that contains a form for creating a master account. The modal visibility is controlled 
 * by the `createMasterModal` state.
 * 
 * @param {Object} props - The component's props.
 * @param {boolean} props.createMasterModal - A boolean that controls the visibility of the modal.
 * @param {Function} props.setCreateMasterModal - A function to toggle the `createMasterModal` state.
 * 
 * @returns {JSX.Element} The rendered header with toolbar and modal.
 */
export default function DashboardHeader({ createMasterModal, setCreateMasterModal, setSidebarState }) {
   return <>
      {/* Toolbar with Create Master Button */}
      <div className="toolbar">
         <RoundIconButton
            variant="contained"
            Icon={AddIcon}
            size="medium"
            color="tertiary"
            title="Create a new master account"
            onClick={() => setCreateMasterModal(true)}
         />

         <RoundIconButton
            className="toggle-sidebar"
            Icon={MenuOpenIcon}
            size="medium"
            title="Toggle Sidebar"
            onClick={() => setSidebarState(true)}
         />
      </div>

      {/* Modal for Creating a Master Account */}
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
