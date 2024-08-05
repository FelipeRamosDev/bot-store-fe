import MainFooter from '@/components/footers/mainFooter/MainFooter';
import './BasePage.scss';
import TopHeader from '@/components/headers/topHeader/TopHeader';

export default function BasePage({ className = '', fullContainer, headerMenu, children }) {
   return (<>
      <TopHeader fullContainer={fullContainer} type={headerMenu} />

      <div className={`page ${className}`}>
         {children}
      </div>

      <MainFooter className="absolute-bottom" />
   </>);
}
