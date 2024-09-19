'use client';
import { useContext } from 'react';
import DBQueryContext from '@/contexts/DBQuery';
import Card from '@/components/common/card/Card';
import CheckButtonGroupInput from '@/components/inputs/checkButtonGroupInput/CheckButtonGroupInput';
import ContainedTable from '@/components/tables/containedTable/ContainedTable';
import APIContext from '@/contexts/4HandsAPI';
import BotMenu from '@/components/menus/dropdown/botMenu/BotMenu';
import { handleStatusChange } from './BotDetails.helper';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import configs from '@/config.json';

/**
 * `BotDetailsHeader` is a component that displays the header information for a bot, including its name, description,
 * status, and metadata. It also provides a settings panel for additional bot management.
 *
 * @returns {JSX.Element} The rendered component.
 */
export default function BotDetailsHeader() {
   const { doc = {} } = useContext(DBQueryContext);
   const API = useContext(APIContext);

   return <div className="page-header">
      <div className="cover"></div>

      <div className="bot-info">
         <div className="full-container">
            <div className="avatar">
               <SmartToyIcon className="robot-icon" />
            </div>

            <div className="summary">
               <h1 className="title">{doc.name}</h1>
               <p className="brief">{doc.description}</p>
            </div>

            <Card className="infos" padding="s" elevation={40}>
               {doc.status && <CheckButtonGroupInput
                  onChange={(ev) => handleStatusChange(ev, API, doc)}
                  schema={{
                     key: 'status',
                     defaultValue: doc.status,
                     options: [
                        { label: 'Draft', value: 'draft' },
                        { label: 'Private', value: 'private' },
                        { label: 'Public', value: 'public' }
                     ]
                  }}
               />}

               <ContainedTable
                  tableData={[
                     { label: 'ID', value: doc.cod },
                     { label: 'Created At', value: new Date(doc.createdAt).toLocaleString() },
                     { label: 'Modified At', value: new Date(doc.modifiedAt).toLocaleString() },
                  ]}
               />
            </Card>
         </div>

         <div className="settings-painel">
            <h3 className="painel-title">{window.innerWidth > configs.breakpoints.m ? 'BOT ' : ''}SETTINGS</h3>

            <BotMenu />
         </div>
      </div>
   </div>;
}
