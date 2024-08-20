import './StatusBadge.scss';

function parseSlotType(type) {
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

function parseSlotStutus(status) {
   let badgeStatus = '';
   let badgeColor = '';

   switch (status) {
      case 'running':
         badgeStatus = 'RUNNING';
         badgeColor = 'success';
         break;
      case 'paused':
         badgeStatus = 'PAUSED';
         badgeColor = 'warn';
         break;
      case 'stopped':
         badgeStatus = 'STOPPED';
         break;
   }

   return {
      status: badgeStatus,
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

export default function StatusBadge({ className = '', type, variant, color = 'disabled', children }) {
   if (type === 'slot-status') {
      const parsed = parseSlotStutus(children);

      color = parsed.color;
      children = parsed.status;
   }

   if (type === 'account-type') {
      const parsed = parseSlotType(children);

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
      variant={variant}
   >{children}</span>
}
