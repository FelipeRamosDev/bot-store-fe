import './SlotsGrid.scss';
import { useState } from 'react';
import { Add } from '@mui/icons-material';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import SlotTile from "@/components/tiles/slotTile/SlotTile";
import ContentModal from '@/components/modals/contentModal/ContentModal';
import CreateSlot from '@/components/forms/createSlot/CreateSlot';

export default function SlotsGrid({ slots = [], masterType, className = '' }) {
   const [ createSlot, setCreateSlot ] = useState(false);
   let slotType;

   if (masterType === 'master-live') {
      slotType = 'slot-live';
   }

   if (masterType === 'master-demo') {
      slotType = 'slot-demo';
   }

   function handleCreateSlot(data) {
      console.log(data);
   }

   return <div className={[ 'slots-grid', className ]}>
      <ContentHeader>
         <h2 className="header-title">Slots</h2>

         <>
            <RoundIconButton Icon={Add} variant="contained" color="tertiary" onClick={() => setCreateSlot(true)} />
         </>
      </ContentHeader>

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
         <CreateSlot defaultType={slotType} onSubmit={handleCreateSlot} />
      </ContentModal>
   </div>;
}
