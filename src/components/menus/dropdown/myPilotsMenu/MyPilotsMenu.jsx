import RoundIconButton from "@/components/buttons/roundButton/RoundIconButton";
import usePilot from "@/hooks/usePilot";
import { DataObject, MoreVert } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MyPilotsMenu() {
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   const { importJSON } = usePilot();
   const router = useRouter();

   const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
   };

   const handleImportJSON = () => {
      const fileInput = document.createElement('input');

      try {
         fileInput.type = 'file';
         fileInput.accept = 'application/json';

         fileInput.onchange = async (event) => {
            const file = event.target.files[0];

            if (file) {
               const reader = new FileReader();

               reader.onload = async (e) => {
                  const content = e.target.result;

                  try {
                     await importJSON(content);
                     router.refresh();
                  } catch (error) {
                     console.error('Error importing bot JSON:', error);
                  }
               };

               reader.readAsText(file);
            }
         };

         fileInput.click();
      } catch (error) {
         console.error('Error importing bot JSON:', error);
      }
   };

   return (<>
      <RoundIconButton
         className="my-pilots-menu-button"
         variant="contained"
         Icon={MoreVert}
         onClick={handleMenuOpen}
      />

      <Menu
         anchorEl={anchorEl}
         open={open}
         onClose={handleMenuClose}
         onClick={handleMenuClose}
         transformOrigin={{ horizontal: 'left', vertical: 'top' }}
         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
         <MenuItem onClick={handleImportJSON}>
            <ListItemIcon>
               <DataObject fontSize="small" />
            </ListItemIcon>
            Import JSON
         </MenuItem>
      </Menu>
   </>)
}
