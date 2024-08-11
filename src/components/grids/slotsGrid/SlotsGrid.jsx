import './SlotsGrid.scss';
import { useState, useContext } from 'react';
import { Add } from '@mui/icons-material';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import SlotTile from "@/components/tiles/slotTile/SlotTile";
import ContentModal from '@/components/modals/base/contentModal/ContentModal';
import CreateSlot from '@/components/forms/createSlotForm/CreateSlotForm';
import NoDocumentsTile from '@/components/tiles/noDocumentsTile/NoDocumentsTile';
import AuthUserContext from '@/contexts/AuthUser';
import { Skeleton } from '@mui/material';

export default function SlotsGrid({ slots = [], master = {}, className = '' }) {
   const [ createSlot, setCreateSlot ] = useState(false);
   const auth = useContext(AuthUserContext);
   const isLoading = (!auth || auth.isLoading);
   const masterType = master.type;
   let slotType;

   if (masterType === 'master-live') {
      slotType = 'slot-live';
   }

   if (masterType === 'master-demo') {
      slotType = 'slot-demo';
   }

   return <div className={`slots-grid ${className}`}>
      <ContentHeader Toolbar={() => (
         <RoundIconButton Icon={Add} variant="contained" color="tertiary" onClick={() => setCreateSlot(true)} />
      )}>
         <h2 className="header-title">Slots</h2>
      </ContentHeader>

      {isLoading && new Array(6).fill('').map(() => <Skeleton
         key={Math.random()}
         className="slot-tile"
         variant="rounded"
         height={170}
      />)}

      {!slots.length ? <NoDocumentsTile message="You have no slots created yet! Create one to start." onClick={() => setCreateSlot(true)} /> : ''}
      {slots.map(slot => (
         <SlotTile key={Math.random()} slot={slot} />
      ))}

      <ContentModal
         padding="m"
         size="x-large"
         title="Create Slot"
         open={createSlot}
         onClose={() => setCreateSlot(false)}
      >
         <CreateSlot defaultType={slotType} onSuccess={() => setCreateSlot(false)} master={master} />
      </ContentModal>
   </div>;
}
