import Card from "@/components/common/card/Card";
import ContainedTable from "@/components/tables/containedTable/ContainedTable";

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

