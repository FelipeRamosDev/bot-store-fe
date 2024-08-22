/**
 * TableColumnConfig Class
 *
 * This class represents the configuration for a column in a table. 
 * It defines how the column is rendered, styled, and aligned.
 */
export default class TableColumnConfig {
   /**
    * Creates an instance of TableColumnConfig.
    *
    * @param {Object} setup - Configuration settings for the table column.
    * @param {string} [setup.id] - Unique identifier for the column. Defaults to a random value.
    * @param {string} [setup.propKey=''] - Key used to access the column's data from the row item.
    * @param {string} [setup.label=''] - The label or header text for the column.
    * @param {string} [setup.align='left'] - The text alignment for the column ('left', 'right', 'center').
    * @param {Function} [setup.format=(value, item, config) => value] - A function to format the cell value.
    * @param {Object} [setup.style={}] - CSS style object to apply to the column.
    */
   constructor(setup) {
      const {
         id = (Math.random() * 1000000000).toFixed(0),
         propKey = '',
         label = '',
         align = 'left',
         format = (value, item, config) => value,
         style = {},
      } = Object(setup);

      this.id = id;
      this.propKey = propKey;
      this.label = label;
      this.format = format;
      this.align = align;
      this.style = style;
   }
}
