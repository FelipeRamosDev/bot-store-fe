import Image from 'next/image';
import { useState } from 'react';
import LogoIcon from '@/assets/icons/logo_icon_text-darken.svg';

export default function Avatar({ avatarUrl, size = 50, noBorder = false, children }) {
   const [avatarError, setAvatarError] = useState(false);

   const style = {
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: noBorder ? 0 : size * 0.025
   };

   return (
      <div className="avatar" style={style}>
         {avatarError && <Image
            className="avatar-placeholder"
            src={LogoIcon}
            alt="CandlePilot Icon"
            width="100%"
            height="100%"
         />}

         {avatarUrl && !avatarError && <Image
            className="avatar-image"
            src={avatarUrl}
            alt="Avatar"
            onError={() => setAvatarError(true)}
            fill
         />}

         {children && (
            <div className="avatar-overlay">
               {children}
            </div>
         )}
      </div>
   );
}
