function formatFractional(amount, fractional) {
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
   const { fractional = 2, symbol = '$' } = Object(opt);
   return toMoney(amount, { fractional, symbol });
}

module.exports = {
   toMoney,
   toMoneyString,
   formatFractional
};
