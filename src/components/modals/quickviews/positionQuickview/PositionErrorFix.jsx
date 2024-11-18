import { parseClassName } from '@/helpers/parser';
import { Button } from '@mui/material';
import HandymanIcon from '@mui/icons-material/Handyman';
import ErrorIcon from '@mui/icons-material/Error';
import FixPositionForm from '@/components/forms/fixPositionForm/FixPositionForm';
import { useState } from 'react';
import { Close } from '@mui/icons-material';

export default function PositionErrorFix({ position, className, error, buttonLabel = 'Fix' }) {
   const [ expanded, setExpanded ] = useState(false);

   return (
      <div className={parseClassName(className, [ 'position-error' ])}>
         <div className="header">
            <ErrorIcon fontSize="medium" />
            <span>{error?.message}</span>

            <Button
               className="action-button"
               color="rubber"
               variant="contained"
               startIcon={!expanded ? <HandymanIcon color="error" /> : <Close />}
               onClick={() => setExpanded(prev => !prev)}
            >
               {!expanded ? buttonLabel : 'Close'}
            </Button>
         </div>

         {expanded && <div className="fix-form">
            <FixPositionForm position={position} error={error} closeModal={() => setExpanded(false)} />
         </div>}
      </div>
   );
}
