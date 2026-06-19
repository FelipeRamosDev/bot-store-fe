/**
 * SettingRow component displays a setting label and its corresponding value.
 * It supports rendering both static text and custom components for labels and values.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {string} [props.label] - Static label text.
 * @param {string} [props.value] - Static value text.
 * @param {React.Component} [props.Label] - Custom component for rendering the label.
 * @param {React.Component} [props.Value] - Custom component for rendering the value.
 * @returns {JSX.Element} A div containing a label and value for a setting.
 */
export default function SettingRow({ label, value, Label, Value }) {
   return  <div className="setting">
      <div className="setting-label column">
         {label && <label>{label}</label>}
         {Label ? <Label /> : ''}
      </div>
      <div className="setting-value column">
         {value && <p>{value}</p>}
         {Value ? <Value /> : ''}
      </div>
   </div>;
}
