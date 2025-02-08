import { APIProvider } from '@/contexts/4HandsAPI';
import { AuthUserProvider } from '@/contexts/AuthUser';

export default function RootAuthProvider({ children, ...props }) {
   return (
      <APIProvider>
         <AuthUserProvider {...props}>
            {children}
         </AuthUserProvider>
      </APIProvider>
   );
}
