'use client';
import './WatermarkPriceCard.scss';
import { useEffect, useRef, useState } from 'react';
import PriceCard from '@/components/common/priceCard/PriceCard';

export default function WatermarkPriceCard({ className = '', watermark, watermarkSize = 28, borderSide = 'left', children, ...props }) {
   const waterMark = useRef();
   const [ waterMarkStyle, setWaterMarkStyle ] = useState({
      fontSize: watermarkSize
   });

   useEffect(() => {
      if (waterMark.current) {
         const offsetWidth = waterMark.current.offsetWidth;
         const offsetHeight = waterMark.current.offsetHeight;

         switch (borderSide) {
            case 'left':
               setWaterMarkStyle(prev => ({
                  ...prev,
                  left: -((offsetWidth / 2) - (offsetHeight / 3)),
                  bottom: (offsetWidth / 2) - (offsetHeight / 1.9)
               }));
               break;
            case 'top':
               setWaterMarkStyle(prev => ({
                  ...prev,
                  left: -(offsetHeight * 0.05),
                  top: -(offsetHeight * 0.1)
               }));
               break;
            case 'bottom':
               setWaterMarkStyle(prev => ({
                  ...prev,
                  left: -(offsetHeight * 0.05),
                  bottom: -(offsetHeight * 0.1)
               }));
               break;
            case 'right':
               setWaterMarkStyle(prev => ({
                  ...prev,
                  right: -((offsetWidth / 2) - (offsetHeight / 2.5)),
                  bottom: (offsetWidth / 2) - (offsetHeight / 1.9)
               }));
               break;
         }
      }
   }, [waterMark]);

   return <PriceCard
      className={`watermark-price-card ${className}`}
      borderSide={borderSide}
      {...props}
   >
      <span ref={waterMark} className="watermark" style={waterMarkStyle} border-side={borderSide}>{watermark}</span>
      {children}
   </PriceCard>;
}
