'use client';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import Price from '@/components/displays/price/Price';
import TableBase from '@/components/tables/tableBase/TableBase';
import DBQueryContext from '@/contexts/DBQuery';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import Add from '@mui/icons-material/Add';
import CreateBotModal from '@/components/modals/createBotModal/CreateBotModal';
import { SmartToy } from '@mui/icons-material';

/**
 * A table component displaying a list of recent bots along with their scores.
 * The component fetches bot data from a context and displays it in a table format.
 * @param {Object} props
 * @param {string} props.title - The header title.
 *
 * @returns {React.Element} The rendered table of recent bots.
 */
export default function BotsTable({ title = 'Bots' }) {
   const { query = [], isLoading, limit, goPage, reloadLimit } = useContext(DBQueryContext);
   const [ createBotModal, setCreateBotModal ] = useState(false);
   const nav = useRouter();
   const bots = query;
   let parsedLimit = limit;

   if (limit) {
      parsedLimit = limit -1;
   }

   return <div className="bots-table">
      <ContentHeader
         Toolbar={() => <RoundIconButton Icon={Add} color="tertiary" variant="contained" onClick={() => setCreateBotModal(true)} />}
      >
         <SmartToy /> <h3 className="header-title">{title}</h3>
      </ContentHeader>

      <TableBase
         items={bots}
         pagination={{}}
         loading={isLoading}
         onClickRow={(doc) => nav.push(`/dashboard/bots/${doc.index}`)}
         useSeeMorePage={true}
         itemsPerPage={parsedLimit}
         onPageNav={goPage}
         onRowsPerPageChange={reloadLimit}
         headerConfigs={[
            {
               label: 'Bot',
               propKey: 'name',
               style: { minWidth: '10rem' },
               format: (value) => {
                  return value;
               }
            },
            {
               label: 'SCORE',
               propKey: 'score',
               align: 'center',
               style: { minWidth: '5rem' },
               format: (value) => {
                  return <Price size="xl" amount={1450} noSymbol={true} fractional={0} />
               }
            }
         ]}
      />

      <CreateBotModal open={createBotModal} setModal={setCreateBotModal} />
   </div>
}
