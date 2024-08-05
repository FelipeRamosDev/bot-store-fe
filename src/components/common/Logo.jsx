import Image from 'next/image';
import LogoImage from '@/assets/logo.svg';

export default function Logo({ ...props }) {
   return <Image
      className="logo-image"
      alt="Company's Logo"
      src={LogoImage}
      priority={true}
      height="50px"
      width="50px"
      {...props}
   />
}
