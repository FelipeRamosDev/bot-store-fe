import { useState } from 'react';
import Menu from '@mui/material/Menu';
import RoundIconButton from '@/components/buttons/roundButton/RoundIconButton';
import ClockPicker from './ClockPicker';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

export default function ClockDropdown({ value, setValue }) {
   const [ anchorEl, setAnchorEl ] = useState(null);
   const open = Boolean(anchorEl);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = (ev) => {
      if (!ev) return setAnchorEl(null);

      const hour = ev.hour();
      const minute = ev.minute();

      setValue(`${hour}:${minute}:00`);
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
