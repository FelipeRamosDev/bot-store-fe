'use client';
import { useContext } from 'react';
import { handleStatusChange } from './BotDetails.helper';
import Card from '@/components/common/card/Card';
import CheckButtonGroupInput from '@/components/inputs/checkButtonGroupInput/CheckButtonGroupInput';
import ContainedTable from '@/components/tables/containedTable/ContainedTable';
import APIContext from '@/contexts/4HandsAPI';
import BotResultsGrid from '@/components/grids/botResultsGrid/BotResultsGrid';

export default function BotInfos({ bot }) {
   const API = useContext(APIContext);

   return (
      <Card className="infos" padding="s" elevation={40}>
         {bot.status && <CheckButtonGroupInput
            onChange={(ev) => handleStatusChange(ev, API, bot)}
            schema={{
               key: 'status',
               defaultValue: bot.status,
               options: [
                  { label: 'Draft', value: 'draft' },
                  { label: 'Private', value: 'private' },
                  { label: 'Public', value: 'public' }
               ]
            }}
         />}

         <ContainedTable
            tableData={[
               { label: 'ID', value: bot.cod },
               { label: 'Created At', value: new Date(bot.createdAt).toLocaleString() },
               { label: 'Modified At', value: new Date(bot.modifiedAt).toLocaleString() },
            ]}
         />

         <BotResultsGrid bot={bot} />
      </Card>
   );
}
