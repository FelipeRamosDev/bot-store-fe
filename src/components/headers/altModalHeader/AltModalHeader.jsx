import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import { parseClassName } from '@/helpers/parser';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export default function AltModalHeader({ className, backAction, children, buttonProps, ...props }) {
   return (
      <div className={parseClassName(className, ['alt-modal-header'])} {...props}>
         {backAction && (<>
            <RoundIconButton
               variant="contained"
               color="rubber"
               Icon={ChevronLeftIcon}
               onClick={backAction}
               {...buttonProps}
            />

            <span className="button-label">Back</span>
         </>)}

         {children}
      </div>
   );
}
