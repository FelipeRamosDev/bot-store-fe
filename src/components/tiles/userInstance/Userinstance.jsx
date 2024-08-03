'use client';
import "./UserInstance.scss";

import { useContext } from 'react';
import Card from '@/components/common/card/Card';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Button } from '@mui/material';
import DBQueryContext from "@/contexts/DBQuery";

export default function UserInstance() {
   const { doc, socket } = useContext(DBQueryContext);
   const instance = doc;
   let message = '';
   let displayStatus = '';
   let btnColor;
   let disabled = false;

   if (!instance) {
      return <></>;
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
