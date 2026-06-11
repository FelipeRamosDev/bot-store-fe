export default function StandardPageHeader({ pageTitle, titleLabel, Background }) {
   return (
      <div className="standard-page-header">
         {Background && <Background className="background" />}
         {Background && <div className="overlay"></div>}

         <div className="container">
            <label className="title-label">{titleLabel}</label>
            <h1 className="header-title">{pageTitle}</h1>
         </div>
      </div>
   );
}
