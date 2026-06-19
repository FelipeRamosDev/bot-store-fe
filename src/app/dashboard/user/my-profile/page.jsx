import MyProfile from "@/components/content/dashboard/myProfile/MyProfile";
import AuthBasePage from "@/templates/authBasePage/AuthBasePage";

export const metadata = {
   title: 'My Profile | CandlePilot',
   description: 'Update your account details and profile settings.',
};

export default function MyProfilePage({ ...props }) {
   return (
      <AuthBasePage {...props}>
         <MyProfile />
      </AuthBasePage>
   );
}
