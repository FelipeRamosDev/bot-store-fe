'use client';
import './WatermarkPriceCard.scss';
import { useEffect, useRef, useState } from 'react';
import PriceCard from '@/components/common/priceCard/PriceCard';

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
