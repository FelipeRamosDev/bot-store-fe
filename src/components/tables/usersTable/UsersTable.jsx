import DBQueryContext from "@/contexts/DBQuery";
import { useContext } from "react";
import TableBase from "../tableBase/TableBase";

export default function UsersTable() {
   const { query = [], isLoading, limit, reloadLimit, goPage } = useContext(DBQueryContext);
   let parsedLimit = limit;

   if (limit) {
      parsedLimit = limit - 1;
   }

   return (
      <TableBase
         pagination={{}}
         items={query}
         loading={isLoading}
         usePagination={true}
         itemsPerPage={parsedLimit}
         onPageNav={goPage}
         onRowsPerPageChange={reloadLimit}
         headerConfigs={[
            {
               propKey: 'fullName',
               label: 'Full Name',
               style: {
                  minWidth: '130px',
               },
            },
            {
               propKey: 'email',
               label: 'Email',
            },
            {
               propKey: 'phone',
               label: 'Phone',
            },
         ]}
      />
   );
}

