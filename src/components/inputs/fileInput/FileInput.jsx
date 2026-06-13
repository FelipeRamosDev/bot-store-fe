import { FormHelperText } from "@mui/material";

export default function FileInput({ schema, errors = [], fullWidth = true, ...props }) {
   const handleChange = (ev) => {
      const files = ev?.target?.files;
      props.onChange?.(files);
   }

   return (
      <div className="file-input">
         {schema?.label && <label>{schema.label}</label>}
         <input {...props} type="file" className="file-input-elt" onChange={handleChange} />

         {errors.map(err => <FormHelperText key={Math.random()}>{err?.message}</FormHelperText>)}
      </div>
   );
}
