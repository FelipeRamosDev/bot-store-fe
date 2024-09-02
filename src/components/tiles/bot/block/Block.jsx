'use client';
import './Block.scss';
import WatermarkPriceCard from '@/components/common/watermarkPriceCard/WatermarkPriceCard';
import BotThreadDivider from '../botThreadDivider/BotThreadDivider';
import Rule from '../rule/Rule';
import configs from '@/config.json';

export default function Block({ block = {}, index, logicalOperator }) {
   const watermarkSize = window.innerWidth < configs.breakpoints.s ? 23 : 28;
   const paddingSize = window.innerWidth < configs.breakpoints.s ? 3 : 14;

   return (<>
      {index ? <BotThreadDivider mode="card" text={logicalOperator} /> : ''}
      <WatermarkPriceCard
         className="bot-block"
         watermark="Block"
         radius="s"
         padding="xs"
         elevation={10}
         watermarkSize={watermarkSize}
         paddingSize={paddingSize}
      >
         {block.blocks.map((item, i) => <Block key={item._id} block={item} index={i} logicalOperator={block.ifType} />)}
         {block.rules.map((item, i) => <Rule key={item._id} rule={item} index={i} logicalOperator={block.ifType} />)}
      </WatermarkPriceCard>
   </>
   );
}
