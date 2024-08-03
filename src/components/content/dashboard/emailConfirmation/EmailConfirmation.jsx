'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { confirmEmail } from './EmailConfirmation.helper';
import APIContext from '@/contexts/4HandsAPI';

export default function EmailConfirmation({ confirmationToken }) {
   const API = useContext(APIContext);
   const router = useRouter();

   useEffect(() => {
      confirmEmail(API, confirmationToken, router).catch(err => {
         throw err;
      });
   }, [ API, confirmationToken, router ]);

   return <></>;
}
