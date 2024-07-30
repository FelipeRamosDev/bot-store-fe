import "./Login.scss";
import Card from "@/components/common/card/Card";

export default function Login({ type = 'login' }) {
   return <div className="login-content">
      <Card padding="s" elevation={60}>
         <h1 className="card-title text-center">Login to Account</h1>

         
      </Card>
   </div>
}
