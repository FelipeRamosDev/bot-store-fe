import DBQueryContext from "@/contexts/DBQuery";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import TableBase from "../tableBase/TableBase";
import EdgeLight from "@/components/common/edgeLight/EdgeLight";

export default function PlansTable() {
   const { query = [], isLoading, limit, reloadLimit, goPage } = useContext(DBQueryContext);
   const router = useRouter();
   let parsedLimit = limit;

   const titleStyle = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' };

   if (limit) {
      parsedLimit = limit - 1;
   }

   return (
      <TableBase
         pagination={{}}
         items={query}
         loading={isLoading}
         onClickRow={(doc) => {
            if (doc?.index) {
               router.push(`/admin?plan=${doc.index}`);
            }
         }}
         usePagination={true}
         itemsPerPage={parsedLimit}
         onPageNav={goPage}
         onRowsPerPageChange={reloadLimit}
         headerConfigs={[
            {
               propKey: 'name',
               label: 'Name',
               style: {
                  paddingLeft: '2rem',
                  minWidth: '130px',
               },
               format: (value, item) => {
                  return (<>
                     <EdgeLight colorValue={1} />

                     <p style={titleStyle}>
                        {value}
                     </p>
                  </>);
               }
            },
            {
               propKey: 'productId',
               label: 'Product ID',
               style: {
                  minWidth: '130px',
               },
            },
            {
               propKey: 'summary',
               label: 'Summary',
               style: {
                  minWidth: '130px',
               },
            }
         ]}
      />
   );
}
