import WatermarkPriceCard from '@/components/common/watermarkPriceCard/WatermarkPriceCard';
import BotThreadDivider from '@/components/tiles/bot/botThreadDivider/BotThreadDivider';
import RuleDummy from '@/components/content/home/img/RuleDummy';
import BlurLinearIcon from '@mui/icons-material/BlurLinear';

export default function BotThreadImg() {
   const titleCustom = { fontSize: 25, fontWeight: 800, color: 'rgb(44 50 50)', transform: 'translateY(3px)' };
   const iconCustom = { fontSize: 35, marginTop: -10, color: 'rgb(44 50 50)', transform: 'translateY(7px)' };

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
            <BlurLinearIcon style={iconCustom} />

            <h5 className="card-title" style={titleCustom}>Open Short</h5>
            <div className="toolbar"></div>
         </div>

         <div className="card-body">
            <RuleDummy elevation={10} />

            <BotThreadDivider text="AND" />
            <RuleDummy elevation={10} indicatorName="Moving Average" ruleHeaderText="GREATER THAN" />
         </div>
      </WatermarkPriceCard>
   );
}
