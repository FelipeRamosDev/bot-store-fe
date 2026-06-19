import AddCircleIcon from '@mui/icons-material/AddCircle';

/**
 * A component that displays a tile with a message indicating no documents or results are available.
 * 
 * This component is typically used to show an empty state in a section where no data is present.
 * 
 * @param {Object} props - The props for the component.
 * @param {string} [props.className=''] - Optional additional CSS class for styling.
 * @param {boolean} [props.noBorder=false] - Whether to apply the no-border styling.
 * @param {React.ElementType} [props.Icon=AddCircleIcon] - The icon component to display. Defaults to `AddCircleIcon`.
 * @param {string} [props.message='No results'] - The message to display in the tile.
 * 
 * @returns {React.Element} The rendered tile component with the no documents message.
 */
export default function NoDocumentsTile({ className = '', noBorder = false, Icon = AddCircleIcon, message = 'No results', ...props }) {
   return <div className={`no-documents-tile ${noBorder ? 'no-border' : ''} ${className}`} {...props}>
      {Icon && <Icon />}

      <p className="message">{message}</p>
   </div>
}
