import Image from 'next/image';
import LogoImage from '@/assets/logo.svg';

/**
 * `Logo` is a component that displays the company's logo image.
 * It uses the `Image` component from `next/image` to provide optimized image loading.
 *
 * @param {Object} props - The props object.
 * @param {string} [props.className=''] - Additional CSS classes to apply to the logo image.
 * @param {string} [props.alt='Company\'s Logo'] - The alt text for the logo image.
 * @param {number|string} [props.height='50px'] - The height of the logo image.
 * @param {number|string} [props.width='50px'] - The width of the logo image.
 * @param {Object} [props] - Additional props to be passed to the `Image` component.
 *
 * @returns {JSX.Element} The rendered `Image` component with the logo.
 */
export default function Logo({ ...props }) {
   return <Image
      className="logo-image"
      alt="Company's Logo"
      src={LogoImage}
      priority={true}
      loading="eager"
      height={55}
      width={55}
      {...props}
   />
}
