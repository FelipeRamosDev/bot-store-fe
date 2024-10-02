import { APIProvider } from '@/contexts/4HandsAPI';
import { AuthUserProvider } from '@/contexts/AuthUser';

export default function RootAuthProvider({ children }) {
   return (
      <APIProvider>
         <AuthUserProvider>
            {children}
         </AuthUserProvider>
      </APIProvider>
   );
}
