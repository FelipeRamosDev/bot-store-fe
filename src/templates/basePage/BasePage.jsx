import MainFooter from '@/components/footers/mainFooter/MainFooter';
import './BasePage.scss';
import TopHeader from '@/components/headers/topHeader/TopHeader';

export default function BasePage({ children }) {
   return (<>
      <TopHeader />

      <div className="page">
         {children}
      </div>

      <MainFooter />
   </>);
}
