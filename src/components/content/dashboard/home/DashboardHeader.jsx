import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Button } from '@mui/material';

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
export default function DashboardHeader({ setSidebarState }) {
   return <>
      <div className="toolbar">
         <Button
            className="toggle-sidebar"
            endIcon={<MenuOpenIcon />}
            color="info"
            title="Toggle Sidebar"
            onClick={() => setSidebarState(true)}
         >Sidebar</Button>
      </div>
   </>;
}
