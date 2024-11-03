'use client';

import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { FormControl, FormHelperText, TextField } from '@mui/material';
import { parseClassName } from '@/helpers/parser';

export default function SearchSelectInput({ className = '', errors = [], schema = {}, fullWidth = true, onChange = () => {}, ...props }) {
   const { label, options = [], style, inputType = 'text', placeholder, color = 'tertiary' } = schema;
   const [ open, setOpen ] = useState(false);
   let defaultValue;
   let inputMode = schema.inputMode;

   if (schema.form.editMode) {
      defaultValue = schema.getEditValue();
   }

   if (!schema.inputMode) {
      switch (inputType) {
         case 'number':
            inputMode = 'numeric';
            break;
      }
   }

   const handleOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   return (
      <FormControl color="tertiary" className={parseClassName(className, [ 'search-select-input' ])} style={style} variant="filled" error={errors.length}>
         <Autocomplete
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            isOptionEqualToValue={(option, value) => option?.value === value?.value}
            getOptionLabel={(option) => option?.label}
            options={options}
            onChange={(ev, opt) => onChange({ target: { value: opt?.value }})}
            renderInput={(params) => (
               <TextField
                  {...params}
                  label={label}
                  schema={schema}
                  type={inputType}
                  inputMode={inputMode}
                  placeholder={placeholder}
                  variant="filled"
                  color={color}
                  error={errors.length}
                  fullWidth={fullWidth}
                  {...props}
                  defaultValue={defaultValue}
               />
            )}
         />

         {errors.map(err => <FormHelperText key={Math.random()}>{err?.message}</FormHelperText>)}
      </FormControl>
   );
}
