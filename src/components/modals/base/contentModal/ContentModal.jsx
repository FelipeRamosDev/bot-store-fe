'use client';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

/**
 * A modal component for displaying content with customizable header and size.
 *
 * @param {Object} props - The properties to customize the modal.
 * @param {boolean} [props.open=false] - Controls the open state of the modal.
 * @param {boolean} [props.hideHeader=false] - If true, hides the header section of the modal.
 * @param {string} [props.className=''] - Additional CSS class names for the modal.
 * @param {string} [props.size='medium'] - Size of the modal. Can be 'small', 'medium', or 'large'.
 * @param {string} [props.padding=''] - Padding around the content of the modal. Options are 'xs', 's', 'm', 'l', 'xl'.
 * @param {function} [props.onClose=() => {}] - Callback function invoked when the modal is closed.
 * @param {string} [props.title] - Title to display in the header of the modal.
 * @param {React.ReactNode} [props.children] - Content to display inside the modal.
 * @param {Object} [props.props] - Additional props passed to the `Modal` component.
 *
 * @returns {React.Element} The rendered modal dialog.
 */
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
   // Determine header padding based on the padding prop
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
