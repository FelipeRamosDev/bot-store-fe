'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { confirmEmail } from './EmailConfirmation.helper';
import { API } from '@/contexts/4HandsAPI';

/**
 * `EmailConfirmation` is a React component that handles the email confirmation process.
 * It uses the provided confirmation token to confirm the email address via an API call.
 * 
 * @param {Object} props - The props object.
 * @param {string} props.confirmationToken - The token used to confirm the email address.
 * 
 * @returns {JSX.Element} An empty React fragment.
 */
export default function EmailConfirmation({ confirmationToken }) {
   const router = useRouter();

   useEffect(() => {
      confirmEmail(API, confirmationToken, router).catch(err => {
         throw err;
      });
   }, [ API, confirmationToken, router ]);

   return <></>;
}
