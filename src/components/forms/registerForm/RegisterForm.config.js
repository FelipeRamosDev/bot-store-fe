const passwordValidators = [
   function(value) {
      const lowercaseRegex = /[a-z]/;

      if (!lowercaseRegex.test(value)) {
         this.setError('LOWERCASE_REQUIRED', 'Lowercase character is required!');
         return false;
      } else {
         this.clearError('LOWERCASE_REQUIRED');
         return true;
      }
   },
   function(value) {
      const uppercaseRegex = /[A-Z]/;

      if (!uppercaseRegex.test(value)) {
         this.setError('UPPERCASE_REQUIRED', 'Uppercase character is required!');
         return false;
      } else {
         this.clearError('UPPERCASE_REQUIRED');
         return true;
      }
   },
   function(value) {
      const numberRegex = /\d/;

      if (!numberRegex.test(value)) {
         this.setError('NUMBER_REQUIRED', 'Number character is required!');
         return false;
      } else {
         this.clearError('NUMBER_REQUIRED');
         return true;
      }
   },
   function(value) {
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

      if (!specialCharRegex.test(value)) {
         this.setError('SPECIAL_CHAR_REQUIRED', 'Special character is required!');
         return false;
      } else {
         this.clearError('SPECIAL_CHAR_REQUIRED');
         return true;
      }
   },
   function(value) {
      if (typeof value === 'string' && value.length < 8) {
         this.setError('MIN_CHAR_REQUIRED', 'Minimum character is required!');
         return false;
      } else if (typeof value === 'string') {
         this.clearError('MIN_CHAR_REQUIRED');
         return true;
      } else {
         return false;
      }
   }
];

export const registerForm = {
   schema: [
      {
         key: 'firstName',
         type: String,
         required: true
      },
      {
         key: 'lastName',
         type: String,
         required: true
      },
      {
         key: 'email',
         type: String,
         required: true,
         validators: [
            function(value) {
               const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

               if (!emailRegex.test(value)) {
                  this.setError('BAD_PASSWORD_FORMAT', 'The email provided is out of e-mail standards! For example: "joseph@gmail.com"');
                  return false;
               } else {
                  this.clearError('BAD_PASSWORD_FORMAT');
                  return true;
               }
            }
         ]
      },
      {
         key: 'password',
         type: String,
         required: true,
         validators: passwordValidators
      },
      {
         key: 'confirmPassword',
         type: String,
         required: true,
         validators: [
            function(value) {
               if (this.form.getValue('password') !== value) {
                  this.setError('PASSWORD_NOT_MATCH', `The passwords doesn't match!`);
               } else {
                  this.clearError('PASSWORD_NOT_MATCH');
               }
            }
         ]
      }
   ]
};
