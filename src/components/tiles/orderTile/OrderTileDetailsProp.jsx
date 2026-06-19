/**
 * OrderTileDetailsProp Component
 * 
 * This component represents a single row in a details view, where each row consists of a label and a value. The label is displayed 
 * as a clickable element, and the value is rendered in the adjacent column. If no value is provided, a placeholder ('---') is shown.
 * 
 * @param {Object} props - The component props.
 * @param {string} [props.label] - The label text to display for the row.
 * @param {React.ReactNode} [props.children] - The content to display as the value for the row. If not provided, a placeholder 
 *                                             ('---') is shown.
 * 
 * @returns {JSX.Element} The rendered OrderTileDetailsProp component.
 */
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
