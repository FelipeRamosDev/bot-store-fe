export default function OrderTileDetailsProp({ label, children }) {
   return (
      <div className="table-row">
         <div className="table-column">
            <label className="cursor-pointer">{label}</label>
         </div>
         <div className="table-column value">
            {children || '---'}
         </div>
      </div>
   );
}
