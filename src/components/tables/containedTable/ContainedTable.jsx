import './ContainedTable.scss';

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
