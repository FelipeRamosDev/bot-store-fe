/**
 * Model to build a line chart configuration set.
 * 
 * @class LineChartConfig
 */
export default class LineChartConfig {
   /**
    * @constructor
    * @param {Object} setup - The line chart configurations
    * @param {string} setup.id - An unique identification for the line.
    * @param {string} setup.label - Label for the line that will be displayed to the user.
    * @param {Array} setup.values - Array with the values of line chart.
    * @param {string} setup.lineColor - The custom color to used on the line.
    */
   constructor (setup = {}) {
      const { id, label, values = [], lineColor } = setup;

      if (!id) {
         throw new Error(`The "id" param is required!`);
      }

      this.id = id;
      this.label = label;
      this.values = values;
      this.lineColor = lineColor;
   }

   setChart(chart) {
      if (chart) {
         this.chart = chart;
      }
   }
}
