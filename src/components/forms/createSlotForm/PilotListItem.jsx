import Avatar from '@/components/common/avatar/Avatar';
import { ListItem } from '@mui/material';

export default function PilotListItem({ option, itemProps }) {
   delete itemProps.key;

   return (
      <ListItem value={option.value} {...itemProps} sx={{ gap: '1rem' }}>
         <div className="option-column">
            <Avatar avatarUrl={option.avatarUrl} noBorder quality={5} />
         </div>
         <div className="option-column" style={{ marginRight: 'auto' }}>
            <span className="symbol">{option.label}</span>
         </div>
      </ListItem>
   );
}
