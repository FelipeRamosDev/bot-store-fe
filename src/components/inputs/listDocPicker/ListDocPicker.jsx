import './ListDocPicker.scss';
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { Check } from '@mui/icons-material';

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

