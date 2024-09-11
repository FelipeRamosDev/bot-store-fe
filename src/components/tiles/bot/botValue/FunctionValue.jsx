import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import BotValuesMenu from '@/components/menus/dropdown/botValuesMenu/BotValuesMenu';
import ContainedTable from '@/components/tables/containedTable/ContainedTable';

export default function FunctionValue({ className = '', minify, botValue = {}, ...props }) {
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
         tableData.push({ label: optValue.label || key, value: paramValue });
      } else {
         tableData.push({ label: optValue.label || key, value: optValue.default });
      }
   });

   const stringParams = Object.keys(params).map(key => `${key}: ${params[key]}`).join(' | ');
   return (
      <div className={`bot-value function ${className} ${minify ? 'minified' : ''}`} {...props}>
         <ContentHeader Toolbar={() => <BotValuesMenu botValue={botValue} />}>
            <label className="value-name">{valueFunction.title}</label>
         </ContentHeader>

         {minify && <p className="string-params">{stringParams}</p>}
         {!minify && <ContainedTable tableData={tableData} />}
      </div>
   );
}
