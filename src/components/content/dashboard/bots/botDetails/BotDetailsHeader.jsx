'use client';
import { useContext } from 'react';
import BotMenu from '@/components/menus/dropdown/botMenu/BotMenu';
import LogoIcon from '@/assets/icons/logo_icon_text-darken.svg';
import configs from '@/config.json';
import ContentFullwidth from '@/components/layout/contentFullwidth/ContentFullwidth';
import Image from 'next/image';
import BotInfos from './BotInfos';
import DBQueryContext from '@/contexts/DBQuery';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import CutLineChartBase from '@/components/charts/base/lineChartBase/CutLineChartBase';

const parsetDummyTime = (multiplier) => Date.now() - ((1000 * 60 * 60 * 24) * multiplier);
const dataSet = [
   { value: 1, time: parsetDummyTime(12) },
   { value: 2, time: parsetDummyTime(11) },
   { value: 3, time: parsetDummyTime(10) },
   { value: 2, time: parsetDummyTime(9) },
   { value: 1, time: parsetDummyTime(8) },
   { value: -1, time: parsetDummyTime(7) },
   { value: -2, time: parsetDummyTime(6) },
   { value: 0, time: parsetDummyTime(5) },
   { value: 2, time: parsetDummyTime(4) },
   { value: 4, time: parsetDummyTime(3) },
   { value: 6, time: parsetDummyTime(2) },
   { value: 5, time: parsetDummyTime(1) },
   { value: 7, time: Date.now() },
]

/**
 * `BotDetailsHeader` is a component that displays the header information for a bot, including its name, description,
 * status, and metadata. It also provides a settings panel for additional bot management.
 *
 * @returns {JSX.Element} The rendered component.
 */
export default function BotDetailsHeader() {
   const { doc = {} } = useContext(DBQueryContext);

   return <div className="page-header">
      <div className="cover"></div>

      <div className="bot-info">
         <ContentFullwidth useContainer={true}>
            <div className="avatar">
               <Image src={LogoIcon} className="robot-icon" alt="Avatar Placeholder" width={180} heigth={180} priority={true} />
            </div>

            <div className="summary">
               <h1 className="title">{doc.name}</h1>
               <p className="brief">{doc.description}</p>
            </div>

            <BotInfos bot={doc} />
         </ContentFullwidth>

         <ContentFullwidth className="analysis" useContainer={true}>
            <ContentHeader>
               <QueryStatsIcon fontSize="large" className="title-icon" />
               <h2 className="header-title">Results History</h2>
            </ContentHeader>

            <div className="charts">
               <CutLineChartBase className="chart" dataSet={dataSet} />
               <CutLineChartBase className="chart" dataSet={dataSet} />
               <CutLineChartBase className="chart" dataSet={dataSet} />
               <CutLineChartBase className="chart" dataSet={dataSet} />
            </div>
         </ContentFullwidth>

         <div className="settings-painel">
            <h3 className="painel-title">{window.innerWidth > configs.breakpoints.m ? 'BOT ' : ''}SETTINGS</h3>

            <BotMenu bot={doc} />
         </div>
      </div>
   </div>;
}
