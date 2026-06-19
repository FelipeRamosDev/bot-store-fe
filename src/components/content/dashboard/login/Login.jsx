'use client';
import { useState } from 'react';
import Link from 'next/link';
import LoginForm from '@/components/forms/loginForm/LoginForm';
import RegisterForm from '@/components/forms/registerForm/RegisterForm';
import Card from '@/components/common/card/Card';
import { Key } from '@mui/icons-material';
import ForgotPasswordForm from '@/components/forms/forgotPasswordForm/ForgotPasswordForm';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import useUser from '@/hooks/useUser';

/**
 * Login component that renders either the login form or the registration form based on the `isRegister` prop.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.isRegister - A flag indicating whether to show the registration form (`true`) or login form (`false`).
 * @returns {JSX.Element} The rendered component.
 */
export default function Login({ isRegister, isForgotPassword }) {
   const [ isSent, setIsSent ] = useState(null);
   const { register, login, forgotPassword } = useUser();

   const cardOpt = {
      padding: 's',
      radius: 'xs',
      elevation: 60
   };

   const iconOpt = {
      fontSize: 'large'
   }

   const handleLogin = (data) => login(data);
   const handleRegister = (data) => register(data);
   const handleForgotPassword = (data) => forgotPassword(data, setIsSent);

   return <div className="login-content container text-center">
      {!isRegister && !isForgotPassword && <Card {...cardOpt}>
         <h1 className="card-title"><Key {...iconOpt} /> Login</h1>

         <LoginForm onSubmit={handleLogin} />

         <p className="create-message">
            Don&apos;t you have an account yet? <Link
               href="/dashboard/login?register=true"
            >Create Account</Link>
         </p>
      </Card>}

      {!isRegister && isForgotPassword && <Card {...cardOpt}>
         <h1 className="card-title"><Key {...iconOpt} /> Forgot my password</h1>

         {isSent === 'success' && (
            <div className="callback success">
               <CheckCircleIcon fontSize="large" />

               <p className="callback-text">
                  Reset password e-mail sent! Check your inbox and click on the link received to create a new password.
               </p>
            </div>
         )}

         {isSent === 'fail' && (
            <div className="callback fail">
               <CheckCircleIcon fontSize="large" />

               <p className="callback-text">
                  Something when wrong and the email was not sent! Please try again.
               </p>
            </div>
         )}

         <ForgotPasswordForm onSubmit={handleForgotPassword} />
      </Card>}

      {isRegister && !isForgotPassword && <Card {...cardOpt}>
         <h1 className={`card-title ${isRegister ? 'register' : ''}`}><Key {...iconOpt} /> Create</h1>

         <RegisterForm onSubmit={handleRegister} />

         <p className="create-message">
            Do you already have an account? <Link
               href="/dashboard/login"
            >Login here</Link>
         </p>
      </Card>}
   </div>
}
