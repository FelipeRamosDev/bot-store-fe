import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import BotValuesMenu from '@/components/menus/dropdown/botValuesMenu/BotValuesMenu';
import ContainedTable from '@/components/tables/containedTable/ContainedTable';

/**
 * Displays a function bot value with an optional minified view and associated menu for actions.
 * 
 * @param {Object} props - The component's props.
 * @param {string} [props.className=''] - Additional class names to apply to the component.
 * @param {Object} [props.parentThread] - The parent thread associated with the bot value.
 * @param {Object} [props.parentRule] - The parent rule associated with the bot value.
 * @param {boolean} [props.minify=false] - If true, displays a minified view of the function value.
 * @param {Object} [props.botValue={}] - The function bot value to display.
 * @param {Object} props.botValue.functionUID - The unique identifier for the function.
 * @param {string} props.botValue.configs - The configuration data for the function in JSON format.
 * @param {boolean} [props.demoMode=false] - If true, uses the demontration mode, made for public pages.
 * 
 * @returns {JSX.Element} The rendered component.
 */
export default function FunctionValue({ demoMode, className = '', parentThread, parentRule, minify, botValue = {}, ...props }) {
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
         <ContentHeader Toolbar={() => !demoMode && <BotValuesMenu botValue={botValue} parentThread={parentThread} parentRule={parentRule} />}>
            <label className="value-name">{valueFunction.title}</label>
         </ContentHeader>

         {minify && <p className="string-params">{stringParams}</p>}
         {!minify && <ContainedTable tableData={tableData} />}
      </div>
   );
}
