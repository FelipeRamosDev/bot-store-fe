import { AuthUserProvider } from '@/contexts/AuthUser';
import BasePage from '../basePage/BasePage';

export default function AuthBasePage({ children }) {
   return <BasePage>
      <AuthUserProvider>
         {children}
      </AuthUserProvider>
   </BasePage>
}
