'use client';
import "./UserInstanceTile.scss";

import { useContext } from 'react';
import Card from '@/components/common/card/Card';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Skeleton from '@mui/material/Skeleton';
import { Button } from '@mui/material';
import DBQueryContext from "@/contexts/DBQuery";
import NoDocumentsTile from "../noDocumentsTile/NoDocumentsTile";

export default function UserInstanceTile() {
   const { doc, isLoading } = useContext(DBQueryContext);
   const instance = doc;
   let message = '';
   let displayStatus = '';
   let btnColor;
   let disabled = false;

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

   if (instance.status === 'online') {
      displayStatus = 'Online';
      message = 'The user instance is ONLINE and ready to use.';
      btnColor = 'success';
   }

   if (instance.status === 'offline') {
      displayStatus = 'Offline';
      message = 'You need to turn on the instance to run the slots'
      btnColor = 'warn';
   }

   if (instance.status === 'starting') {
      displayStatus = 'Starting Instance';
      message = 'Message here';
      disabled = true;
   }

   return <Card className="user-instance" radius="s" elevation={50}>
      <Button className="power-btn" variant="contained" color={btnColor} disabled={disabled}>
         <PowerSettingsNewIcon />
      </Button>

      <div className="status">
         <p>{displayStatus}</p>
         {message && <small>{message}</small>}
      </div>
   </Card>;
}
