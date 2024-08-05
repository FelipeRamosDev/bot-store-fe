'use client';

import { createContext, useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import APIContext from './4HandsAPI';
import LoadingPage from '@/app/loading';
import ErrorPage from '@/app/error';

const AuthUserContext = createContext();
export default AuthUserContext;

export function AuthUserProvider({ children }) {
   const [ userAuth, setUserAuth ] = useState();
   const [ error, setError ] = useState();
   const instance = useContext(APIContext);
   const router = useRouter();

   useEffect(() => {
      if (userAuth) return;

      instance.auth.checkUser().then(authData => {
         if (authData.isLogged) {
            setUserAuth(authData);
         } else {
            router.push('/dashboard/login');
         }
      }).catch(err => {
         setError(err);
         throw err;
      });
   }, [ userAuth, instance.auth, router ]);

   return <AuthUserContext.Provider value={userAuth}>
      {!userAuth && !error && <LoadingPage message="Validating User" />}

      {userAuth && !error && children}
      {error && <ErrorPage error={error} />}
   </AuthUserContext.Provider>
}
