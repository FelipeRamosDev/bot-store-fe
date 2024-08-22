/**
 * Formats a number with a specific number of fractional digits and applies thousand separators.
 *
 * @param {number} amount - The number to format.
 * @param {number} fractional - The number of fractional digits.
 * @returns {number} - The formatted number.
 * @throws {Error} - If amount or fractional are not numbers or if fractional is negative.
 */
function formatFractional(amount, fractional) {
   if (amount === null || amount === undefined) {
      amount = 0;
   }

   if (typeof amount !== 'number' || typeof fractional !== 'number' || fractional < 0) {
      throw new Error('Invalid input: amount and fractional should be numbers, and fractional should be non-negative.');
   }

   return Number(amount.toFixed(fractional).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
}

/**
 * Converts a number to a money format with an optional currency symbol.
 *
 * @param {number} amount - The amount of money.
 * @param {Object} opt - Optional settings.
 * @param {number} [opt.fractional=2] - Number of decimal places.
 * @param {string} [opt.symbol] - Currency symbol to prepend.
 * @returns {string} - The formatted money string.
 */
function toMoney(amount, opt) {
   const { fractional = 2, symbol } = Object(opt);
   const value = formatFractional(amount, fractional);

   return symbol ? `${symbol} ${value}` : value;
}

/**
 * Converts a number to a currency string using Intl.NumberFormat.
 *
 * @param {number} amount - The amount of money.
 * @param {Object} opt - Optional settings.
 * @param {number} [opt.fractional=2] - Number of decimal places.
 * @param {string} [opt.currency='USD'] - Currency code.
 * @returns {string} - The formatted currency string.
 */
function toMoneyString(amount, opt) {
   const { fractional = 2, currency = 'USD' } = Object(opt);
   const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: fractional,
      maximumFractionDigits: fractional
   });

   return formatter.format(amount);
}

/**
 * Converts a number to a percent string.
 *
 * @param {number} value - The value to convert.
 * @param {Object} opt - Optional settings.
 * @param {number} [opt.fractional=2] - Number of decimal places.
 * @param {boolean} [opt.fromDecimal=false] - Whether the value is already a decimal.
 * @returns {string} - The formatted percent string.
 */
function toPercentString(value, opt) {
   const { fractional = 2, fromDecimal = false } = Object(opt);

   if (isNaN(value)) {
      return '';
   }

   value = Number(value);
   if (!fromDecimal) {
      value = value / 100;
   }

   const formatter = new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: fractional,
      maximumFractionDigits: fractional
   });

   return formatter.format(value);
}

/**
 * Parses a validation error message into a more readable format.
 *
 * @param {string} msg - The error message.
 * @returns {string} - The parsed error message.
 */
function parseValidationErrorMsg(msg) {
   if (typeof msg === 'string' && msg.startsWith('ValidateModel validation failed:')) {
      const errorList = msg.replace('ValidateModel validation failed: ', '').split(',');

      return errorList.map(item => {
         const parsed = item.split(': ');
         return `- ${parsed[1]}`;
      }).join('\n');
   } else {
      return 'Unknown error caught!';
   }
}

/**
 * Formats master badges based on the master data.
 *
 * @param {Object} master - The master data.
 * @param {number} master.pnl - Profit and Loss value.
 * @param {string} master.type - Type of master ('master-live' or 'master-demo').
 * @returns {Object} - Object containing edgeColor, badgeColor, and accountType.
 */
function formatMasterBadges(master) {
   let edgeColor = 'disabled';
   let badgeColor = 'disabled';
   let accountType = '---';

   if (!master) {
      return {};
   }

   if (master.pnl === 0) {
      edgeColor = 'disabled';
   } else if (master.pnl > 0) {
      edgeColor = 'success';
   } else if (master.pnl < 0) {
      edgeColor = 'error';
   }

   if (master.type === 'master-live') {
      accountType = 'LIVE';
      badgeColor = 'success';
   } else if (master.type === 'master-demo') {
      accountType = 'DEMO';
      badgeColor = 'warn';
   }

   return {
      edgeColor,
      badgeColor,
      accountType
   };
}

module.exports = {
   toMoney,
   toMoneyString,
   toPercentString,
   formatFractional,
   parseValidationErrorMsg,
   formatMasterBadges
};
