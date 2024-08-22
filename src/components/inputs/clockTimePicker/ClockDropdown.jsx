import { useState } from 'react';
import Menu from '@mui/material/Menu';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import ClockPicker from './ClockPicker';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

/**
 * `ClockDropdown` renders a button that opens a dropdown with a `ClockPicker`.
 * It allows users to select a time, which is then set in the parent component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.value - The current time value in 'HH:mm:ss' format.
 * @param {Function} props.setValue - Function to set the time value in the parent component.
 *
 * @returns {JSX.Element} - The rendered `ClockDropdown` component.
 */
export default function ClockDropdown({ value, setValue }) {
   const [ anchorEl, setAnchorEl ] = useState(null);
   const open = Boolean(anchorEl);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = (ev) => {
      if (!ev) return setAnchorEl(null);

      if (ev?.constructor?.name === 'M') {
         const hour = ev.hour();
         const minute = ev.minute();
   
         setValue(`${hour}:${minute}:00`);
      }

      setAnchorEl(null);
   };

   return <>
      <RoundIconButton Icon={AccessAlarmIcon} onClick={handleClick} />

      <Menu
         anchorEl={anchorEl}
         open={open}
         onClose={handleClose}
         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
         <ClockPicker value={value} onAccept={handleClose} />
      </Menu>
   </>
}
