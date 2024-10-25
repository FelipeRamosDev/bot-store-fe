import { AccountCircle, Logout } from "@mui/icons-material";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import APIContext from '@/contexts/4HandsAPI';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import LogoIconLight from "@/components/common/logo/LogoIconLight";


export default function AccountMenuMobile({ setSpinner }) {
   const router = useRouter();
   const API = useContext(APIContext);

   async function signOut() {
      setSpinner('Signing Out');

      try {
         await API.auth.signOut();
         router.push('/');
      } catch (error) {
         setSpinner(false);
         throw error;
      }
   }

   return (<>
      <ListItem disablePadding>
         <ListItemButton>
            <ListItemIcon>
               <AccountCircle />
            </ListItemIcon>

            <ListItemText primary="My Profile" />
         </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
         <ListItemButton onClick={() => router.push('/dashboard/user/my-pilots')}>
            <ListItemIcon>
               <LogoIconLight fontSize={20} />
            </ListItemIcon>

            <ListItemText primary="My Pilots" />
         </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
         <ListItemButton onClick={signOut}>
            <ListItemIcon>
               <Logout color="error" />
            </ListItemIcon>

            <ListItemText primary="Sign-out" />
         </ListItemButton>
      </ListItem>
   </>);
}
