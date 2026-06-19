import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { Check } from '@mui/icons-material';

/**
 * A component for displaying a list of documents with optional selection functionality.
 * Each document is represented with an avatar, primary text, and secondary text.
 * 
 * @param {Object} props - The component props.
 * @param {Array} props.docList - An array of document objects to display in the list.
 * @param {React.ComponentType} props.AvatarIcon - A component to render inside the avatar for each document.
 * @param {boolean} props.selectOnClickItem - A flag indicating if an icon button should be shown for selection.
 * @param {Function} props.parsePrimary - A function to extract and return the primary text for each document.
 * @param {Function} props.parseSecondary - A function to extract and return the secondary text for each document.
 * @param {Function} props.onSelect - A function to handle the selection of a document.
 * 
 * @returns {JSX.Element} The rendered component.
 */
export default function ListDocPicker({
   docList = [],
   AvatarIcon,
   selectOnClickItem = false,
   parsePrimary = () => {},
   parseSecondary = () => {},
   onSelect = () => {}
}) {
   return (
      <div className="doc-picker">
         <List className="doc-list" dense={true} disablePadding={true}>
            {docList.map((doc) => (
               <ListItem
                  key={doc._id}
                  className="doc-list-item"
                  onClick={() => onSelect(doc)}
                  secondaryAction={
                     selectOnClickItem ? (
                        <IconButton>
                           <Check />
                        </IconButton>
                     ) : null
                  }
               >
                  {AvatarIcon && <ListItemAvatar>
                     <Avatar>
                        <AvatarIcon doc={doc} />
                     </Avatar>
                  </ListItemAvatar>}
                  <ListItemText
                     primary={parsePrimary(doc)}
                     secondary={parseSecondary(doc)}
                  />
               </ListItem>
            ))}
         </List>
      </div>
   );
}

