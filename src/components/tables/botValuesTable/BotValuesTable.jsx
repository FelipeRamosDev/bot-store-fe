import { useContext, useState } from "react";
import TableBase from "../tableBase/TableBase";
import DBQueryContext from "@/contexts/DBQuery";
import StatusBadge from "@/components/common/statusBedge/StatusBadge";
import Price from "@/components/displays/price/Price";
import { parseCSS } from "@/helpers/parser";
import BotValueQuickview from "@/components/modals/quickviews/botValueQuickview/BotValueQuickview";

export default function BotValuesTable({ className, values = [] }) {
   const { isLoading } = useContext(DBQueryContext);
   const [selectedValue, setSelectedValue] = useState(null);

   const handleRowClick = (item) => {
      setSelectedValue(item);
   }

   return (<>
      <BotValueQuickview botValue={selectedValue} onClose={() => setSelectedValue(null)} />
      <TableBase
         className={parseCSS('bot-values-table', className)}
         usePagination
         items={values}
         loading={isLoading}
         noDocumentsText="No values found for this pilot."
         itemsPerPage={10}
         onClickRow={handleRowClick}
         headerConfigs={[
            {
               propKey: 'cod',
               label: 'COD',
               align: 'left'
            },
            {
               propKey: 'valueType',
               label: 'Value Type',
               align: 'left',
               format: (value) => {
                  switch (value) {
                     case 'function':
                        return <StatusBadge color="secondary">DYNAMIC</StatusBadge>;
                     case 'primitive':
                        return <StatusBadge color="primary">PRIMITIVE</StatusBadge>;
                     default:
                        return value;
                  }
               }
            },
            {
               propKey: 'functionName',
               label: 'Dynamic Method',
               align: 'left',
               format: (_, item) => {
                  if (item.valueType !== 'function') {
                     return '-';
                  }

                  return item.functionUID?.title || '-';
               }
            },
            {
               propKey: 'primitive',
               label: 'Primitive',
               align: 'left',
               format: (_, item) => {
                  if (item.valueType !== 'primitive') {
                     return '-';
                  }

                  if (item.primitiveType === 'string') {
                     return item.primitiveValue || '-';
                  }

                  if (item.primitiveType === 'number') {
                     const numberValue = Number(item.primitiveValue);

                     if (isNaN(numberValue)) {
                        return '-';
                     }

                     return <Price amount={numberValue} noSymbol fontSize="1.2rem" forceColor="info" />;
                  }

                  if (item.primitiveType === 'boolean') {
                     return <StatusBadge color={item.primitiveValue ? 'success' : 'error'}>{item.primitiveValue ? 'TRUE' : 'FALSE'}</StatusBadge>;
                  }

                  return '-';
               }
            }
         ]}
      />
   </>);
}
