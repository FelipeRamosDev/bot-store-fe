'use client';
import "./UserInstance.scss";

import { useContext } from 'react';
import Card from '@/components/common/card/Card';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Skeleton from '@mui/material/Skeleton';
import { Button } from '@mui/material';
import DBQueryContext from '@/contexts/DBQuery';
import APIContext from '@/contexts/4HandsAPI';
import NoDocumentsTile from '../noDocumentsTile/NoDocumentsTile';
import { parseMessages, switchPower } from './UserInstance.helper';

export default function UserInstanceTile() {
   const { doc, isLoading } = useContext(DBQueryContext);
   const API = useContext(APIContext);
   const instance = doc;

   if (isLoading) {
      return <Skeleton
         variant="rounded"
         height={60}
         sx={{ width: '100%'}}
      />;
   }

   if (!doc) {
      return <NoDocumentsTile Icon={false} noBorder={true} />
   }

   const { message, displayStatus, btnColor, disabled } = parseMessages(instance);
   return <Card className="user-instance" radius="s" elevation={50}>
      <Button
         className="power-btn"
         variant="contained"
         color={btnColor}
         disabled={disabled}
         onClick={() => switchPower(API, instance)}
      >
         <PowerSettingsNewIcon />
      </Button>

      <div className="status">
         <p>{displayStatus}</p>
         {message && <small>{message}</small>}
      </div>
   </Card>;
}
