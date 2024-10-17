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
import Percent from '@/components/displays/percent/Percent';
import LogoIconImg from '@/assets/icons/logo_icon_text.svg';
import Image from 'next/image';
import BotQuickview from '@/components/modals/quickviews/botQuickview/BotQuickview';
import ProfitRatioTip from '../../shared/bot/tooltips/ProfitRatioTooltip';
import DailyROITooltip from '../../shared/bot/tooltips/DailyROITooltip';
import AccumROITooltip from '../../shared/bot/tooltips/AccumROITooltip';
import WinLossROITooltip from './tooltips/WinLossROITooltip';
import PositionROIAvgTooltip from './tooltips/PositionROIAvgTooltip';
import WinLossCountTooltip from './tooltips/WinLossCountTooltip';

/**
 * A table component displaying a list of recent bots along with their scores.
 * The component fetches bot data from a context and displays it in a table format.
 * @param {Object} props
 * @param {string} props.title - The header title.
 * @param {boolean} props.hideHeader - if used it will hide the header.
 * @param {React.ReactDOM} props.HeaderContent - An custom header, provided as a ReactDOM component
 * @param {'link'|'modal'} props.onSelectAction - The type of action to perform when a row is clicked
 *
 * @returns {React.Element} The rendered table of recent bots.
 */
export default function BotsTable({ title = 'Bots', hideHeader, HeaderContent, onSelectAction = 'link' }) {
   const { query = [], isLoading, limit, goPage, reloadLimit } = useContext(DBQueryContext);
   const [ createBotModal, setCreateBotModal ] = useState(false);
   const [ quickviewModal, setQuickviewModal ] = useState(false);
   const nav = useRouter();
   const bots = query;
   let parsedLimit = limit;

   if (limit) {
      parsedLimit = limit -1;
   }

   function AddButton() {
      return (
         <RoundIconButton
            Icon={Add}
            color="tertiary"
            variant="contained"
            onClick={() => setCreateBotModal(true)}
         />
      )
   }

   function LogoIcon() {
      return <Image src={LogoIconImg} alt="CandlePilot Logo Icon" width={23} height={23} />
   }

   function handleRowClick(doc) {
      if (onSelectAction === 'link') {
         nav.push(`/dashboard/bots/${doc.index}`);
      }

      if (onSelectAction === 'modal') {
         setQuickviewModal(doc);
      }
   }

   return <div className="bots-table">
      {!hideHeader && (
         <ContentHeader Toolbar={AddButton}>
            {!HeaderContent && (<>
               <LogoIcon /> <h3 className="header-title">{title}</h3>
            </>)}

            {HeaderContent && <HeaderContent />}
         </ContentHeader>
      )}

      <TableBase
         items={bots}
         pagination={{}}
         loading={isLoading}
         onClickRow={handleRowClick}
         useSeeMorePage={true}
         itemsPerPage={parsedLimit}
         onPageNav={goPage}
         onRowsPerPageChange={reloadLimit}
         headerConfigs={[
            {
               label: 'Pilot Name',
               propKey: 'name',
               style: { minWidth: '10rem', maxWidth: '10rem' },
               format: (value) => {
                  return value;
               }
            },
            {
               label: <ProfitRatioTip />,
               propKey: 'profitRatio',
               align: 'center',
               style: { minWidth: '10rem', maxWidth: '10rem' },
               format: (value, item) => <Price amount={item.currentResults?.profitRatio || 0} noSymbol={true} noColor={true} size="l" />
            },
            {
               label: <DailyROITooltip />,
               propKey: 'avgDailyROI',
               align: 'center',
               style: { minWidth: '9rem', maxWidth: '9rem' },
               format: (value, item) => <Percent value={item.currentResults?.avgDailyROI || 0} dashedZero={true} size="l" />
            },
            {
               label: <AccumROITooltip period="24h" />,
               propKey: 'accumRoiDay',
               align: 'center',
               style: { minWidth: '8rem', maxWidth: '8rem' },
               format: (value, item) => <Percent value={item.currentResults?.accumRoi24 || 0} dashedZero={true} size="l" />
            },
            {
               label: <AccumROITooltip period="30d" />,
               propKey: 'accumRoiMonth',
               align: 'center',
               style: { minWidth: '8rem', maxWidth: '8rem' },
               format: (value, item) => <Percent value={item.currentResults?.accumRoiMonth || 0} dashedZero={true} />
            },
            {
               label: <PositionROIAvgTooltip period="24h" />,
               propKey: 'avgDayRoi',
               align: 'center',
               style: { minWidth: '9rem', maxWidth: '9rem' },
               format: (value, item) => <Percent value={item.currentResults?.avgNotionalRoi24 || 0} dashedZero={true} />
            },
            {
               label: <PositionROIAvgTooltip period="30d" />,
               propKey: 'avgMonthRoi',
               align: 'center',
               style: { minWidth: '9rem', maxWidth: '9rem' },
               format: (value, item) => <Percent value={item.currentResults?.avgNotionalRoiMonth || 0} dashedZero={true} />
            },
            {
               label: <WinLossROITooltip period="24h" />,
               propKey: 'winsLosesDay',
               align: 'center',
               style: { minWidth: '10rem', maxWidth: '10rem' },
               format: (value, item) => {
                  return (<>
                     <Percent value={item.currentResults?.avgWinsRoi24 || 0} dashedZero={true} />
                     {' / '}
                     <Percent value={item.currentResults?.avgLosesRoi24 || 0} dashedZero={true} />
                  </>);
               }
            },
            {
               label: <WinLossROITooltip period="30d" />,
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
               label: <WinLossCountTooltip period="24h" />,
               propKey: 'winsLosesRate24',
               align: 'center',
               style: { minWidth: '10rem' },
               format: (value, item) => {
                  return (<>
                     <Percent value={item.currentResults?.winsRate24 || 0} dashedZero={true} />
                     {' / '}
                     <Percent value={(item.currentResults?.losesRate24 || 0) * -1} dashedZero={true} />
                  </>);
               }
            },
            {
               label: <WinLossCountTooltip period="30d" />,
               propKey: 'winsLosesRateMonth',
               align: 'center',
               style: { minWidth: '10rem' },
               format: (value, item) => {
                  return (<>
                     <Percent value={item.currentResults?.winsRateMonth || 0} dashedZero={true} />
                     {' / '}
                     <Percent value={(item.currentResults?.losesRateMonth || 0) * -1} dashedZero={true} />
                  </>);
               }
            }
         ]}
      />

      <CreateBotModal open={createBotModal} setModal={setCreateBotModal} />
      <BotQuickview open={Boolean(quickviewModal)} bot={quickviewModal} setModal={setQuickviewModal} />
   </div>
}
