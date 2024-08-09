import './ContentHeader.scss';

export default function ContentHeader({ children, Toolbar = () => <></> }) {
   return <div className="content-header">
      {children}

      <div className="toolbar">
         <Toolbar />
      </div>
   </div>
}
