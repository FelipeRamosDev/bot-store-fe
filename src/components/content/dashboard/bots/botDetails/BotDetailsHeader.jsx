'use client';
import { useContext, useEffect, useState, useRef } from 'react';
import BotMenu from '@/components/menus/dropdown/botMenu/BotMenu';
import LogoIcon from '@/assets/icons/logo_icon_text-darken.svg';
import configs from '@/config.json';
import ContentFullwidth from '@/components/layout/contentFullwidth/ContentFullwidth';
import Image from 'next/image';
import BotInfos from './BotInfos';
import DBQueryContext from '@/contexts/DBQuery';
import ProfitRatioChart from '@/components/charts/profitRatioChart/ProfitRatioChart';
import APIContext from '@/contexts/4HandsAPI';
import AvgDailyROI from '@/components/charts/avgDailyROIChart/AvgDailyROIChart';
import AccumROIChart from '@/components/charts/accumROIChart/AccumROIChart';
import WinLossChart from '@/components/charts/winLossChart/WinLossChart';

/**
 * `BotDetailsHeader` is a component that displays the header information for a bot, including its name, description,
 * status, and metadata. It also provides a settings panel for additional bot management.
 *
 * @returns {JSX.Element} The rendered component.
 */
export default function BotDetailsHeader() {
   const { doc = {} } = useContext(DBQueryContext);
   const API = useContext(APIContext);
   const [ resultsLine, setResultsLine ] = useState();
   const requested = useRef();

   useEffect(() => {
      const notEmpty = Object.keys(doc).length;

      if (notEmpty && !requested.current && !resultsLine) {
         requested.current = true;

         API.ajax.authGet('/bot/results', {
            botUID: doc._id
         }).then(({ success, results }) => {
            if (!success) return;

            setResultsLine(results);
         }).catch(err => {
            throw err;
         });
      }
   }, [doc]);

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

         <ContentFullwidth className="analysis charts" useContainer={true}>
            <ProfitRatioChart results={resultsLine} />
            <AvgDailyROI results={resultsLine} />
            <AccumROIChart results={resultsLine} period="24h" />
            <AccumROIChart results={resultsLine} period="30d" />
            <WinLossChart results={resultsLine} period="24h" type="roi" />
            <WinLossChart results={resultsLine} period="30d" type="roi" />
            <WinLossChart results={resultsLine} period="24h" type="rate" />
            <WinLossChart results={resultsLine} period="30d" type="rate" />
         </ContentFullwidth>

         <div className="settings-painel">
            <h3 className="painel-title">{window.innerWidth > configs.breakpoints.m ? 'BOT ' : ''}SETTINGS</h3>

            <BotMenu bot={doc} />
         </div>
      </div>
   </div>;
}
