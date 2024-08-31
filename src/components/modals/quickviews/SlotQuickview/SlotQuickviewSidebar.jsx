import SlotResultsGrid from '@/components/grids/slotResultsGrid/SlotResultsGrid';
import AccountSettings from '@/components/shared/accountSettings/AccountSettings';
import SlotQuickviewDetails from './SlotQuickviewDetails';

/**
 * SlotQuickviewDetails Component
 * 
 * This component renders a detailed view of a slot's information within a card. It includes metadata such as creation and 
 * modification dates, slot ID, type, status, associated symbol, and interval. The information is displayed in a contained 
 * table format, with badges representing the type and status.
 * 
 * @param {Object} props - The component props.
 * @param {Object} [props.slot={}] - An object representing the slot data, which includes assets, createdAt, modifiedAt, cod, 
 *                                   type, status, and interval.
 * 
 * @returns {JSX.Element} The rendered SlotQuickviewDetails component.
 */
export default function SlotQuickviewSidebar({ slot = {} }) {
   return <>
      <SlotResultsGrid slot={slot} />
      <SlotQuickviewDetails slot={slot} />
      <AccountSettings account={slot} />
   </>;
}
