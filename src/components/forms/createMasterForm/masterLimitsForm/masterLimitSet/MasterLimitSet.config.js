const masterLimitSet = {
   schema: [
      {
         key: 'money',
         type: Number,
         label: 'Trade Loss Amount',
         placeholder: 'Enter a value...',
         defaultValue: 0
      },
      {
         key: 'percent',
         type: Number,
         label: 'Trade Loss Percent',
         placeholder: 'Enter a value...',
         defaultValue: 0
      },
      {
         key: 'customResumeDayTime',
         type: String,
         defaultValue: '09:30:00'
      },
   ]
};

export default masterLimitSet;
