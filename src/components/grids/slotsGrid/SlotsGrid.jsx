import './SlotsGrid.scss';
import { useState, useContext, useMemo } from 'react';
import { Add } from '@mui/icons-material';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import SlotTile from "@/components/tiles/slotTile/SlotTile";
import ContentModal from '@/components/modals/base/contentModal/ContentModal';
import CreateSlot from '@/components/forms/createSlotForm/CreateSlotForm';
import NoDocumentsTile from '@/components/tiles/noDocumentsTile/NoDocumentsTile';
import AuthUserContext from '@/contexts/AuthUser';
import { Skeleton } from '@mui/material';
import { MenuProvider } from '@/contexts/MenuContext';
import SlotConfigsMenu from '@/components/menus/dropdown/SlotConfigsMenu/SlotConfigsMenu';

/**
 * SlotsGrid component displays a grid of slots associated with a master entity.
 *
 * This component provides a layout for displaying slots in a grid format. It includes options to 
 * create new slots, view existing slots, and handle various loading states. It also integrates 
 * modals for creating new slots and handling user interactions.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array} [props.slots=[]] - Array of slot objects to be displayed.
 * @param {Object} [props.master={}] - The master entity to which slots belong, used for determining slot type.
 * @param {string} [props.className=''] - Optional additional class names for styling.
 * @param {Object} [props.uInstance={}] - The user instance, used for slot-specific data.
 * @param {Function} [props.setEditSlotModal] - Function to set the edit slot modal state.
 * @param {Function} [props.setDeleteConfirmDialog] - Function to set the delete confirmation dialog state.
 *
 * @example
 * const slots = [
 *   { _id: '1', name: 'Slot 1', status: 'running' },
 *   { _id: '2', name: 'Slot 2', status: 'stopped' }
 * ];
 * const master = { type: 'master-live' };
 *
 * return <SlotsGrid slots={slots} master={master} />;
 *
 * @returns {JSX.Element} A grid layout displaying slots, with options to create and manage slots.
 */
export default function SlotsGrid({ slots = [], master = {}, className = '', uInstance, setEditSlotModal, setDeleteConfirmDialog }) {
   const defaultChartDisplay = window.localStorage.getItem('slot_configs:charts_display') === 'true' ? true : false;
   const [ createSlot, setCreateSlot ] = useState(false);
   const [ chartsDisplay, setChartsDisplay ] = useState(defaultChartDisplay);
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
      <ContentHeader Toolbar={() => (<>
         <RoundIconButton Icon={Add} variant="contained" color="tertiary" onClick={() => setCreateSlot(true)} />
      </>)}>
         <h2 className="header-title">Slots <SlotConfigsMenu chartsDisplay={chartsDisplay} setChartsDisplay={setChartsDisplay} /></h2>
      </ContentHeader>

      {isLoading && new Array(6).fill('').map(() => <Skeleton
         key={Math.random()}
         className="slot-tile"
         variant="rounded"
         height={170}
      />)}

      {!slots.length ? <NoDocumentsTile message="You have no slots created yet! Create one to start." onClick={() => setCreateSlot(true)} /> : ''}

      <MenuProvider>
         {slots.map(slot => (
            <SlotTile
               key={slot._id}
               slot={slot}
               uInstance={uInstance}
               setEditSlotModal={setEditSlotModal}
               setDeleteConfirmDialog={setDeleteConfirmDialog}
               chartsDisplay={chartsDisplay}
            />
         ))}
      </MenuProvider>

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
