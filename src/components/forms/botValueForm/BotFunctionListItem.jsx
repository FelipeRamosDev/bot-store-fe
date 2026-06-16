import { ListItem } from '@mui/material';

export default function BotFunctionListItem({ option, itemProps }) {
   delete itemProps.key;

   return (
      <ListItem value={option.value} {...itemProps} sx={{ gap: '1rem' }}>
         <div className="option-column" style={{ marginRight: 'auto' }}>
            <span className="symbol">{option.label}</span>
         </div>
      </ListItem>
   );
}

