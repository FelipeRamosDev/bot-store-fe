import RubberButton from "@/components/buttons/rubberButton/RubberButton";
import StatusBadge from "@/components/common/statusBedge/StatusBadge";
import DBQueryContext from "@/contexts/DBQuery";
import { CheckCircle, KeyboardArrowDown, RadioButtonUnchecked } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useContext, useState } from "react";

export default function MyPilotsStatusFilter() {
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   const { setFilter } = useContext(DBQueryContext);
   const [ filterState, setFilterState ] = useState({ draft: true, private: true, public: true });

   const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
   };

   const handleFilterChange = (status) => {
      const newState = { ...filterState, [status]: !filterState[status] };
      const activeStatuses = Object.keys(newState).filter(key => newState[key]);

      setFilterState(newState);
      setFilter({
         status: {
            $in: activeStatuses.length ? activeStatuses : ['__NO_STATUS_SELECTED__']
         }
      });
   };

   return (
      <div className="my-pilots-status-filter">
         <RubberButton endIcon={<KeyboardArrowDown />} variant="contained" onClick={handleMenuOpen}>
            Status
         </RubberButton>

         <Menu
            open={open}
            anchorEl={anchorEl}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
         >
            <MenuItem onClick={() => handleFilterChange('draft')}>
               <ListItemIcon>
                  {filterState.draft ? <CheckCircle fontSize="small" /> : <RadioButtonUnchecked fontSize="small" />}
               </ListItemIcon>
               <StatusBadge color="secondary">Draft</StatusBadge>
            </MenuItem>
            <MenuItem onClick={() => handleFilterChange('private')}>
               <ListItemIcon>
                  {filterState.private ? <CheckCircle fontSize="small" /> : <RadioButtonUnchecked fontSize="small" />}
               </ListItemIcon>
               <StatusBadge color="primary">Private</StatusBadge>
            </MenuItem>
            <MenuItem onClick={() => handleFilterChange('public')}>
               <ListItemIcon>
                  {filterState.public ? <CheckCircle fontSize="small" /> : <RadioButtonUnchecked fontSize="small" />}
               </ListItemIcon>
               <StatusBadge color="success">Public</StatusBadge>
            </MenuItem>
         </Menu>
      </div>
   );
}
