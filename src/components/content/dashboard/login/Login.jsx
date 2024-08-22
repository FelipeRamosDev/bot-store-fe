'use client';
import './Login.scss';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LoginForm from '@/components/forms/loginForm/LoginForm';
import RegisterForm from '@/components/forms/registerForm/RegisterForm';
import Card from '@/components/common/card/Card';
import APIContext from '@/contexts/4HandsAPI';
import { login, register } from './Login.helper';

/**
 * Login component that renders either the login form or the registration form based on the `isRegister` prop.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.isRegister - A flag indicating whether to show the registration form (`true`) or login form (`false`).
 * @returns {JSX.Element} The rendered component.
 */
export default function Login({ isRegister }) {
   const API = useContext(APIContext);
   const router = useRouter();

   const handleLogin = (data) => login(data, API, router);
   const handleRegister = (data) => register(data, API, router);

   return <div className="login-content container text-center">
      {!isRegister && <Card padding="s" elevation={60}>
         <h1 className="card-title">Login to Account</h1>

         <LoginForm onSubmit={handleLogin} />

         <p className="card-title create-message">
            Don&apos;t you have an account yet? <Link
               href="/dashboard/login?register=true"
            >Create Account</Link>
         </p>
      </Card>}

      {isRegister && <Card padding="s" elevation={60}>
         <h1 className="card-title">Create new Account</h1>

         <RegisterForm onSubmit={handleRegister} />

         <p className="card-title create-message">
            Do you already have an account? <Link
               href="/dashboard/login"
            >Login here</Link>
         </p>
      </Card>}
   </div>
}
