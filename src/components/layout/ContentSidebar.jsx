import './ContentSidebar.scss';

export default function ContentSidebar({ children, isFullContainer = false }) {
   return <div className={`content-sidebar ${isFullContainer ? 'full-container' : 'container'}`}>
      <div className="content">
         {children.length && children[0]}
      </div>

      <div className="sidebar">
         {children.length > 1 && children[1]}
      </div>
   </div>;
}
