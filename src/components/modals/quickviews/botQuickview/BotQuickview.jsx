'use client';
import Image from 'next/image';
import ContentModal from '../../base/contentModal/ContentModal';
import LogoIcon from '@/assets/icons/logo_icon_text-darken.svg';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import ProfitRatioChart from '@/components/charts/profitRatioChart/ProfitRatioChart';
import AvgDailyROIChart from '@/components/charts/avgDailyROIChart/AvgDailyROIChart';
import AccumROIChart from '@/components/charts/accumROIChart/AccumROIChart';
import WinLossChart from '@/components/charts/winLossChart/WinLossChart';
import { useContext, useEffect, useRef, useState } from 'react';
import APIContext from '@/contexts/4HandsAPI';
import ContentFullwidth from '@/components/layout/contentFullwidth/ContentFullwidth';
import { Edit, QueryStats } from '@mui/icons-material';
import Card from '@/components/common/card/Card';
import BotResultsGrid from '@/components/grids/botResultsGrid/BotResultsGrid';
import AltModalHeader from '@/components/headers/altModalHeader/AltModalHeader';
import { Button } from '@mui/material';
import CTAButton from '@/components/buttons/ctaButton/CTAButton';

export default function BotQuickview({ open, bot, setModal }) {
   const API = useContext(APIContext);
   const [ resultsLine, setResultsLine ] = useState();
   const requested = useRef();

   useEffect(() => {
      if (!bot) return;

      const notEmpty = Object.keys(bot).length;

      if (notEmpty) {
         requested.current = true;

         API.ajax.authGet('/bot/results', {
            botUID: bot._id
         }).then(({ success, results }) => {
            if (!success) return;

            setResultsLine(results);
         }).catch(err => {
            throw err;
         });
      }
   }, [bot]);

   if (!bot) {
      return <></>;
   }

   return (
      <ContentModal
         className="bot-quickview"
         open={open}
         title={bot.name}
         hideHeader
         size="x-large"
         onClose={() => setModal(null)}
      >
         <div className="body-header">
            <div className="cover">
               {/* Add the cover image here */}
            </div>

            <AltModalHeader backAction={() => setModal(null)}>
               <CTAButton
                  variant="contained"
                  color="tertiary"
                  url={`/dashboard/bots/${bot.index}`}
                  startIcon={<Edit />}
               >
                  Edit
               </CTAButton>
            </AltModalHeader>

            <div className="header-content">
               <div className="avatar-wrap">
                  <Image src={LogoIcon} alt="CandlePilot Icon" width={120} height={120} />
               </div>

               <div className="bot-data">
                  <ContentHeader>
                     <h3 className="bot-name">{bot.name}</h3>
                  </ContentHeader>

                  <p className="bot-summary">{bot.description}</p>
               </div>

               <div className="bot-status">
                  <Card
                     className="status-card"
                     radius="m"
                     padding="xs"
                     elevation={50}
                  >
                     <BotResultsGrid bot={bot} />
                  </Card>
               </div>
            </div>
         </div>

         <div className="charts">
            <ContentFullwidth useContainer>
               <ContentHeader>
                  <QueryStats fontSize="large" />
                  <h4 className="header-title">Pilot's Analysis</h4>
               </ContentHeader>

               <ProfitRatioChart results={resultsLine} />
               <AvgDailyROIChart results={resultsLine} />
               <AccumROIChart results={resultsLine} period="24h" />
               <AccumROIChart results={resultsLine} period="30d" />
               <WinLossChart results={resultsLine} period="24h" type="roi" />
               <WinLossChart results={resultsLine} period="30d" type="roi" />
               <WinLossChart results={resultsLine} period="24h" type="rate" />
               <WinLossChart results={resultsLine} period="30d" type="rate" />
            </ContentFullwidth>
         </div>
      </ContentModal>
   );
}
