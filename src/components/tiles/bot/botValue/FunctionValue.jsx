import ContainedTable from '@/components/tables/containedTable/ContainedTable';

export default function FunctionValue({ className = '', minify, botValue = {} }) {
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

   const stringParams = Object.keys(params).map(key => `${key}: ${params[key]}`).join(' | ');
   return (
      <div className={`bot-value function ${className} ${minify ? 'minified' : ''}`}>
         <label className="value-name">{valueFunction.title}</label>
         {minify && <p className="string-params">{stringParams}</p>}

         {!minify && <ContainedTable tableData={tableData} />}
      </div>
   );
}
