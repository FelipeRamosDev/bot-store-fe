import SlotResultsGrid from '@/components/grids/slotResultsGrid/SlotResultsGrid';
import AccountSettings from '@/components/shared/accountSettings/AccountSettings';
import SlotQuickviewDetails from './SlotQuickviewDetails';

export default function SlotQuickviewSidebar({ slot = {} }) {
   return <>
      <SlotResultsGrid slot={slot} />
      <SlotQuickviewDetails slot={slot} />
      <AccountSettings account={slot} />
   </>;
}
