import { useState } from 'react';
import Menu from '@mui/material/Menu';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import DatePicker from './DatePicker';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

/**
 * `DateDropdown` renders a button that opens a dropdown with a `DatePicker`.
 * It allows users to select a date, which is then set in the parent component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.value - The current date value in 'YYYY-MM-DD' format.
 * @param {Function} props.setValue - Function to set the date value in the parent component.
 *
 * @returns {JSX.Element} - The rendered `DateDropdown` component.
 */
export default function DateDropdown({ value, setValue }) {
   const [ anchorEl, setAnchorEl ] = useState(null);
   const open = Boolean(anchorEl);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = (ev) => {
      if (!ev) return setAnchorEl(null);

      if (ev?.constructor?.name === 'M') {
         const year = ev.year();
         const month = String(ev.month() + 1).padStart(2, '0');
         const day = String(ev.date()).padStart(2, '0');

         setValue(`${year}-${month}-${day}`);
      }

      setAnchorEl(null);
   };

   return <>
      <RoundIconButton Icon={CalendarMonthIcon} onClick={handleClick} />

      <Menu
         anchorEl={anchorEl}
         open={open}
         onClose={handleClose}
         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
         <DatePicker value={value} onAccept={handleClose} />
      </Menu>
   </>
}
