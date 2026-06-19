import Card from '@/components/common/card/Card';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import ContainedTable from '@/components/tables/containedTable/ContainedTable';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';

/**
 * SlotQuickviewDetails Component
 * 
 * This component renders a detailed view of a slot's information within a card. It includes metadata such as creation and 
 * modification dates, slot ID, type, status, associated symbol, and interval. The information is displayed in a contained 
 * table format, with badges used for the type and status.
 * 
 * @param {Object} props - The component props.
 * @param {Object} [props.slot={}] - An object representing the slot data, which includes assets, createdAt, modifiedAt, cod, 
 *                                   type, status, and interval.
 * 
 * @returns {JSX.Element} The rendered SlotQuickviewDetails component.
 */
export default function SlotQuickviewDetails({ slot = {} }) {
   const symbol = slot.assets.length ? slot.assets[0] : '';

   return <Card padding="xs" radius="s" elevation={30}>
      <ContentHeader>
         <DisplaySettingsIcon /> <h3 className="card-title">Details</h3>
      </ContentHeader>

      <ContainedTable
         tableData={[
            { label: 'Created At', value: new Date(slot.createdAt).toLocaleString() },
            { label: 'Modified At', value: new Date(slot.modifiedAt).toLocaleString() },
            { label: 'ID', value: slot.cod },
            { label: 'Type', value: <StatusBadge type="account-type">{slot.type}</StatusBadge> },
            { label: 'Status', value: <StatusBadge type="slot-status">{slot.status}</StatusBadge> },
            { label: 'Symbol', value: symbol },
            { label: 'Interval', value: slot.interval },
         ]}
      />
   </Card>;
}
