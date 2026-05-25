import Image from 'next/image';
import LogoIMG from '@/assets/icons/logo_icon_dark.svg';
import { parseClassName } from '@/helpers/parser';

export default function LogoIconDark({ className, fontSize = 23 }) {
   return (
      <Image
         className={className}
         src={LogoIMG}
         alt="CandlePilot Icon"
         width={fontSize}
         height={fontSize}
      />
   );
}
