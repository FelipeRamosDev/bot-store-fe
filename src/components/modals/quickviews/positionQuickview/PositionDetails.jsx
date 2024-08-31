import Card from "@/components/common/card/Card";
import ContainedTable from "@/components/tables/containedTable/ContainedTable";

/**
 * PositionDetails Component
 * 
 * This component renders detailed information about a specific trading position within a card. The details include the position ID, 
 * open time, and close time (if available). The information is displayed in a contained table format.
 * 
 * @param {Object} props - The component props.
 * @param {Object} [props.position={}] - An object representing the position data, which includes cod (ID), openTime, and closeTime.
 * @param {Object} [props] - Additional props passed to the Card component.
 * 
 * @returns {JSX.Element} The rendered PositionDetails component.
 */
export default function PositionDetails({ position = {}, ...props }) {
   return (
      <Card padding="xs" radius="s" elevation={10} {...props}>
         <ContainedTable
            tableData={[
               { label: 'ID', value: position.cod },
               { label: 'Open Time', value: new Date(position.openTime).toLocaleString() },
               { label: 'Close Time', value: position.closeTime && new Date(position.closeTime).toLocaleString(), hide: !position.closeTime },
            ]}
         />
      </Card>
   );
}

