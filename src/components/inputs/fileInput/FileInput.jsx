export default function FileInput({ schema, errors = [], fullWidth = true, onChange, ...props }) {
   const handleChange = (ev) => {
      const files = ev?.target?.files;
      onChange?.(files);
   }

   return (
      <div className="file-input">
         <input {...props} type="file" className="file-input-elt" onChange={handleChange} />

         {errors.map(err => <FormHelperText key={Math.random()}>{err?.message}</FormHelperText>)}
      </div>
   );
}
