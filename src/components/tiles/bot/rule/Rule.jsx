import './Rule.scss';
import BotValue from '../botValue/BotValue';
import WatermarkPriceCard from '@/components/common/watermarkPriceCard/WatermarkPriceCard';
import configs from '@/config.json';

export default function Rule({ rule = {}, ...props }) {
   if (!Array.isArray(rule.children)) {
      return <></>;
   }

   return (
      <WatermarkPriceCard
         className="bot-rule"
         watermark="Evaluate"
         radius="s"
         padding="xs"
         borderSide="bottom"
         watermarkSize={window.innerWidth < configs.breakpoints.s ? 18 : 23}
         elevation={10}
         {...props}
      >
         {rule.children.map(value => <BotValue key={value._id} botValue={value} />)}
      </WatermarkPriceCard>
   );
}

