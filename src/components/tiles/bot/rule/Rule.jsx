import './Rule.scss';
import BotValue from '../botValue/BotValue';
import WatermarkPriceCard from '@/components/common/watermarkPriceCard/WatermarkPriceCard';
import configs from '@/config.json';
import BotThreadDivider from '../botThreadDivider/BotThreadDivider';

export default function Rule({ index, rule = {}, logicalOperator, ...props }) {
   if (!Array.isArray(rule.children)) {
      return <></>;
   }

   return (<>
      {index ? <BotThreadDivider mode="card" text={logicalOperator} /> : ''}
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
   </>);
}

