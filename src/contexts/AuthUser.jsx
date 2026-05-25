'use client';

import { createContext, useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
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
export function AuthUserProvider({ children }) {
   const [ userAuth, setUserAuth ] = useState();
   const [ error, setError ] = useState();
   const instance = useContext(APIContext);
   const router = useRouter();

   useEffect(() => {
      if (userAuth) return;

      instance.auth.checkUser().then(authData => {
         if (authData.isLogged) {
            const userLetters = authData?.user?.fullName.split(' ').map(word => word[0]?.toUpperCase() || '').join('');

            window.localStorage.setItem('userLetters', userLetters);
            setUserAuth(authData);
         } else {
            router.push('/dashboard/login');
         }
      }).catch(err => {
         setError(err);
         throw err;
      });
   }, [ userAuth, instance.auth, router ]);

   return (
      <AuthUserContext.Provider value={userAuth}>
         {!userAuth && !error && <LoadingPage message="Validating User" />}
         {userAuth && !error && children}
         {error && <ErrorPage error={error} />}
      </AuthUserContext.Provider>
   );
}
