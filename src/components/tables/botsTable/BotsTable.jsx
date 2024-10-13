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
import Percent from '@/components/displays/percent/Percent';

/**
 * A table component displaying a list of recent bots along with their scores.
 * The component fetches bot data from a context and displays it in a table format.
 * @param {Object} props
 * @param {string} props.title - The header title.
 *
 * @returns {React.Element} The rendered table of recent bots.
 */
export default function BotsTable({ title = 'Bots', hideHeader }) {
   const { query = [], isLoading, limit, goPage, reloadLimit } = useContext(DBQueryContext);
   const [ createBotModal, setCreateBotModal ] = useState(false);
   const nav = useRouter();
   const bots = query;
   let parsedLimit = limit;

   if (limit) {
      parsedLimit = limit -1;
   }

   return <div className="bots-table">
      {!hideHeader && <ContentHeader
         Toolbar={() => <RoundIconButton Icon={Add} color="tertiary" variant="contained" onClick={() => setCreateBotModal(true)} />}
      >
         <SmartToy /> <h3 className="header-title">{title}</h3>
      </ContentHeader>}

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
               label: 'WIN/LOSS Index',
               propKey: 'winLossIndex',
               align: 'center',
               style: { minWidth: '8rem' },
               format: (value, item) => <Price amount={item.currentResults?.winLossIndex || 0} noSymbol={true} noColor={true} size="m" />
            },
            {
               label: 'Accum. ROI (24h)',
               propKey: 'accumRoiDay',
               align: 'center',
               style: { minWidth: '8rem' },
               format: (value, item) => <Percent value={item.currentResults?.accumRoi24 || 0} dashedZero={true} />
            },
            {
               label: 'Accum. ROI (30d)',
               propKey: 'accumRoiMonth',
               align: 'center',
               style: { minWidth: '8rem' },
               format: (value, item) => <Percent value={item.currentResults?.accumRoiMonth || 0} dashedZero={true} />
            },
            {
               label: 'Pos. ROI (24h)',
               propKey: 'avgDayRoi',
               align: 'center',
               style: { minWidth: '8rem' },
               format: (value, item) => <Percent value={item.currentResults?.avgNotionalRoi24 || 0} dashedZero={true} />
            },
            {
               label: 'Pos. ROI (30d)',
               propKey: 'avgMonthRoi',
               align: 'center',
               style: { minWidth: '8rem' },
               format: (value, item) => <Percent value={item.currentResults?.avgNotionalRoiMonth || 0} dashedZero={true} />
            },
            {
               label: 'WINS/LOSES (24h)',
               propKey: 'winsLosesDay',
               align: 'center',
               style: { minWidth: '10rem' },
               format: (value, item) => {
                  return (<>
                     <Percent value={item.currentResults?.avgWinsRoi24 || 0} dashedZero={true} />
                     {' / '}
                     <Percent value={item.currentResults?.avgLosesRoi24 || 0} dashedZero={true} />
                  </>);
               }
            },
            {
               label: 'WINS/LOSES (30d)',
               propKey: 'winsLosesMonth',
               align: 'center',
               style: { minWidth: '10rem' },
               format: (value, item) => {
                  return (<>
                     <Percent value={item.currentResults?.avgWinsRoiMonth || 0} dashedZero={true} />
                     {' / '}
                     <Percent value={item.currentResults?.avgLosesRoiMonth || 0} dashedZero={true} />
                  </>);
               }
            },
            {
               label: 'WINS/LOSES Rate',
               propKey: 'winsLosesRate',
               align: 'center',
               style: { minWidth: '10rem' },
               format: (value, item) => {
                  return (<>
                     <Percent value={item.currentResults?.winsRate || 0} dashedZero={true} />
                     {' / '}
                     <Percent value={(item.currentResults?.losesRate || 0) * -1} dashedZero={true} />
                  </>);
               }
            }
         ]}
      />

      <CreateBotModal open={createBotModal} setModal={setCreateBotModal} />
   </div>
}
