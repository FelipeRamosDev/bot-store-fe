'use client';
import { useContext } from 'react';
import DBQueryContext from '@/contexts/DBQuery';
import Card from '@/components/common/card/Card';
import CheckButtonGroupInput from '@/components/inputs/checkButtonGroupInput/CheckButtonGroupInput';
import ContainedTable from '@/components/tables/containedTable/ContainedTable';
import APIContext from '@/contexts/4HandsAPI';

export default function BotDetailsHeader() {
   const { doc = {} } = useContext(DBQueryContext);
   const API = useContext(APIContext);

   async function handleStatusChange({ target: { value }}) {
      try {
         const changed = await API.ajax.authPost('/bot/status-transition', {
            botUID: doc._id,
            newStatus: value
         });

         if (changed.error) {
            throw changed;
         }
      } catch (err) {
         throw err;
      }
   }

   return <div className="page-header">
      <div className="cover"></div>

      <div className="bot-info">
         <div className="full-container">
            <div className="avatar"></div>

            <div className="summary">
               <h1 className="title">{doc.name}</h1>
               <p className="brief">{doc.description}</p>
            </div>

            <Card className="infos" padding="s" elevation={40}>
               {doc.status && <CheckButtonGroupInput
                  onChange={handleStatusChange}
                  schema={{
                     key: 'status',
                     defaultValue: doc.status,
                     options: [
                        { label: 'Draft', value: 'draft' },
                        { label: 'Private', value: 'private' },
                        { label: 'Public', value: 'public' }
                     ]
                  }}
               />}

               <ContainedTable
                  tableData={[
                     { label: 'ID', value: doc.cod },
                     { label: 'Created At', value: new Date(doc.createdAt).toLocaleString() },
                     { label: 'Modified At', value: new Date(doc.modifiedAt).toLocaleString() },
                  ]}
               />
            </Card>
         </div>
      </div>
   </div>;
}
