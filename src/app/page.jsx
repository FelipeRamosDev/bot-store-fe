import BasePage from '@/templates/basePage/BasePage';
import HomeContent from '@/components/content/home/Home';

export const metadata = {
   title: 'Home | CandlePilot',
   description: 'Discover trading bots and automate cryptocurrency strategies with CandlePilot.',
};

/**
 * HomePage Component
 *
 * This component renders the Home page for the application.
 * It uses the `BasePage` template to structure the layout and includes
 * both the `HomeTopBanner` and `HomeContent` components to display the
 * top banner and main content of the Home page.
 *
 * @returns {JSX.Element} The rendered Home page with a top banner and content.
 */
export default function HomePage() {
   return (
      <BasePage className="home-page" fullContainer={false}>
         <HomeContent />
      </BasePage>
   );
}
