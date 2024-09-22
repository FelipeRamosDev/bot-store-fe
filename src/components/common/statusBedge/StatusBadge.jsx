import './StatusBadge.scss';

/**
 * Parses and returns badge type and color based on the given slot type.
 *
 * @param {string} type - The slot type.
 * @returns {Object} An object with `type` and `color` properties.
 */
function parseSlotType(type, isMinified) {
   let badgeType = '';
   let badgeColor = '';

   switch (type) {
      case 'slot-live':
      case 'master-live':
      case 'position-live':
         if (isMinified) {
            badgeType = 'L';
         } else {
            badgeType = 'LIVE';
         }

         badgeColor = 'success';
         break;
      case 'slot-demo':
      case 'master-demo':
      case 'position-demo':
         if (isMinified) {
            badgeType = 'D';
         } else {
            badgeType = 'DEMO';
         }

         badgeColor = 'warn';
         break;
   }

   return {
      type: badgeType,
      color: badgeColor
   }
}

/**
 * Parses and returns badge status and color based on the given slot status.
 *
 * @param {string} status - The slot status.
 * @returns {Object} An object with `status` and `color` properties.
 */
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
      case 'opening-position':
         badgeStatus = 'OPENING TRADE';
         badgeColor = 'warn';
         break;
      case 'closing-position':
         badgeStatus = 'CLOSING TRADE';
         badgeColor = 'warn';
         break;
      case 'fixing-position':
         badgeStatus = 'FIXING POSITION';
         badgeColor = 'warn';
         break;
      case 'starting':
         badgeStatus = 'STARTING';
         badgeColor = 'warn';
         break;
      case 'stopping':
         badgeStatus = 'STOPPING';
         badgeColor = 'warn';
         break;
      case 'stopped':
         badgeStatus = 'STOPPED';
         break;
      case 'error':
         badgeStatus = 'ERROR';
         badgeColor = 'error';
         break;
   }

   return {
      status: badgeStatus,
      color: badgeColor
   }
}

function parsePositionStatus(status) {
   let badgeColor = 'disabled';

   switch (status) {
      case 'opened':
         badgeColor = 'success';
         break;
      case 'opening-position':
      case 'closing-position':
      case 'fixing-position':
      case 'closed':
         badgeColor = 'warn';
         break;
      case 'error':
         badgeColor = 'error';
         break;
   }

   return {
      status: status.toUpperCase(),
      color: badgeColor
   }
}

/**
 * Parses and returns badge side and color based on the given position side.
 *
 * @param {string} side - The position side.
 * @returns {Object} An object with `side` and `color` properties.
 */
function parsePositionSide(side, isMinified) {
   let badgeColor = 'disabled';

   if (side) {
      side = side.toUpperCase();
   }

   switch (side) {
      case 'LONG':
      case 'BUY':
         if (isMinified) {
            side = 'B'
         }

         badgeColor = 'success';
         break;
      case 'SELL':
      case 'SHORT':
         if (isMinified) {
            side = 'S'
         }

         badgeColor = 'error';
         break;
   }

   return {
      side,
      color: badgeColor
   }
}

export function parseOrderStatus(status) {
   let badgeColor = 'disabled';

   switch (status) {
      case 'FILLED':
         badgeColor = 'success';
         break;
      case 'CANCELED':
         badgeColor = 'error';
         break;
   }

   return badgeColor;
}

/**
 * `StatusBadge` is a component that displays a badge with a status or type.
 * The badge appearance is based on the provided `type` and `children` values.
 *
 * @param {Object} props - The props object.
 * @param {string} [props.className=''] - Additional CSS classes to apply to the badge.
 * @param {string} [props.type=''] - The type of badge to display (e.g., 'slot-status', 'account-type', 'position-side').
 * @param {string} [props.variant] - The variant of the badge (e.g., 'outlined', 'contained').
 * @param {boolean} [props.minified=false] - Set to true if you want the minified view.
 * @param {string} [props.color='disabled'] - The color of the badge.
 * @param {string} [props.children] - The content to display inside the badge.
 *
 * @returns {JSX.Element} The rendered `span` element with the badge.
 */
export default function StatusBadge({ className = '', type, variant, color = 'disabled', minified = false, children }) {
   if (type === 'slot-status') {
      const parsed = parseSlotStutus(children, minified);

      color = parsed.color;
      children = parsed.status;
   }

   if (type === 'account-type') {
      const parsed = parseSlotType(children, minified);

      color = parsed.color;
      children = parsed.type;
   }

   if (type === 'position-side') {
      const parsed = parsePositionSide(children, minified);

      color = parsed.color;
      children = parsed.side;
   }

   if (type === 'position-status') {
      const parsed = parsePositionStatus(children);

      color = parsed.color;
      children = parsed.status;
   }

   if (type === 'order-status') {
      const parsedColor = parseOrderStatus(children, minified);
      color = parsedColor;
   }

   return <span
      className={`${className} status-badge`}
      color={color}
      variant={variant}
   >{children}</span>
}
