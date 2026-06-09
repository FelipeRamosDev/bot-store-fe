import MyProfile from "@/components/content/dashboard/myProfile/MyProfile";
import AuthBasePage from "@/templates/authBasePage/AuthBasePage";

export default function MyProfilePage({ ...props }) {
   return (
      <AuthBasePage {...props}>
         <MyProfile />
      </AuthBasePage>
   );
}
