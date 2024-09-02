export default function PrimitiveValue({ botValue = {}, ...props }) {
   const primitiveType = botValue.primitiveType;

   return (
      <div className={`bot-value primitive ${primitiveType}`} {...props}>
         <label className="value-name">Primitive</label>
         <span className="primitive-value">{botValue.primitiveValue}</span>
      </div>
   );
}
