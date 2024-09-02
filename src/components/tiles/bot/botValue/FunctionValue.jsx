import ContainedTable from '@/components/tables/containedTable/ContainedTable';

export default function FunctionValue({ className = '', botValue = {}, ...props }) {
   const valueFunction = botValue.functionUID;
   const params = JSON.parse(botValue.configs);
   const tableData = [];

   if (!valueFunction) {
      return <></>;
   }

   Object.keys(valueFunction.options).map(key => {
      const optValue = valueFunction.options[key];
      const paramValue = params[key];

      if (paramValue) {
         tableData.push({ label: key, value: paramValue });
      } else {
         tableData.push({ label: key, value: optValue.default });
      }
   });

   return (
      <div className={`bot-value function ${className}`} {...props}>
         <p className="value-name">{valueFunction.title}</p>

         <ContainedTable tableData={tableData} />
      </div>
   );
}
