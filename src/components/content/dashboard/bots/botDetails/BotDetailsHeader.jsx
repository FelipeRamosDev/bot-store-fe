'use client';
import { useContext, useEffect, useState, useRef } from 'react';
import BotMenu from '@/components/menus/dropdown/botMenu/BotMenu';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import configs from '@/config.json';
import ContentFullwidth from '@/components/layout/contentFullwidth/ContentFullwidth';
import BotInfos from './BotInfos';
import DBQueryContext from '@/contexts/DBQuery';
import ProfitRatioChart from '@/components/charts/profitRatioChart/ProfitRatioChart';
import APIContext from '@/contexts/4HandsAPI';
import AvgDailyROI from '@/components/charts/avgDailyROSChart/AvgDailyROSChart';
import AccumROIChart from '@/components/charts/accumROSChart/AccumROSChart';
import WinLossChart from '@/components/charts/winLossChart/WinLossChart';
import TextDisplay from '@/components/displays/textDisplay/TextDisplay';
import { FormBase } from '@/components/forms/formBase/FormBase';
import createBotForm from '@/components/forms/createBot/CreateBot.config';
import FormInput from '@/components/forms/formBase/FormInput';
import usePilot from '@/hooks/usePilot';
import Avatar from '@/components/common/avatar/Avatar';
import { useRouter } from 'next/navigation';
import RubberButton from '@/components/buttons/rubberButton/RubberButton';

/**
 * `BotDetailsHeader` is a component that displays the header information for a bot, including its name, description,
 * status, and metadata. It also provides a settings panel for additional bot management.
 *
 * @returns {JSX.Element} The rendered component.
 */
export default function BotDetailsHeader() {
   const [resultsLine, setResultsLine] = useState();
   const [isChatsExpanded, setIsChatsExpanded] = useState(false);
   const { doc = {} } = useContext(DBQueryContext);
   const API = useContext(APIContext);
   const requested = useRef();
   const { uploadAvatar, uploading } = usePilot();
   const router = useRouter();

   const handleAvatarChange = (files) => {
      const [file] = files;

      if (!file) {
         return;
      }

      uploadAvatar(file, doc._id).then(() => {
         router.refresh();
      }).catch(err => {
         console.error('Error uploading file:', err);
      });
   }

   useEffect(() => {
      if (typeof doc?._id !== 'string') return;

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
   }, [doc, API.ajax, resultsLine]);

   return <div className="page-header">
      <div className="cover"></div>

      <div className="bot-info">
         <ContentFullwidth useContainer={true}>
            <FormBase formID="pilot-avatar-form" formSet={createBotForm} editData={doc} hideSubmit>
               <Avatar avatarUrl={doc.avatarUrl} size={220}>
                  {uploading ? <span className="uploading">Uploading...</span> : <span className="overlay-text">Change Avatar</span>}

                  {!uploading && (
                     <FormInput path="avatar" onChange={handleAvatarChange} />
                  )}
               </Avatar>
            </FormBase>

            <div className="summary">
               <h1 className="title">{doc.name}</h1>
               <TextDisplay isExpandable={true}>{doc.description}</TextDisplay>
            </div>

            <BotInfos bot={doc} />
         </ContentFullwidth>

         {isChatsExpanded && <ContentFullwidth className="analysis charts" useContainer={true}>
            <ProfitRatioChart results={resultsLine} />
            <AvgDailyROI results={resultsLine} />
            <AccumROIChart results={resultsLine} period="24h" />
            <AccumROIChart results={resultsLine} period="30d" />
            <WinLossChart results={resultsLine} period="24h" type="roi" />
            <WinLossChart results={resultsLine} period="30d" type="roi" />
            <WinLossChart results={resultsLine} period="24h" type="rate" />
            <WinLossChart results={resultsLine} period="30d" type="rate" />
         </ContentFullwidth>}

         <div className="settings-painel">
            <h3 className="painel-title">{window.innerWidth > configs.breakpoints.m ? 'BOT ' : ''}SETTINGS</h3>

            <RubberButton
               className="toggle-charts"
               startIcon={isChatsExpanded ? <VisibilityOffIcon /> : <VisibilityIcon />}
               onClick={() => setIsChatsExpanded(!isChatsExpanded)}
            >
               Charts
            </RubberButton>
            <BotMenu bot={doc} />
         </div>
      </div>
   </div>;
}
