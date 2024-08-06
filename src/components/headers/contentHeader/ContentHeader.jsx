import './ContentHeader.scss';

export default function ContentHeader({ children }) {
   return <div className="content-header">
      {children.length && children[0]}

      <div className="toolbar">
         {children.length > 1 && children[1]}
      </div>
   </div>
}
