import { APIProvider } from '@/contexts/4HandsAPI';
import { AuthUserProvider } from '@/contexts/AuthUser';

export default function RootAuthProvider({ children, rules = [], ...props }) {
   return (
      <APIProvider>
         <AuthUserProvider rules={rules} {...props}>
            {children}
         </AuthUserProvider>
      </APIProvider>
   );
}
