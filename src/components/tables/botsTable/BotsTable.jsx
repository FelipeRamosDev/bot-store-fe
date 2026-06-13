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
import { parseClassName } from '@/helpers/parser';
import Avatar from '@/components/common/avatar/Avatar';

/**
 * A table component displaying a list of recent bots along with their scores.
 * The component fetches bot data from a context and displays it in a table format.
 * @param {Object} props
 * @param {string} props.title - The header title.
 * @param {boolean} props.hideHeader - if used it will hide the header.
 * @param {boolean} props.noMargin - if used it will use ZERO margin.
 * @param {React.ReactDOM} props.HeaderContent - An custom header, provided as a ReactDOM component
 * @param {'link'|'modal'} props.onSelectAction - The type of action to perform when a row is clicked
 *
 * @returns {React.Element} The rendered table of recent bots.
 */
export default function BotsTable({ className, title = 'Bots', hideHeader, noMargin, HeaderContent, onSelectAction = 'link' }) {
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

   return <div className={parseClassName(className , [ 'bots-table', noMargin ? 'no-margin' : '' ])}>
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
         noDocumentsText="You doesn't have any pilot yet"
         headerConfigs={[
            {
               propKey: 'avatarUrl',
               format: (value) => <Avatar avatarUrl={value} size={40} />
            },
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
               propKey: 'avgDailyROS',
               align: 'center',
               style: { minWidth: '9rem', maxWidth: '9rem' },
               format: (value, item) => <Price amount={item.currentResults?.avgDailyROS || 0} dashedZero={true} noSymbol={true} size="l" />
            },
            {
               label: <AccumROITooltip period="24h" />,
               propKey: 'accumROSDay',
               align: 'center',
               style: { minWidth: '8rem', maxWidth: '8rem' },
               format: (value, item) => <Price amount={item.currentResults?.accumROS24 || 0} dashedZero={true} noSymbol={true} size="l" />
            },
            {
               label: <AccumROITooltip period="30d" />,
               propKey: 'accumROSMonth',
               align: 'center',
               style: { minWidth: '8rem', maxWidth: '8rem' },
               format: (value, item) => <Price amount={item.currentResults?.accumROSMonth || 0} dashedZero={true} noSymbol={true} />
            },
            {
               label: <PositionROIAvgTooltip period="24h" />,
               propKey: 'avgDayROS',
               align: 'center',
               style: { minWidth: '9rem', maxWidth: '9rem' },
               format: (value, item) => <Price amount={item.currentResults?.avgROS24 || 0} dashedZero={true} noSymbol={true} />
            },
            {
               label: <PositionROIAvgTooltip period="30d" />,
               propKey: 'avgMonthROS',
               align: 'center',
               style: { minWidth: '9rem', maxWidth: '9rem' },
               format: (value, item) => <Price amount={item.currentResults?.avgROSMonth || 0} dashedZero={true} noSymbol={true} />
            },
            {
               label: <WinLossROITooltip period="24h" />,
               propKey: 'winsLosesDay',
               align: 'center',
               style: { minWidth: '10rem', maxWidth: '10rem' },
               format: (value, item) => {
                  return (<>
                     <Price amount={item.currentResults?.avgWinsROS24 || 0} dashedZero={true} noSymbol={true} />
                     {' / '}
                     <Price amount={item.currentResults?.avgLosesROS24 || 0} dashedZero={true} noSymbol={true} />
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
                     <Price amount={item.currentResults?.avgWinsROSMonth || 0} dashedZero={true} noSymbol={true} />
                     {' / '}
                     <Price amount={item.currentResults?.avgLosesROSMonth || 0} dashedZero={true} noSymbol={true} />
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
