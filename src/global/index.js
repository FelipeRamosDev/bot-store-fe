import ErrorLog from '4hands-api/src/models/ErrorLog';

if (typeof window !== undefined) {
   /**
    * @global
    * @name toError - Build and return a ErroLog object.
    */
   window.toError = function(err) {
      return new ErrorLog(err);
   }
} else {
   /**
    * @global
    * @name toError - Build and return a ErroLog object.
    */
   global.toError = function(err) {
      return new ErrorLog(err);
   }
}
