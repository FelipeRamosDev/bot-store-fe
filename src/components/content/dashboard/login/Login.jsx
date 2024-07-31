'use client';
import "./Login.scss";
import { useRouter } from 'next/navigation';
import LoginForm from "@/components/forms/loginForm/LoginForm";
import RegisterForm from "@/components/forms/registerForm/RegisterForm";
import Card from "@/components/common/card/Card";
import Link from "next/link";

export default function Login({ isRegister }) {
   const router = useRouter();

   return <div className="login-content container text-center">
      {!isRegister && <Card padding="s" elevation={60}>
         <h1 className="card-title">Login to Account</h1>

         <LoginForm onSubmit={(ev) => {
            ev.preventDefault();

            router.push('/dashboard');
         }}/>

         <p className="card-title create-message">
            Don&apos;t you have an account yet? <Link
               href="/dashboard/login?register=true"
            >Create Account</Link>
         </p>
      </Card>}

      {isRegister && <Card padding="s" elevation={60}>
         <h1 className="card-title">Create new Account</h1>

         <RegisterForm onSubmit={(ev, form) => {
            ev.preventDefault();

            console.log(form.toObject());
            // router.push('/dashboard');
         }}/>

         <p className="card-title create-message">
            Do you already have an account? <Link
               href="/dashboard/login"
            >Login here</Link>
         </p>
      </Card>}
   </div>
}
