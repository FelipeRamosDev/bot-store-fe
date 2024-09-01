import './Rule.scss';
import WatermarkPriceCard from '@/components/common/watermarkPriceCard/WatermarkPriceCard';

export default function Rule({ rule = {} }) {
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
         watermarkSize={23}
         elevation={10}
      >
         {rule.children.map(value => {
            return <pre key={value._id}>{value.configs}</pre>
         })}
      </WatermarkPriceCard>
   );
}

