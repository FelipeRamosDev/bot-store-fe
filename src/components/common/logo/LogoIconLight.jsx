import Image from 'next/image';
import LogoIMG from '@/assets/icons/logo_icon_text-darken.svg';

export default function LogoIcon({ fontSize = 23 }) {
   return (
      <Image
         src={LogoIMG}
         alt="CandlePilot Icon"
         width={fontSize}
         height={fontSize}
      />
   );
}
