export const loginForm = {
   schema: [
      {
         key: 'email',
         type: String,
         required: true,
         validators: [
            function(value) {
               const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

               if (!emailRegex.test(value)) {
                  this.setError('Bad Email Format', 'The email provided is out of e-mail standards! For example: "joseph@gmail.com"');
                  return false;
               } else {
                  this.clearError('Bad Email Format');
                  return true;
               }
            }
         ]
      },
      {
         key: 'password',
         type: String,
         required: true,
         validators: [
            function(value) {
               const lowercaseRegex = /[a-z]/;

               if (!lowercaseRegex.test(value)) {
                  this.setError('Lowercase Character Required', 'At least one Lowercase character is required on the password!');
                  return false;
               } else {
                  this.clearError('Lowercase Character Required');
                  return true;
               }
            },
            function(value) {
               const uppercaseRegex = /[A-Z]/;

               if (!uppercaseRegex.test(value)) {
                  this.setError('Uppercase Character Required', 'At least one Uppercase character is required on the password!');
                  return false;
               } else {
                  this.clearError('Uppercase Character Required');
                  return true;
               }
            },
            function(value) {
               const numberRegex = /\d/;

               if (!numberRegex.test(value)) {
                  this.setError('Number Character Required', 'At least one Number character is required on the password!');
                  return false;
               } else {
                  this.clearError('Number Character Required');
                  return true;
               }
            },
            function(value) {
               const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

               if (!specialCharRegex.test(value)) {
                  this.setError('Special Character Required', 'At least one Special Character is required on the password!');
                  return false;
               } else {
                  this.clearError('Special Character Required');
                  return true;
               }
            },
            function(value) {
               if (typeof value === 'string' && value.length < 8) {
                  this.setError('Minimum Character Required', 'At least one Minimum character is required on the password!');
                  return false;
               } else if (typeof value === 'string') {
                  this.clearError('Minimum Character Required');
                  return true;
               } else {
                  return false;
               }
            }
         ]
      }
   ]
};
