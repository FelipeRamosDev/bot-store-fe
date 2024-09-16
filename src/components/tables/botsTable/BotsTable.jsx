'use client';

import './BotsTable.scss';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import Price from '@/components/displays/price/Price';
import TableBase from '@/components/tables/tableBase/TableBase';
import DBQueryContext from '@/contexts/DBQuery';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import Add from '@mui/icons-material/Add';
import CreateBotModal from '@/components/modals/createBotModal/CreateBotModal';

/**
 * A table component displaying a list of recent bots along with their scores.
 * The component fetches bot data from a context and displays it in a table format.
 * @param {Object} props
 * @param {string} props.title - The header title.
 *
 * @returns {React.Element} The rendered table of recent bots.
 */
export default function BotsTable({ title = 'Bots' }) {
   const { query = [], isLoading } = useContext(DBQueryContext);
   const [ createBotModal, setCreateBotModal ] = useState(false);
   const nav = useRouter();
   const bots = query;

   return <div className="bots-table">
      <ContentHeader
         Toolbar={() => <RoundIconButton Icon={Add} color="tertiary" variant="contained" onClick={() => setCreateBotModal(true)} />}
      >
         <h3 className="header-title">{title}</h3>
      </ContentHeader>

      <TableBase
         items={bots}
         pagination={{}}
         loading={isLoading}
         onClickRow={(doc) => nav.push(`/dashboard/bots/${doc.index}`)}
         headerConfigs={[
            {
               label: 'Bot',
               propKey: 'name',
               style: { width: '10rem' },
               format: (value) => {
                  return value;
               }
            },
            {
               label: 'Summary',
               propKey: 'description'
            },
            {
               label: 'SCORE',
               propKey: 'score',
               align: 'right',
               format: (value) => {
                  return <Price amount={value} noSymbol={true} fractional={0} />
               }
            }
         ]}
      />

      <CreateBotModal open={createBotModal} setModal={setCreateBotModal} />
   </div>
}
