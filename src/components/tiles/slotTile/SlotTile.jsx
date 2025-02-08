'use client';
import Link from 'next/link';
import { useContext, useEffect, useState, useRef } from 'react';
import Price from '@/components/displays/price/Price';
import Card from "@/components/common/card/Card";
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import PlayIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';
import { runSlot } from './SlotTile.helper';
import APIContext from '@/contexts/4HandsAPI';
import SlotMenu from '@/components/menus/dropdown/slotMenu/SlotMenu';
import UserInstanceAlert from '@/components/modals/userInstanceAlert/UserInstanceAlert';
import CryptoCandlestickChart from '@/components/charts/cryptoCandlestickChart/CryptoCandlestickChart';
import StopSlotConfirmDialog from '@/components/modals/dialogs/stopSlotConfirmDialog/StopSlotConfirmDialog';
import BotQuickview from '@/components/modals/quickviews/botQuickview/BotQuickview';
import PositionTile from '../positionTile/PositionTile';

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
 * @param {boolean} [props.demoMode] - Set true for demontration display on public areas.
 * @param {boolean} [props.minified] - Set true to use the minified view.
 * @param {Object[]} [props.dummyCandles] - The dummy candles for demontrtation mode.
 * 
 * @returns {JSX.Element} The rendered SlotTile component.
 */
export default function SlotTile({
   anchor,
   demoMode = false,
   slot = {},
   className = '',
   minified = false,
   uInstance,
   chartsDisplay,
   setEditSlotModal,
   setDeleteConfirmDialog,
   setSlotQuickview,
   dummyCandles,
   setModalPosition,
   ...props
}) {
   const API = useContext(APIContext);
   const [ disabled, setDisabled ] = useState(false);
   const [ uiAlertState, setUiAlertState ] = useState(false);
   const [ stopConfirmState, setStopConfirmState ] = useState(false);
   const [ botQuickview, setBotQuickview ] = useState(false);
   const botName = useRef();
   const botIndex = useRef();
   const isStating = uInstance?.status === 'starting';
   const isStatingStream = uInstance?.status === 'starting-userstream';
   const isOffline = uInstance?.status === 'offline';
   const symbol = slot?.assets?.length ? slot?.assets[0] : '';
   const interval = slot?.interval;
   const positions = slot?.trades || [];

   if (!botName.current && slot.bot?.name && !botIndex.current && slot.bot?.index) {
      botName.current = slot.bot?.name;
      botIndex.current = slot.bot?.index;
   } 

   useEffect(() => {
      setDisabled((!uInstance || isStating || isStatingStream || isOffline));
   }, [ uInstance, isOffline, isStating, isStatingStream ]);

   return (
      <Card anchor={anchor} className={`slot-tile ${minified ? 'minified' : ''} ${className}`} padding="xs" elevation={50} {...props}>
         {demoMode && <div className="lock-layer"></div>}

         <div className="tile-header">
            <div className="text-wrap">
               <span className="title link" onClick={() => !minified && setSlotQuickview(slot._id)}>{slot.name}</span>

               <StatusBadge type="slot-status" variant={minified ? 'light' : ''}>{slot.status}</StatusBadge>
               {!demoMode && !minified && <SlotMenu
                  slot={slot}
                  noTrasition={true}
                  setEditSlotModal={setEditSlotModal}
                  setDeleteConfirmDialog={setDeleteConfirmDialog}
               />}

               <span className="bot-name link" onClick={() => setBotQuickview(true)}>
                  {botName.current}
               </span>
            </div>

            {!minified && <div className="btn-wrap">
               {slot.status !== 'running' && <RoundIconButton
                  variant="contained"
                  Icon={PlayIcon}
                  size="small"
                  color={disabled && !demoMode ? 'disabled' : 'success'}
                  onClick={() => runSlot(API, slot, disabled, setDisabled, setUiAlertState)}
               />}

               {slot.status !== 'stopped' && <RoundIconButton
                  variant="contained"
                  Icon={StopIcon}
                  size="small"
                  color={disabled && !demoMode ? 'disabled' : 'error'}
                  onClick={() => setStopConfirmState(true)}
               />}
            </div>}
         </div>

         <div className="slot-data">
            <div className="column">
               <div className="item">
                  <label>COD:</label>
                  <span>{slot.cod}</span>
               </div>

               {!minified && <div className="item">
                  <label>Interval:</label>
                  <span>{slot.interval}</span>
               </div>}

               {!minified && <div className="item">
                  <label>Symbol:</label>
                  <span>{slot.assets?.length ? slot.assets[0] : ''}</span>
               </div>}

               <div className="item">
                  <label>Realized:</label>
                  <Price amount={slot.totalRealizedPnl} noColor={true} />
               </div>
            </div>

            <div className="column">
               <Price amount={slot.totalRealizedPnl} size={minified ? 'l' : 'xl'} />
            </div>
         </div>

         {slot.status !== 'stopped' && <div className="position-painel">
            {positions.length ? positions.map(position => <PositionTile key={position._id} position={position} openPosition={setModalPosition} />) : ''}
            {!positions.length && (
               <Card className="empty-tile" padding="s" elevation={10}>
                  <span className={`led ${slot.status}`}></span>
                  <span>Waiting for a bot match</span>
               </Card>
            )}
         </div>}

         {chartsDisplay && (
            <CryptoCandlestickChart
               symbol={symbol}
               interval={interval}
               dummyCandles={dummyCandles}
               position={slot?.trades.length && slot.trades[0]}
            />
         )}

         {botQuickview && <BotQuickview bot={slot.bot} open={botQuickview} setModal={setBotQuickview} />}
         <UserInstanceAlert alertState={uiAlertState} setAlertState={setUiAlertState} />
         <StopSlotConfirmDialog
            slot={slot}
            API={API}
            open={stopConfirmState}
            setOpen={setStopConfirmState}
            disabled={disabled}
            setDisabled={setDisabled}
            setUiAlertState={setUiAlertState}
         />
      </Card>
   );
}
