import Link from 'next/link';
import Price from '@/components/displays/price/Price';
import './SlotTile.scss';
import Card from "@/components/common/card/Card";
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import PlayIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import StatusBadge from '@/components/common/statusBedge/StatusBadge';

export default function SlotTile({ slot = {}, className = '', ...props }) {
   return (
      <Card className={`slot-tile ${className}`} padding="xs" {...props}>
         <div className="tile-header">
            <div className="text-wrap">
               <Link href={`/dashboard/slots/${slot.index}`}>
                  <span className="title">{slot.name}</span>
               </Link>

               <StatusBadge type="slot-status">{slot.status}</StatusBadge>
               <Link className="bot-name" href={`/dashboard/bots/${slot.bot?.index}`}>
                  <p>{slot.bot?.name}</p>
               </Link>
            </div>

            <div className="btn-wrap">
               {slot.status !== 'running' && <RoundIconButton
                  variant="contained"
                  Icon={PlayIcon}
                  size="small"
                  color="tertiary"
               />}

               {slot.status !== 'stopped' && <RoundIconButton
                  variant="contained"
                  Icon={StopIcon}
                  size="small"
                  color="error"
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
      </Card>
   );
}
