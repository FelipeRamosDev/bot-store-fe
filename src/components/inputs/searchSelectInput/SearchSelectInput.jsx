'use client';

import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { Chip, FormControl, FormHelperText, TextField } from '@mui/material';
import { parseClassName } from '@/helpers/parser';

export default function SearchSelectInput({ className = '', errors = [], schema = {}, fullWidth = true, onChange = () => {}, ...props }) {
   const { label, options = [], style, inputType = 'text', placeholder, color = 'tertiary', multiOptions = false, ListItem = () => {} } = schema;
   const [ open, setOpen ] = useState(false);
   const [ value, setValue ] = useState();
   let inputMode = schema.inputMode;
   const fixedOptions = [];
   let defaultValue;

   if (schema.form.editMode) {
      const editValue = schema.getEditValue();

      if (multiOptions) {
         if (typeof editValue === 'string') {
            defaultValue = [ editValue ];
         }
         
         else if (Array.isArray(editValue)) {
            defaultValue = editValue.map(item => options.find(opt => opt.value === item)).filter(item => item);
         }
      } else {
         if (typeof editValue === 'string') {
            defaultValue = options.find(opt => opt.value === editValue);
         }
         
         else if (Array.isArray(editValue) && editValue.length) {
            defaultValue = options.find(opt => opt.value === editValue[0]);
         }
      }
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
      <FormControl color="tertiary" className={parseClassName(className, ['search-select-input', multiOptions ? 'multi-options' : ''])} style={style} variant="filled" error={errors.length}>
         <Autocomplete
            multiple={multiOptions}
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            isOptionEqualToValue={(option, value) => option?.value === value?.value}
            getOptionLabel={(option) => option?.label}
            options={options.sort((a, b) => b.quoteVolume - a.quoteVolume)}
            value={value || defaultValue}
            onChange={(ev, opt) => {
               if (multiOptions) {
                  const newValue = [
                     ...fixedOptions,
                     ...opt.filter((option) => !fixedOptions.includes(option)),
                  ];
   
                  onChange({ target: { value: newValue.map(item => item.value) } });
                  setValue(newValue);
               } else {
                  const newValue = opt?.value;

                  onChange({ target: { value: newValue }});
                  setValue(opt);
               }
            }}
            ListboxProps={{ className: parseClassName(props.className, ['options-wrap']) }}
            renderOption={(props, option) => <ListItem option={option} itemProps={props} />}
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
               />
            )}
            renderTags={multiOptions ? (tagValue, getTagProps) => (
               tagValue.map((option, index) => {
                  const { key, ...tagProps } = getTagProps({ index });

                  return (
                     <Chip
                        key={key}
                        label={option.label}
                        {...tagProps}
                        disabled={fixedOptions.includes(option)}
                     />
                  );
               })
            ) : undefined}
         />

         {errors.map(err => <FormHelperText key={Math.random()}>{err?.message}</FormHelperText>)}
      </FormControl>
   );
}
