import React from 'react';
import MainFooter from '@/components/footers/mainFooter/MainFooter';
import TopHeaderPublic from '@/components/headers/topHeader/TopHeaderPublic';

/**
 * `BasePage` is a layout component that includes a top header and a main footer. 
 * It serves as a wrapper for the main content of a page, providing a consistent layout structure.
 *
 * @param {Object} props - The props for the component.
 * @param {string} [props.className=''] - Optional additional CSS class names to apply to the main content container.
 * @param {boolean} [props.fullContainer=false] - Determines if the container should span the full width of the viewport.
 * @param {string} [props.headerMenu] - Optional type for the `TopHeader` component to determine the header menu configuration.
 * @param {React.ReactNode} props.CustomHeader - The custom header component.
 * @param {React.ReactNode} props.children - The content to be rendered within the `BasePage`.
 *
 * @returns {JSX.Element} The rendered `BasePage` component with a `TopHeader`, content area, and `MainFooter`.
 */
export default function BasePage({ className = '', fullContainer, headerMenu, CustomHeader, children }) {
   return (
      <main className={`${className} base-page`}>
         {!CustomHeader && <TopHeaderPublic fullContainer={fullContainer} type={headerMenu} />}
         {CustomHeader && <CustomHeader fullContainer={fullContainer} type={headerMenu} />}

         <div className={`page-content`}>
            {children}
         </div>

         <MainFooter className="absolute-bottom" />
      </main>
   );
}
