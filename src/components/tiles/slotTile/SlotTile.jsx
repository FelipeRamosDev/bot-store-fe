import './SlotTile.scss';
import Link from 'next/link';
import { useContext, useEffect, useState, useRef } from 'react';
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
import CryptoCandlestickChart from '@/components/charts/cryptoCandlestickChart/CryptoCandlestickChart';

/**
 * Represents a tile component displaying information about a slot.
 * Allows interaction through action buttons to start or stop the slot.
 * 
 * @param {Object} props - Component properties.
 * @param {Object} props.slot - The slot object containing information to display.
 * @param {string} [props.className=''] - Additional CSS classes to apply.
 * @param {Object} [props.uInstance] - User instance object containing status information.
 * @param {Function} [props.setEditSlotModal] - Function to open the edit slot modal.
 * @param {Function} [props.setDeleteConfirmDialog] - Function to open the delete confirmation dialog.
 * @param {Object} [props.rest] - Additional properties to pass to the Card component.
 * 
 * @returns {JSX.Element} The rendered SlotTile component.
 */
export default function SlotTile({
   slot = {},
   className = '',
   uInstance,
   chartsDisplay,
   setEditSlotModal,
   setDeleteConfirmDialog,
   setSlotQuickview,
   ...props
}) {
   const API = useContext(APIContext);
   const [ disabled, setDisabled ] = useState(false);
   const [ uiAlertState, setUiAlertState ] = useState(false);
   const botName = useRef();
   const isStating = uInstance?.status === 'starting';
   const isStatingStream = uInstance?.status === 'starting-userstream';
   const isOffline = uInstance?.status === 'offline';
   const symbol = slot?.assets?.length ? slot?.assets[0] : '';
   const interval = slot?.interval;

   if (!botName.current && slot.bot?.name) {
      botName.current = slot.bot?.name;
   } 

   useEffect(() => {
      setDisabled((!uInstance || isStating || isStatingStream || isOffline));
   }, [ uInstance, isOffline, isStating, isStatingStream ]);

   return (
      <Card className={`slot-tile ${className}`} padding="xs" elevation={50} {...props}>
         <div className="tile-header">
            <div className="text-wrap">
               <span className="title link" onClick={() => setSlotQuickview(slot._id)}>{slot.name}</span>

               <StatusBadge type="slot-status">{slot.status}</StatusBadge>
               <SlotMenu
                  slot={slot}
                  noTrasition={true}
                  setEditSlotModal={setEditSlotModal}
                  setDeleteConfirmDialog={setDeleteConfirmDialog}
               />

               <Link className="bot-name" href={`https://botstore-temp.vercel.app/bot-details?botuid=${slot.bot?._id || slot.bot}`}>
                  {botName.current}
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

         {chartsDisplay && <CryptoCandlestickChart symbol={symbol} interval={interval} position={slot?.trades.length && slot.trades[0]} />}
         <UserInstanceAlert alertState={uiAlertState} setAlertState={setUiAlertState} />
      </Card>
   );
}
