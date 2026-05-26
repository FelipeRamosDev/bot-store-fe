import DBQueryContext from "@/contexts/DBQuery";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext } from "react";
import TableBase from "../tableBase/TableBase";

export default function PricesTable() {
   const { query = [], isLoading, limit, reloadLimit, goPage } = useContext(DBQueryContext);
   const router = useRouter();
   const searchParams = useSearchParams();
   let parsedLimit = limit;

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
               const params = new URLSearchParams(searchParams);
               params.set("price", doc.index);
               router.push(`?${params.toString()}`);
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
                  minWidth: '130px',
               },
            },
            {
               propKey: 'priceId',
               label: 'Price ID',
               style: {
                  minWidth: '130px',
               },
            },
            {
               propKey: 'price',
               label: 'Price',
               style: {
                  minWidth: '130px',
               },
            },
            {
               propKey: 'type',
               label: 'Type',
               style: {
                  minWidth: '130px',
               },
            },
            {
               propKey: 'interval',
               label: 'Interval',
               style: {
                  minWidth: '130px',
               },
            },
         ]}
      />
   );
}
