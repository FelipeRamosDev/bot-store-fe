'use client';

import { useContext, useState } from 'react';
import BotMenu from '@/components/menus/dropdown/botMenu/BotMenu';
import configs from '@/config.json';
import ContentFullwidth from '@/components/layout/contentFullwidth/ContentFullwidth';
import BotInfos from './BotInfos';
import DBQueryContext from '@/contexts/DBQuery';
import TextDisplay from '@/components/displays/textDisplay/TextDisplay';
import { FormBase } from '@/components/forms/formBase/FormBase';
import createBotForm from '@/components/forms/createBot/CreateBot.config';
import FormInput from '@/components/forms/formBase/FormInput';
import usePilot from '@/hooks/usePilot';
import Avatar from '@/components/common/avatar/Avatar';
import { useRouter } from 'next/navigation';
import Card from '@/components/common/card/Card';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import PilotChartsModal from '@/components/modals/pilotChartsModal/PilotChartsModal';
import { ShowChart } from '@mui/icons-material';

/**
 * `BotDetailsHeader` is a component that displays the header information for a bot, including its name, description,
 * status, and metadata. It also provides a settings panel for additional bot management.
 *
 * @returns {JSX.Element} The rendered component.
 */
export default function BotDetailsHeader() {
   const [isChartsExpanded, setIsChartsExpanded] = useState(false);
   const { doc = {} } = useContext(DBQueryContext);
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

   return <div className="page-header">
      <div className="cover">
         <div className="top-toolbar full-container">
            <RoundIconButton
               className="toggle-charts"
               color="secondary"
               variant="contained"
               Icon={ShowChart}
               onClick={() => setIsChartsExpanded(!isChartsExpanded)}
            />

            <BotMenu bot={doc} />
         </div>
      </div>

      <div className="bot-info">
         <ContentFullwidth useContainer={true}>
            <div className="main-info">
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
                  <span className="subtitle">{doc.subTitle || '---'}</span>

               </div>

               <Card className="description" padding="s" elevation={0}>
                  <ContentHeader>
                     <h3 className="header-title">Pilot Description</h3>
                  </ContentHeader>

                  <TextDisplay isExpandable={true}>{doc.description}</TextDisplay>
               </Card>
            </div>

            <BotInfos bot={doc} />
         </ContentFullwidth>

         <div className="settings-painel">
            <h3 className="painel-title">{window.innerWidth > configs.breakpoints.m ? 'PILOT ' : ''}SETTINGS</h3>
         </div>
      </div>

      <PilotChartsModal open={isChartsExpanded} onClose={() => setIsChartsExpanded(false)} />
   </div>;
}
