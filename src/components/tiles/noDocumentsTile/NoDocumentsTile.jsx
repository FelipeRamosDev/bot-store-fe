import './NoDocumentsTile.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function NoDocumentsTile({ className = '', noBorder = false, Icon = AddCircleIcon, message = 'No results', ...props }) {
   return <div className={`no-documents-tile ${noBorder ? 'no-border' : ''} ${className}`} {...props}>
      {Icon && <Icon />}

      <p className="message">{message}</p>
   </div>
}
