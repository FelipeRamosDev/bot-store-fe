'use client';

import EmailNotConfirmed from "@/components/content/dashboard/emailNotConfirmed/EmailNotConfirmed";

/**
 * ErrorPage Component
 *
 * This component renders an error page when an error occurs on the client side.
 * It displays the error's name and message to the user.
 *
 * @param {Object} props - The properties passed to this component.
 * @param {Object} [props.error] - The error object containing details about the error.
 * @param {string} [props.error.name='Unknown Error'] - The name of the error.
 * @param {string} [props.error.message='The server got an unknown error!'] - The message describing the error.
 *
 * @returns {JSX.Element} The rendered error page.
 */
export default function ErrorPage({ searchParams, error = { name: 'Unknown Error', message: 'The server got an unknown error!' } }) {
   if (error.name === 'USER_EMAIL_NOT_CONFIRMED') {
      const confirmationSent = searchParams.confirmationsent;
      
      return <EmailNotConfirmed error={error} confirmationSent={confirmationSent} />;
   }

   return (
      <>
         <h1>{error.name}</h1>
         <p>{error.message}</p>
      </>
   );
}
