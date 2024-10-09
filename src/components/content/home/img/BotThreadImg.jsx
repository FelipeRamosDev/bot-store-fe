import WatermarkPriceCard from '@/components/common/watermarkPriceCard/WatermarkPriceCard';
import BotThreadDivider from '@/components/tiles/bot/botThreadDivider/BotThreadDivider';
import RuleDummy from '@/components/tiles/bot/rule/RuleDummy';
import PolylineIcon from '@mui/icons-material/Polyline';

export default function BotThreadImg() {
   const titleCustom = { fontSize: 25, fontWeight: 800, color: 'rgb(44 50 50)', transform: 'translateY(17px)' };
   const iconCustom = { fontSize: 50, marginTop: -15, color: 'rgb(44 50 50)', transform: 'translateY(16px)' };

   return (
      <WatermarkPriceCard
         className="left bot-thread"
         radius="m"
         borderColor="error"
         borderSide="left"
         watermark="Thread"
         paddingSize={50}
         elevation={50}
      >
         <div className="content-header thread-header">
            <PolylineIcon style={iconCustom} />

            <h5 className="card-title" style={titleCustom}>Open Short</h5>
            <div className="toolbar"></div>
         </div>

         <div className="card-body">
            <RuleDummy elevation={10} />

            <BotThreadDivider text="AND" />
            <RuleDummy elevation={10} />

            <BotThreadDivider text="OR" />
            <RuleDummy elevation={10} />
         </div>
      </WatermarkPriceCard>

   );
}
