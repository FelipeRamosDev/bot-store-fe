function formatFractional(amount, fractional) {
   if (!amount) {
      amount = 0;
   }

   if (typeof amount !== 'number' || typeof fractional !== 'number' || fractional < 0) {
      throw new Error('Invalid input: amount and fractional should be numbers and fractional should be non-negative');
   }

   return Number(amount.toFixed(fractional).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
}

function toMoney(amount, opt) {
   const { fractional = 2, symbol } = Object(opt);
   const value = formatFractional(amount, fractional);

   if (symbol) {
      return `${symbol} ${value}`;
   } else {
      return value;
   }
}

function toMoneyString(amount, opt) {
   const { fractional = 2, currency = 'USD' } = Object(opt);
   const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      fractional
   });

   return formatter.format(amount);
}

function toPercentString(value, opt) {
   const { fractional = 2, fromDecimal = false } = Object(opt);
   if (isNaN(value)) {
      return;
   } else {
      value = Number(value);
   }

   if (!fromDecimal) {
      value = value / 100;
   }

   const formatter = new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: fractional, // Adjust the number of decimal places as needed
      maximumFractionDigits: fractional
   });
   
   return formatter.format(Number(value));
}


function parseValidationErrorMsg(msg) {
   if (typeof msg === 'string' && msg.indexOf('ValidateModel validation failed:') === 0) {
      const removeTitle = msg.replace('ValidateModel validation failed: ', '');
      const listTheErrors = removeTitle.split(',');

      return listTheErrors.map(item => {
         const parsed = item.split(': ');
         return '- ' + parsed[1];
      }).join('\n');
   } else {
      return 'Unkown error caught!';
   }
}

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
   } else if(master.type === 'master-demo') {
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
