'use client';
import { useState } from 'react';
import Add from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import CreateBotModal from '@/components/modals/createBotModal/CreateBotModal';

export default function CreateBotFloatButton() {
   const [ createModal, setCreateModal ] = useState(false);

   return (<>
      <Fab
         className="create-pilot-button desktop"
         variant="extended"
         color="tertiary"
         onClick={() => setCreateModal(true)}
      >
         <Add sx={{ mr: 1 }} />
         Create Pilot
      </Fab>

      <Fab
         className="create-pilot-button mobile"
         size="small"
         color="tertiary"
      >
         <Add />
      </Fab>

      <CreateBotModal open={createModal} setModal={setCreateModal} />   
   </>);
}
