import './StatusBadge.scss';

function parseSlotStatus(type) {
   let badgeType = '';
   let badgeColor = '';

   switch (type) {
      case 'slot-live':
      case 'master-live':
      case 'position-live':
         badgeType = 'LIVE';
         badgeColor = 'success';
         break;
      case 'slot-demo':
      case 'master-demo':
      case 'position-demo':
         badgeType = 'DEMO';
         badgeColor = 'warn';
         break;
   }

   return {
      type: badgeType,
      color: badgeColor
   }
}

function parsePositionSide(side) {
   let badgeColor = 'disabled';

   if (side) {
      side = side.toUpperCase();
   }


   switch (side) {
      case 'LONG':
      case 'BUY':
         badgeColor = 'success';
         break;
      case 'SELL':
      case 'SHORT':
         badgeColor = 'error';
         break;
   }

   return {
      side,
      color: badgeColor
   }
}

export default function StatusBadge({ className = '', type, color = 'disabled', children }) {
   if (type === 'account-type') {
      const parsed = parseSlotStatus(children);

      color = parsed.color;
      children = parsed.type;
   }

   if (type === 'position-side') {
      const parsed = parsePositionSide(children);

      color = parsed.color;
      children = parsed.side;
   }

   return <span
      className={`${className} status-badge`}
      color={color}
   >{children}</span>
}
