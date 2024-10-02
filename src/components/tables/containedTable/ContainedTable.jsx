/**
 * ContainedTableRow Component
 * 
 * This component represents a single row in the contained table. It displays a label and a value. The value can be provided directly 
 * through the `value` prop or rendered using a React component passed via the `Value` prop. If neither `value` nor `Value` is provided, 
 * a placeholder ('---') is displayed.
 * 
 * @param {Object} props - The component props.
 * @param {string} [props.label] - The label for the row.
 * @param {React.ReactNode} [props.value] - The value to be displayed in the row.
 * @param {React.ComponentType} [props.Value] - A React component to render in place of the value.
 * 
 * @returns {JSX.Element} The rendered ContainedTableRow component.
 */
export function ContainedTableRow({ label, value, Value, ...props }) {
   return (
      <div className="table-row" {...props}>
         <div className="table-column">
            {label && <label>{label}</label>}
         </div>
         <div className="table-column value">
            {value && value}
            {Value && <Value />}
            {!value && !Value && '---'}
         </div>
      </div>
   )
}

/**
 * ContainedTable Component
 * 
 * This component renders a table with rows provided through the `tableData` prop. Each row is an instance of the `ContainedTableRow` 
 * component. Rows can be hidden by setting the `hide` property in the row data. The table supports additional styling through 
 * the `className` prop.
 * 
 * @param {Object} props - The component props.
 * @param {Array} [props.tableData=[]] - An array of row data, where each item contains `label`, `value`, and optionally `Value` 
 *                                        and `hide` properties.
 * @param {string} [props.className=''] - Additional class names for custom styling.
 * 
 * @returns {JSX.Element} The rendered ContainedTable component.
 */
export default function ContainedTable({ tableData = [], className = '', ...props }) {
   return (
      <div className={`contained-table ${className}`} {...props}>
         {tableData.map(tableRow => (
            !tableRow.hide && <ContainedTableRow
               key={tableRow.label + Math.random()}
               label={tableRow.label}
               value={tableRow.value}
               Value={tableRow.Value}
            />
         ))}
      </div>
   );
}
