export default function PrimitiveValue({ className = '', botValue = {} }) {
   const primitiveType = botValue.primitiveType;

   return (
      <div className={`bot-value primitive ${className}`}>
         <label className="value-name">Primitive</label>
         <span className={`primitive-value ${primitiveType}`}>{botValue.primitiveValue}</span>
      </div>
   );
}
