import DBQueryContext from "@/contexts/DBQuery";
import { useContext } from "react";
import TableBase from "../tableBase/TableBase";
import { useRouter } from "next/navigation";

export default function UsersTable() {
   const { query = [], isLoading, limit, reloadLimit, goPage } = useContext(DBQueryContext);
   const router = useRouter();
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
         onClickRow={(doc) => {
            if (doc?.index) {
               router.push(`/admin?user=${doc.index}`);
            }
         }}
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
            {
               propKey: 'billingAddress.city',
               label: 'City',
               format: (_, values) => values?.billingAddress?.city || '---',
            },
            {
               propKey: 'billingAddress.state',
               label: 'State',
               format: (_, values) => values?.billingAddress?.state || '---',
            },
            {
               propKey: 'billingAddress.country',
               label: 'Country',
               format: (_, values) => values?.billingAddress?.country || '---',
            },
         ]}
      />
   );
}

