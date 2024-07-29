import './StatusBadge.scss';

function parseSlotStatus(type) {
   let badgeType = '';
   let badgeColor = '';

   switch (type) {
      case 'slot-live':
         badgeType = 'LIVE';
         badgeColor = 'success';
         break;
      case 'slot-demo':
         badgeType = 'DEMO';
         badgeColor = 'warn';
         break;
   }

   return {
      type: badgeType,
      color: badgeColor
   }
}

export default function StatusBadge({ className = '', type, color = 'disabled', children }) {
   if (type === 'slot-status') {
      const parsed = parseSlotStatus(children);

      color = parsed.color;
      children = parsed.type;
   }

   return <span
      className={`${className} status-badge`}
      color={color}
   >{children}</span>
}
