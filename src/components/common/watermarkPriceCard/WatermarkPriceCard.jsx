'use client';
import { useEffect, useRef, useState } from 'react';
import PriceCard from '@/components/common/priceCard/PriceCard';

/**
 * A PriceCard component with a customizable watermark.
 * 
 * @param {Object} props - The props object.
 * @param {string} [props.className=''] - Additional CSS class names for the component.
 * @param {boolean} [props.absoluteHeader] - To use the absolute positioned header.
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
export default function WatermarkPriceCard({
   className = '',
   borderSide = 'left',
   watermark,
   absoluteHeader,
   watermarkSize,
   paddingSize,
   children,
   ...props
}) {
   const waterMarkStyle = { fontSize: watermarkSize };
   const cardStyle = { paddingTop: absoluteHeader, fontSize: watermarkSize };

   return <PriceCard
      className={`watermark-price-card ${borderSide || ''} ${className}`}
      borderSide={borderSide}
      style={cardStyle}
      {...props}
   >
      <span className="watermark" style={waterMarkStyle} border-side={borderSide}>{watermark}</span>
      {children}
   </PriceCard>;
}
