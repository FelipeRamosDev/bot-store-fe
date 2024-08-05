'use client';

export default function ErrorPage({ error = { name: 'Unknown Error', message: 'The server got an unskown error!'} }) {
   return <>
      <h1>{error.name}</h1>
      <p>{error.message}</p>
   </>;
}
