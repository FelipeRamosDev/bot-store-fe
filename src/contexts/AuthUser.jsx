'use client';

import { createContext, useEffect, useState, useContext, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import APIContext from './4HandsAPI';
import LoadingPage from '@/app/loading';
import ErrorPage from '@/app/error';

// Create a context for the authenticated user
const AuthUserContext = createContext();
export default AuthUserContext;

/**
 * AuthUserProvider Component
 *
 * This component provides user authentication state to the React component tree
 * via context. It handles checking the user's authentication status and redirects
 * to the login page if the user is not authenticated. It also manages loading and
 * error states.
 *
 * @param {Object} props - The properties passed to this component.
 * @param {React.ReactNode} props.children - The child components to be rendered if the user is authenticated.
 *
 * @returns {JSX.Element} The context provider component with loading and error handling.
 */
export function AuthUserProvider({ children, rules = [], ...props }) {
   const [userAuth, setUserAuth] = useState();
   const [error, setError] = useState();
   const instance = useContext(APIContext);
   const router = useRouter();
   const userChecked = useRef();
   const searchParams = useSearchParams();
   const updatePlan = searchParams.get('updatePlan');
   const isUpdatePlan = updatePlan === 'true';

   useEffect(() => {
      if (userChecked.current) return;
      userChecked.current = true;

      instance.auth.checkUser().then(authData => {
         const url = new URL(window.location);

         if (authData.error) {
            return setError(authData);
         }

         if (authData.isLogged) {
            const userRoles = authData?.user?.rules || [];
            const hasRequiredRole = rules.length === 0 || rules.some(role => userRoles.includes(role));

            if (!hasRequiredRole) {
               return setError({ error: true, message: 'Unauthorized: Insufficient permissions' });
            }

            if (authData.name === 'USER_EMAIL_NOT_CONFIRMED') {
               return setError(authData);
            }

            const userLetters = authData?.user?.fullName?.split(' ').map(word => word[0]?.toUpperCase() || '').join('') || '';

            window.localStorage.setItem('userLetters', userLetters);
            setUserAuth(authData);

            if (window.location.pathname !== '/subscribe-plan' && !authData?.user?.subscribedPlan) {
               return router.push('/subscribe-plan');
            } else if (window.location.pathname === '/subscribe-plan' && authData?.user?.subscribedPlan && !isUpdatePlan) {
               return router.push('/dashboard');
            }
         } else {
            url.pathname = '/dashboard/login';

            if (window.location.pathname === '/subscribe-plan') {
               url.searchParams.set('register', 'true');
            } else {
               url.searchParams.set('redirect', window.location.pathname);
            }

            router.push(url.toString());
         }
      }).catch(err => {
         setError(err);
      });
   }, [instance.auth, router]);

   return (
      <AuthUserContext.Provider value={userAuth}>
         {!userAuth && !error && <LoadingPage message="Validating User" />}
         {userAuth && !error && children}
         {error && <ErrorPage error={error} {...props} />}
      </AuthUserContext.Provider>
   );
}
