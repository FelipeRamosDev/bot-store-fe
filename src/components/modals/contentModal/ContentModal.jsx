'use client';
import './ContentModal.scss';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


export default function ContentModal({
   open = false,
   hideHeader = false,
   className = '',
   size = 'medium',
   padding = '',
   onClose = () => {},
   title,
   children,
   ...props
}) {
   const headerStyle = {};

   switch (padding) {
      case 'xs':
         headerStyle.paddingLeft = '0.4rem';
         headerStyle.paddingRight = '0.4rem';
         break;
      case 's':
         headerStyle.paddingLeft = '1.2rem';
         headerStyle.paddingRight = '1.2rem';
         break;
      case 'm':
         headerStyle.paddingLeft = '1.8rem';
         headerStyle.paddingRight = '1.8rem';
         break;
      case 'l':
         headerStyle.paddingLeft = '2.4rem';
         headerStyle.paddingRight = '2.4rem';
         break;
      case 'xl':
         headerStyle.paddingLeft = '3rem';
         headerStyle.paddingRight = '3rem';
         break;
   }

   return <Modal
      className={`content-modal ${className} ${size}`}
      open={open}
      onClose={onClose}
      {...props}
   >
      <div className={`modal ${size}`}>
         {!hideHeader && <div className="modal-header" style={headerStyle}>
            {title && <h4 className="modal-title">{title}</h4>}

            <IconButton aria-label="delete" size="small">
               <CloseIcon fontSize="inherit" onClick={onClose} />
            </IconButton>
         </div>}

         <div className={`modal-body padding-${padding}`}>
            {children}
         </div>
      </div>
   </Modal>
}