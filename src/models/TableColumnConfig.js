export default class TableColumnConfig {
   constructor (setup) {
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
