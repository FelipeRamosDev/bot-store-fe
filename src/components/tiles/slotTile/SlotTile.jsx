import './SlotTile.scss';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import Price from '@/components/displays/price/Price';
import Card from "@/components/common/card/Card";
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import PlayIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';
import { runSlot, stopSlot } from './SlotTile.helper';
import APIContext from '@/contexts/4HandsAPI';
import SlotMenu from '@/components/menus/dropdown/slotMenu/SlotMenu';
import UserInstanceAlert from '@/components/modals/userInstanceAlert/UserInstanceAlert';

export default function SlotTile({ slot = {}, className = '', uInstance, ...props }) {
   const API = useContext(APIContext);
   const [ disabled, setDisabled ] = useState(false);
   const [ uiAlertState, setUiAlertState ] = useState(false);
   const isStating = uInstance?.status === 'starting';
   const isStatingStream = uInstance?.status === 'starting-userstream';
   const isOffline = uInstance?.status === 'offline';

   useEffect(() => {
      setDisabled((!uInstance || isStating || isStatingStream || isOffline));
   }, [ uInstance, isOffline, isStating, isStatingStream ]);

   return (
      <Card className={`slot-tile ${className}`} padding="xs" elevation={50} {...props}>
         <div className="tile-header">
            <div className="text-wrap">
               <Link href={`/dashboard/slots/${slot.index}`}>
                  <span className="title">{slot.name}</span>
               </Link>

               <StatusBadge type="slot-status">{slot.status}</StatusBadge>
               <SlotMenu slot={slot} noTrasition={true} />
               <Link className="bot-name" href={`/dashboard/bots/${slot.bot?.index}`}>
                  {slot.bot?.name}
               </Link>
            </div>

            <div className="btn-wrap">
               {slot.status !== 'running' && <RoundIconButton
                  variant="contained"
                  Icon={PlayIcon}
                  size="small"
                  color={disabled ? 'disabled' : 'success'}
                  onClick={() => runSlot(API, slot, disabled, setDisabled, setUiAlertState)}
               />}

               {slot.status !== 'stopped' && <RoundIconButton
                  variant="contained"
                  Icon={StopIcon}
                  size="small"
                  color={disabled ? 'disabled' : 'error'}
                  onClick={() => stopSlot(API, slot, disabled, setDisabled, setUiAlertState)}
               />}
            </div>
         </div>

         <div className="slot-data">
            <div className="column">
               <div className="item">
                  <label>COD:</label>
                  <span>{slot.cod}</span>
               </div>

               <div className="item">
                  <label>Interval:</label>
                  <span>{slot.interval}</span>
               </div>
               <div className="item">
                  <label>Symbol:</label>
                  <span>{slot.assets?.length ? slot.assets[0] : ''}</span>
               </div>
               <div className="item">
                  <label>Realized:</label>
                  <Price amount={slot.totalRealizedPnl} noColor={true} />
               </div>
            </div>

            <div className="column">
               <Price amount={slot.pnl} size="xl" />
            </div>
         </div>

         <UserInstanceAlert alertState={uiAlertState} setAlertState={setUiAlertState} />
      </Card>
   );
}
