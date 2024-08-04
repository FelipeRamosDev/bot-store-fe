import MasterLimitsFormConfig from "./masterLimitsForm/MasterLimitsForm.config";

export default {
   schema: [
      {
         key: 'name',
         type: String,
         required: true
      },
      {
         key: 'description',
         type: String
      },
      {
         key: 'limits',
         type: Object,
         subForm: MasterLimitsFormConfig
      }
   ]
};
