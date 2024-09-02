export default function PrimitiveValue({ botValue = {}, ...props }) {
   const primitiveType = botValue.primitiveType;

   return (
      <div className={`bot-value primitive`} {...props}>
         <label className="value-name">Primitive</label>
         <span className={`primitive-value ${primitiveType}`}>{botValue.primitiveValue}</span>
      </div>
   );
}
