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
               <div>Chart A</div>
               <div>Chart B</div>
               <div>Chart C</div>
               <div>Chart D</div>
               <div>Chart E</div>
            </div>
         </ContentFullwidth>

         <div className="settings-painel">
            <h3 className="painel-title">{window.innerWidth > configs.breakpoints.m ? 'BOT ' : ''}SETTINGS</h3>

            <BotMenu bot={doc} />
         </div>
      </div>
   </div>;
}
