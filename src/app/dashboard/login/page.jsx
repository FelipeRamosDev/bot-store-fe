import Login from "@/components/content/dashboard/login/Login";
import BasePage from "@/templates/basePage/BasePage";

export default function LoginPage({ searchParams: { register } }) {
   return <BasePage className="login-page" fullContainer={false}>
      <Login isRegister={Boolean(register)} />
   </BasePage>;
}
