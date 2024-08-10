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
