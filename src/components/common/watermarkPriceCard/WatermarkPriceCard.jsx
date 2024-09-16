'use client';
import './WatermarkPriceCard.scss';
import { useEffect, useRef, useState } from 'react';
import PriceCard from '@/components/common/priceCard/PriceCard';

/**
 * A PriceCard component with a customizable watermark.
 * 
 * @param {Object} props - The props object.
 * @param {string} [props.className=''] - Additional CSS class names for the component.
 * @param {string} [props.watermark] - The watermark text to display.
 * @param {number} [props.watermarkSize=28] - The font size of the watermark.
 * @param {'left' | 'top' | 'bottom' | 'right'} [props.borderSide='left'] - The side of the card where the watermark will be placed.
 * @param {number} [props.paddingSize=14] - The padding size to apply based on the watermark's position.
 * @param {React.ReactNode} [props.children] - The content to be displayed inside the PriceCard.
 * 
 * @returns {JSX.Element} The rendered WatermarkPriceCard component.
 * 
 * @example
 * <WatermarkPriceCard
 *    className="custom-class"
 *    watermark="Confidential"
 *    watermarkSize={36}
 *    borderSide="bottom"
 *    paddingSize={20}
 * >
 *    <div>Your content here</div>
 * </WatermarkPriceCard>
 */
export default function WatermarkPriceCard({ className = '', watermark, watermarkSize = 28, borderSide = 'left', paddingSize = 14, children, ...props }) {
   const [ waterMarkStyle, setWaterMarkStyle ] = useState({ fontSize: watermarkSize });
   const [ cardStyle, setCardStyle ] = useState({});
   const waterMark = useRef();

   useEffect(() => {
      if (waterMark.current) {
         const offsetWidth = waterMark.current.offsetWidth;
         const offsetHeight = waterMark.current.offsetHeight;
         const paddingValue = offsetHeight + paddingSize;

         switch (borderSide) {
            case 'left':
               const left = (offsetWidth / 2) - (offsetHeight / 3);

               setCardStyle(prev => ({ ...prev, paddingLeft: paddingValue }));
               setWaterMarkStyle(prev => ({
                  ...prev,
                  left: -left,
                  bottom: (offsetWidth / 2) - (offsetHeight / 1.9)
               }));
               break;
            case 'top':
               const top = offsetHeight * 0.1;

               setCardStyle(prev => ({ ...prev, paddingTop: paddingValue }));
               setWaterMarkStyle(prev => ({
                  ...prev,
                  top: -top,
                  left: -(offsetHeight * 0.05)
               }));
               break;
            case 'bottom':
               const bottom = offsetHeight * 0.1;

               setCardStyle(prev => ({ ...prev, paddingBottom: paddingValue }));
               setWaterMarkStyle(prev => ({
                  ...prev,
                  bottom: -bottom,
                  left: -(offsetHeight * 0.05)
               }));
               break;
            case 'right':
               const right = (offsetWidth / 2) - (offsetHeight / 2.5);

               setCardStyle(prev => ({ ...prev, paddingLeft: paddingValue }));
               setWaterMarkStyle(prev => ({
                  ...prev,
                  right: -right,
                  bottom: (offsetWidth / 2) - (offsetHeight / 1.9)
               }));
               break;
         }
      }
   }, [waterMark, borderSide, paddingSize]);

   return <PriceCard
      className={`watermark-price-card ${className}`}
      borderSide={borderSide}
      style={cardStyle}
      {...props}
   >
      <span ref={waterMark} className="watermark" style={waterMarkStyle} border-side={borderSide}>{watermark}</span>
      {children}
   </PriceCard>;
}
